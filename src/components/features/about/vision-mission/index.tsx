import { VISION_MISSION_CONTENT } from "./constant";

export function VisionMission() {
  const VisionIcon = VISION_MISSION_CONTENT.vision.icon;
  const MissionIcon = VISION_MISSION_CONTENT.mission.icon;

  return (
    <section className="w-full py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          
          {/* Vision */}
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-lg border border-border group hover:border-primary/30 transition-all duration-300">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <VisionIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">
              {VISION_MISSION_CONTENT.vision.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {VISION_MISSION_CONTENT.vision.description}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-lg border border-border group hover:border-accent/50 transition-all duration-300">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <MissionIcon className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">
              {VISION_MISSION_CONTENT.mission.title}
            </h3>
            <ul className="space-y-3">
              {VISION_MISSION_CONTENT.mission.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2.5 shrink-0"></span>
                  <p className="text-muted-foreground leading-relaxed text-lg">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
