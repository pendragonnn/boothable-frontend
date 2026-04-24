import { VALUES_CONTENT } from "./constant";

export function Values() {
  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">Nilai-Nilai Kami</h2>
          <p className="text-muted-foreground md:text-lg">
            Prinsip yang membimbing setiap keputusan dan inovasi kami di Boothable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES_CONTENT.map((value) => {
            const Icon = value.icon;
            return (
              <div 
                key={value.id} 
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-muted/30 hover:bg-muted/60 transition-colors border border-transparent hover:border-border"
              >
                <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
