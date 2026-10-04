import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/page/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  return legalMetadata("appointments-and-cancellations");
}

export default function Page() {
  return <LegalPage slug="appointments-and-cancellations" />;
}
