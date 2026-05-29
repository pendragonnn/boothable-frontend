import { Metadata } from "next";
import {
  ContactHero,
  ContactChannels,
  InquiryForm,
} from "@/components/features/contact";
import { FAQ } from "@/components/features/landing-page";

export const metadata: Metadata = {
  title: "Hubungi Kami | Boothable",
  description:
    "Hubungi tim Boothable untuk pertanyaan, saran, atau ajakan kerja sama. Kami siap mendukung kelancaran festival Anda.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactChannels />
      <InquiryForm />
      <FAQ />
    </>
  );
}
