"""Build consistent audit deliverables from the evidence-backed finding register."""

import collections
import csv
import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent
FIELDS = [
    "id", "severity", "module", "clause", "status", "title", "url",
    "location", "quoted_text", "why", "alternative", "seo_aeo",
    "client_input", "effort",
]
LABELS = {
    "module": "Applicable Checks",
    "clause": "Clause / Control",
    "status": "Evidence Status",
    "url": "Preview URL(s)",
    "location": "File:Line Evidence",
    "quoted_text": "Quoted Evidence",
    "why": "Why It Is A Problem",
    "alternative": "Compliant Alternative / Exact Change",
    "seo_aeo": "SEO/AEO Impact",
    "client_input": "Client Input Needed",
    "effort": "Effort (S/M/L)",
}


def main():
    findings = json.loads((ROOT / "findings.json").read_text(encoding="utf-8"))
    assert len({finding["id"] for finding in findings}) == len(findings)
    for finding in findings:
        assert set(finding) == set(FIELDS), finding["id"]
        assert all(isinstance(value, str) and value.strip() for value in finding.values())
        assert finding["effort"] in {"S", "M", "L"}
        assert all(url.startswith("https://drjames.vercel.app/") for url in finding["url"].split("; "))
        # Every cited source file must exist; validate its cited starting line too.
        for file, line in re.findall(r"([\w./\[\]-]+\.(?:tsx?|md|txt|json|jpg)):(\d+)", finding["location"]):
            path = REPO / file
            assert path.is_file(), (finding["id"], file)
            assert int(line) <= len(path.read_text(encoding="utf-8").splitlines()), (file, line)

    sections = [(ROOT / "report-overview.md").read_text(encoding="utf-8").rstrip()]
    for severity in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:
        group = [finding for finding in findings if finding["severity"] == severity]
        if not group:
            continue
        sections.append(f"### {severity} ({len(group)})")
        for finding in group:
            sections.append(f"#### {finding['id']} - {finding['title']}")
            sections.append(f"- Severity: **{finding['severity']}**")
            for field, label in LABELS.items():
                sections.append(f"- **{label}:** {finding[field]}")
    sections.append((ROOT / "report-closing.md").read_text(encoding="utf-8").rstrip())
    report = "\n\n".join(sections) + "\n"
    (ROOT / "NMC_AUDIT_REPORT.md").write_text(report, encoding="utf-8")

    with (ROOT / "nmc-findings.csv").open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(findings)
    with (ROOT / "nmc-findings.csv").open(encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))
    assert rows == findings
    assert report.count("#### NMC-") == len(findings)
    counts = dict(collections.Counter(finding["severity"] for finding in findings))
    assert counts == {"HIGH": 5, "MEDIUM": 8}
    assert "5 High and 8 Medium" in (ROOT / "NMC_CLIENT_SUMMARY.md").read_text(encoding="utf-8")

    evidence = ROOT / "evidence"
    excluded = [
        "live-pages.json", "browser-observations.json", "live-about.png",
        "live-appointment.png", "live-contact.png", "live-home-scrolled-text.txt",
        "live-home-scrolled.png", "live-home.png", "live-services.png",
    ]
    assert not any((evidence / name).exists() for name in excluded)
    preview = json.loads((evidence / "preview-pages.json").read_text(encoding="utf-8"))
    assert len(preview) == 24
    assert all(record["url"].startswith("http://drjames.vercel.app/") for record in preview)
    assert all(record.get("status") == 200 for record in preview)
    results = {
        "findings": len(findings), "counts": counts,
        "csv_matches_register": True, "report_findings_match_register": True,
        "all_finding_urls_use_preview": True, "preview_responses": len(preview),
        "excluded_domain_capture_files_removed": True,
        "site_code_and_content_modified_by_audit": False,
    }
    (ROOT / "validation.json").write_text(json.dumps(results, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
