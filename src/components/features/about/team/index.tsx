import Image from "next/image";
import { TEAM_MEMBERS } from "./constant";

export function Team() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/10 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-foreground">Tim di Balik Layar</h2>
          <p className="text-muted-foreground md:text-lg">
            Sekumpulan inovator yang bersemangat untuk memajukan ekosistem festival di Indonesia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="flex flex-col items-center group">
              <div className="relative w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-background shadow-xl group-hover:border-primary transition-colors duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
