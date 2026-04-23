import { TRUSTED_CLIENTS } from "./constant";

export function TrustedClients() {
  return (
    <section className="w-full py-12 md:py-20 bg-background border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground">
            Telah dipercaya oleh ratusan penyelenggara festival di seluruh Indonesia.
          </h2>
        </div>
        
        {/* Marquee effect container */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
            {TRUSTED_CLIENTS.map((client) => (
              <li key={`first-${client.id}`} className="flex flex-col items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-muted/50 flex items-center justify-center font-bold text-2xl md:text-3xl text-muted-foreground shadow-sm">
                  {client.logo}
                </div>
                <span className="mt-3 text-sm font-medium text-muted-foreground whitespace-nowrap">{client.name}</span>
              </li>
            ))}
            {/* Duplicate for infinite scroll effect */}
            {TRUSTED_CLIENTS.map((client) => (
              <li key={`second-${client.id}`} className="flex flex-col items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-muted/50 flex items-center justify-center font-bold text-2xl md:text-3xl text-muted-foreground shadow-sm">
                  {client.logo}
                </div>
                <span className="mt-3 text-sm font-medium text-muted-foreground whitespace-nowrap">{client.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
