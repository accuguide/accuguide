import { MapPin, Star, Shield } from "lucide-react";
import CountUpNumber from "./count-up-number";
import { db } from "@/lib/db";
import { entityTable, indicatorTable, reviewTable } from "@/lib/db/schema";

export default async function Stats() {
  const places = await db.$count(entityTable);
  const indicators = await db.$count(indicatorTable);
  const reviews = await db.$count(reviewTable);
  const stats = [
    {
      value: places,
      label: "Places Catalogued",
      icon: MapPin,
      color: "text-blue-600",
    },
    {
      value: reviews,
      label: "Reviews Written",
      icon: Star,
      color: "text-pink-500",
    },
    {
      value: indicators,
      label: "Accessibility Indicators",
      icon: Shield,
      color: "text-green-600",
    },
  ];

  return (
    <section className="pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className={`relative overflow-hidden rounded-2xl  p-2 md:p-8 text-center transition-all duration-300 hover:shadow-lg hover:scale-105`}
              >
                <div
                  className={`hidden md:inline-flex items-center justify-center w-16 h-16 rounded-full ${stat.color} bg-white shadow-sm mb-6`}
                >
                  <IconComponent className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <p className={`text-4xl font-bold ${stat.color} sm:text-5xl`}>
                    <CountUpNumber value={stat.value} />
                    {stat.value >= 1000 && <span className="text-2xl">+</span>}
                  </p>
                  <p className="text-xl font-semibold text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const dynamic = "force-static";
export const revalidate = 86400;
