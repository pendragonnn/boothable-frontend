"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Headphones,
  Loader2,
} from "lucide-react";
import { INQUIRY_FORM_CONTENT } from "./constant";

export function InquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.role || !formData.message) {
      toast.error("Mohon lengkapi semua field yang tersedia.");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(INQUIRY_FORM_CONTENT.successMessage, {
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    });

    // Reset form
    setFormData({ name: "", email: "", role: "", message: "" });
    setIsSubmitting(false);
  };

  const sideFeatureIcons = [Clock, ShieldCheck, Headphones, CheckCircle2];

  return (
    <section
      id="inquiry-form"
      className="w-full py-16 md:py-24 bg-background scroll-mt-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-primary font-bold tracking-wide uppercase text-sm">
            {INQUIRY_FORM_CONTENT.title}
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tighter text-foreground">
            {INQUIRY_FORM_CONTENT.headline}
          </h3>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg leading-relaxed">
            {INQUIRY_FORM_CONTENT.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <Card className="lg:col-span-3 border-border/50 shadow-lg animate-in fade-in slide-in-from-left-8 duration-700">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="font-medium">
                    {INQUIRY_FORM_CONTENT.formLabels.name}
                  </Label>
                  <Input
                    id="contact-name"
                    placeholder={INQUIRY_FORM_CONTENT.formLabels.namePlaceholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="h-12 transition-all focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="font-medium">
                    {INQUIRY_FORM_CONTENT.formLabels.email}
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder={INQUIRY_FORM_CONTENT.formLabels.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-12 transition-all focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="contact-role" className="font-medium">
                    {INQUIRY_FORM_CONTENT.formLabels.role}
                  </Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value || "" })
                    }
                  >
                    <SelectTrigger id="contact-role" className="h-12">
                      <SelectValue
                        placeholder={INQUIRY_FORM_CONTENT.formLabels.rolePlaceholder}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {INQUIRY_FORM_CONTENT.formLabels.roleOptions.map(
                        (option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="contact-message" className="font-medium">
                    {INQUIRY_FORM_CONTENT.formLabels.message}
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder={INQUIRY_FORM_CONTENT.formLabels.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="min-h-[140px] resize-none transition-all focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-12 font-semibold text-base shadow-lg hover:shadow-primary/25 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {INQUIRY_FORM_CONTENT.formLabels.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {INQUIRY_FORM_CONTENT.formLabels.submit}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Side Info */}
          <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
            {/* Response time note */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-semibold text-primary">
                  Waktu Respons
                </p>
              </div>
              <p className="text-foreground font-bold text-lg font-heading">
                {INQUIRY_FORM_CONTENT.sideNote}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold font-heading text-foreground">
                {INQUIRY_FORM_CONTENT.sideHeadline}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {INQUIRY_FORM_CONTENT.sideDescription}
              </p>
              <ul className="space-y-3 pt-2">
                {INQUIRY_FORM_CONTENT.features.map((feature, index) => {
                  const Icon = sideFeatureIcons[index];
                  return (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
