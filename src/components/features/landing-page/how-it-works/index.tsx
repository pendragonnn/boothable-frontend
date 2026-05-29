import { HOW_IT_WORKS_STEPS } from "./constant";

export function HowItWorks() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Cara Kerja Boothable</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-lg">
            Proses pemesanan booth yang transparan dan mudah dipahami, hanya dalam 4 langkah sederhana.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          {/* Connector Line for larger screens */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border -z-10"></div>
          
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center text-center space-y-4 group">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-muted flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-colors duration-300 relative z-10 shadow-sm">
                  <Icon className="w-10 h-10 text-primary group-hover:text-accent-foreground transition-colors duration-300" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
