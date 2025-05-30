import { Compass, Star, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Hero() {
  const cardData = [
    {
      icon: Compass,
      title: "Discover Accessibility",
      description:
        "Whether you're looking for wheelchair-friendly restaurants, accessible public transport, or inclusive events, we've got you covered.",
    },
    {
      icon: Star,
      title: "Rate Businesses",
      description:
        "Rate your accessibility experiences and help others make informed decisions. Your feedback matters!",
    },
    {
      icon: Megaphone,
      title: "Take Action",
      description:
        "Advocate for better accessibility in your area. Start initiatives, support local efforts, and empower change through community-driven solutions.",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {cardData.map(({ icon: Icon, title, description }) => (
            <Card
              className="border-neutral-300 dark:border-neutral-500 bg-transparent"
              key={title}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-[-24px]">
                  <Icon className="h-5 w-5 text-foreground/80" />
                  <CardTitle className="font-semibold">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
