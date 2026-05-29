import {
  Hero,
  ShowcaseEvent,
  HowItWorks,
  ShowcaseCategory,
  TrustedClients,
  FAQ,
  EndCta,
} from "@/components/features/landing-page";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <TrustedClients />
      <ShowcaseEvent />
      <HowItWorks />
      <ShowcaseCategory />
      <FAQ />
      <EndCta />
    </>
  );
}
