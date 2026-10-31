"""Read-only public-page evidence capture. Never submits forms or reads submissions."""

import concurrent.futures
import datetime
import hashlib
import io
import json
from pathlib import Path
import re
import urllib.error
import urllib.request

from bs4 import BeautifulSoup
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parent
EVIDENCE = ROOT / "evidence"
HEADERS = {"User-Agent": "Mozilla/5.0 (read-only public website compliance audit)"}
LIVE = "http://drjames.vercel.app"
PATHS = [
    "/", "/about-dr-james/", "/conditions/", "/contact/", "/your-visit/",
    "/faqs/", "/health-library/", "/privacy-policy/", "/medical-disclaimer/",
    "/editorial-policy/", "/patient-rights/", "/terms-of-use/",
    "/conditions/thyroid-disorders/", "/conditions/anaemia/",
    "/conditions/diabetes-and-prediabetes/", "/conditions/sleep-apnea/",
    "/conditions/weight-management/",
    "/health-library/why-high-blood-pressure-has-no-symptoms-silent-killer/",
    "/health-library/are-weight-loss-injections-safe/",
    "/health-library/how-much-weight-lose-glp-1-medicines/",
    "/llms.txt", "/humans.txt", "/sitemap.xml", "/robots.txt",
]
LEGAL = [
    "https://nmc.org.in/whats-new",
    "https://check.medvyn.in/guidelines",
    "https://medicaldialogues.in/pdf_upload/2026/10/07/nmc-guidelines-on-ethical-advertising-and-public-communication-478642.pdf",
    "https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf",
]


def fetch(url):
    record = {"url": url, "retrieved_utc": datetime.datetime.now(datetime.timezone.utc).isoformat()}
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=35) as response:
            raw = response.read()
            record.update(status=response.status, final_url=response.url,
                          sha256=hashlib.sha256(raw).hexdigest(), bytes=len(raw))
            if raw.startswith(b"%PDF"):
                record["pages"] = [
                    {"page": i, "text": page.extract_text()}
                    for i, page in enumerate(PdfReader(io.BytesIO(raw)).pages, 1)
                ]
                return record
            source = raw.decode("utf-8", "replace")
            soup = BeautifulSoup(source, "html.parser")
            record["title"] = soup.title.get_text(" ", strip=True) if soup.title else ""
            record["links"] = sorted(set(a.get("href", "") for a in soup.find_all("a")))
            record["images"] = [
                {key: image.get(key, "") for key in ["src", "data-src", "alt", "title"]}
                for image in soup.find_all("img")
            ]
            record["forms"] = [
                {"action": form.get("action", ""), "text": form.get_text(" ", strip=True),
                 "fields": [
                     {key: field.get(key, "") for key in ["name", "type", "placeholder", "checked"]}
                     for field in form.find_all(["input", "textarea", "select"])
                 ]}
                for form in soup.find_all("form")
            ]
            record["schema"] = [s.get_text() for s in soup.select('script[type="application/ld+json"]')]
            record["scripts"] = [s.get("src", "") for s in soup.find_all("script") if s.get("src")]
            record["tracking_excerpts"] = [
                source[max(0, match.start() - 100):match.end() + 250]
                for match in re.finditer(
                    r"googletagmanager|gtag\(|fbq\(|clarity\(|hotjar|cookieconsent|consent.?mode",
                    source, re.I)
            ]
            if url == LEGAL[0]:
                record["advertising_links"] = [
                    {"text": a.get_text(" ", strip=True), "href": a.get("href")}
                    for a in soup.find_all("a")
                    if "advertis" in a.get_text(" ", strip=True).lower()
                    or "advertis" in a.get("href", "").lower()
                ]
            for tag in soup(["script", "style", "noscript"]):
                tag.decompose()
            record["text_lines"] = [line.strip() for line in soup.get_text("\n").splitlines() if line.strip()]
    except urllib.error.HTTPError as error:
        record.update(status=error.code, error=str(error))
    except Exception as error:
        record["error"] = f"{type(error).__name__}: {error}"
    return record


def main():
    EVIDENCE.mkdir(exist_ok=True)
    urls = [LIVE + path for path in PATHS] + LEGAL
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        records = list(pool.map(fetch, urls))
    for name, selected in [
        ("preview-pages.json", [r for r in records if r["url"].startswith(LIVE)]),
        ("legal-sources.json", [r for r in records if not r["url"].startswith(LIVE)]),
    ]:
        (EVIDENCE / name).write_text(json.dumps(selected, ensure_ascii=True, indent=2) + "\n", encoding="utf-8")
    for record in records:
        print(record["url"], record.get("status", record.get("error")),
              len(record.get("text_lines", [])), "text lines", flush=True)
    official = next(r for r in records if r["url"] == LEGAL[0])
    print("Official advertising links:", json.dumps(official.get("advertising_links", [])), flush=True)


if __name__ == "__main__":
    main()
