import { Compass, Star, Megaphone, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const cardData = [
    {
      icon: Compass,
      title: "Find Accessible Places",
      description:
        "Whether you're looking for wheelchair-accessible seating, accessible transportation, sensory-friendly spaces, contactless ordering, or more, we can help you find what you need!",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient:
        "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    },
    {
      icon: Star,
      title: "Rate Businesses",
      description:
        "Rate your accessibility experiences and help the disabled community make informed decisions about where to go. The more places you rate, the more that Accuguide helps everyone!",
      gradient: "from-purple-500 to-pink-500",
      bgGradient:
        "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
    },
    {
      icon: Megaphone,
      title: "Take Action",
      description:
        "Advocate for better accessibility and inclusion in your area. Start initiatives, support local efforts, and empower change through community-driven solutions!",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient:
        "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    },
  ];

  return (
    <section className="w-full">
      <div className="max-w-6xl">
        <div className="text-center mt-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100">
            How Accuguide Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 mt-2">
            Join our community-driven platform to discover, rate, and advocate
            for accessible spaces everywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cardData.map(
            ({ icon: Icon, title, description, gradient, bgGradient }) => (
              <Card
                key={title}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl dark:shadow-slate-900/50 dark:hover:shadow-slate-900/70 transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-slate-800"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50`}
                ></div>
                <CardHeader className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}
                    >
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {description}
                  </p>
                  <Button
                    variant="ghost"
                    className="group/btn p-0 h-auto font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-transparent dark:hover:bg-transparent"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
