import { Hero } from "@/components/hero/Hero";
import { UtilityBar, SiteHeader } from "@/components/shell/Shell";
import { SiteFooter } from "@/components/sections/SiteFooter";

/**
 * Phase 1 preview: the real shell and hero on the home page.
 * Full pages arrive in later phases; the component library lives at /styleguide.
 */
export default function Home() {
  return (
    <>
      <div className="container">
        <div className="shell" style={{ marginTop: 16 }}>
          <UtilityBar />
          <SiteHeader />
        </div>
      </div>
      <main id="main" className="container" style={{ paddingBlock: 24 }}>
        <Hero />
      </main>
      <div className="container" style={{ paddingBottom: 32 }}>
        <SiteFooter />
      </div>
    </>
  );
}
