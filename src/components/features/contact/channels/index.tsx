import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { CHANNELS_CONTENT, CONTACT_CHANNELS } from "./constant";

const iconMap = {
  MessageCircle,
  Mail,
  MapPin,
} as const;

export function ContactChannels() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-primary font-bold tracking-wide uppercase text-sm">
            {CHANNELS_CONTENT.title}
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tighter text-foreground">
            {CHANNELS_CONTENT.headline}
          </h3>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg leading-relaxed">
            {CHANNELS_CONTENT.description}
          </p>
        </div>

        {/* Channel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {CONTACT_CHANNELS.map((channel, index) => {
            const IconComponent = iconMap[channel.icon as keyof typeof iconMap];
            return (
              <Card
                key={channel.id}
                className="group relative overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground font-semibold text-xs shadow-sm"
                  >
                    {channel.badge}
                  </Badge>
                </div>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <CardHeader className="pb-3 pt-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-foreground">
                    {channel.title}
                  </h4>
                </CardHeader>

                <CardContent className="space-y-3 pb-4">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {channel.description}
                  </p>
                  <p className="text-foreground font-medium text-sm">
                    {channel.detail}
                  </p>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    render={<Link href={channel.href} target={channel.href.startsWith("http") ? "_blank" : undefined} />}
                    nativeButton={false}
                    variant="ghost"
                    className="p-0 h-auto text-primary font-semibold hover:text-primary/80 group/btn"
                  >
                    {channel.action}
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
