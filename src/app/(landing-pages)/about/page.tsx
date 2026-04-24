import { Metadata } from "next";
import { Story, VisionMission, Values, Team } from "@/components/features/about";
import { FAQ } from "@/components/features/landing-page";

export const metadata: Metadata = {
  title: "Tentang Kami | Boothable",
  description: "Kenali lebih dekat Boothable, platform manajemen dan penyewaan booth acara/festival terpadu di Indonesia.",
};

export default function AboutPage() {
  return (
    <>
      <Story />
      <VisionMission />
      <Values />
      <Team />
      <FAQ />
    </>
  );
}
