import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/page/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  return legalMetadata("accessibility");
}

export default function Page() {
  return <LegalPage slug="accessibility" />;
}
