import { Compass, Star, Megaphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Hero() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border shadow-sm transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-[-24px]">
                <Compass className="h-5 w-5 text-foreground/80" />
                <CardTitle className="font-semibold">
                  Discover Accessibility
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Whether you&apos;re looking for wheelchair-friendly restaurants,
                accessible public transport, or inclusive events, we&apos;ve got
                you covered.
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-[-24px]">
                <Star className="h-5 w-5 text-foreground/80" />
                <CardTitle className="font-semibold">Rate Businesses</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Rate your accessibility experiences and help others make
                informed decisions. Your feedback matters!
              </p>
            </CardContent>
          </Card>

          <Card className="border shadow-sm transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-[-24px]">
                <Megaphone className="h-5 w-5 text-foreground/80" />
                <CardTitle className="font-semibold">Take Action</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Advocate for better accessibility in your area. Start
                initiatives, support local efforts, and empower change through
                community-driven solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
