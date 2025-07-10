import { Compass, Star, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Hero() {
  const cardData = [
    {
      icon: Compass,
      title: "Find Accessible Places",
      description:
        "Whether you're looking for wheelchair-accessible seating, accessible transportation, sensory-friendly spaces, contactless ordering, or more, we can help you find what you need!",
    },
    {
      icon: Star,
      title: "Rate Businesses",
      description:
        "Rate your accessibility experiences and help the disabled community make information decisions about where to go. The  more places you rate, the more that Accuguide helps everyone!",
    },
    {
      icon: Megaphone,
      title: "Take Action",
      description:
        "Advocate for better accessibility and inclusion in your area. Start initiatives, support local efforts, and empower change through community-driven solutions!",
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {cardData.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="flex items-center gap-2 mb-[-24px]">
                  <Icon className="h-5 w-5 text-foreground/80" />
                  <CardTitle>{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
