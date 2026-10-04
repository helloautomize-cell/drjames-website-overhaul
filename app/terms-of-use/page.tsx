import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/page/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  return legalMetadata("terms-of-use");
}

export default function Page() {
  return <LegalPage slug="terms-of-use" />;
}
