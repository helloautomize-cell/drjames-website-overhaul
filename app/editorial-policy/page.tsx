import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/page/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  return legalMetadata("editorial-policy");
}

export default function Page() {
  return <LegalPage slug="editorial-policy" />;
}
