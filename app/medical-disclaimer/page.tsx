import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/page/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  return legalMetadata("medical-disclaimer");
}

export default function Page() {
  return <LegalPage slug="medical-disclaimer" />;
}
