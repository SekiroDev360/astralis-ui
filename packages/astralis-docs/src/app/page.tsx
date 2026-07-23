import { Hero } from "@/modules/landing/hero";
import { Bento } from "@/modules/landing/bento";
import { Showcase } from "@/modules/landing/showcase";
import { CodeResult } from "@/modules/landing/code-result";
import { StatsStrip } from "@/modules/landing/stats-strip";
import { FinalCta } from "@/modules/landing/final-cta";
import { Footer } from "@/modules/landing/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Bento />
      <Showcase />
      <CodeResult />
      <StatsStrip />
      <FinalCta />
      <Footer />
    </>
  );
}
