import { Hero } from "@/components/landing/hero";
import { Bento } from "@/components/landing/bento";
import { Showcase } from "@/components/landing/showcase";
import { CodeResult } from "@/components/landing/code-result";
import { StatsStrip } from "@/components/landing/stats-strip";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

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
