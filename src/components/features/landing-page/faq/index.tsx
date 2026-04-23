import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "./constant";

export function FAQ() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/10">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pertanyaan Umum</h2>
          <p className="text-muted-foreground md:text-lg">
            Temukan jawaban untuk pertanyaan yang sering diajukan seputar penyewaan booth.
          </p>
        </div>
        
        <Accordion className="w-full bg-background rounded-2xl shadow-sm border px-6 py-2">
          {FAQ_ITEMS.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-b last:border-b-0">
              <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
