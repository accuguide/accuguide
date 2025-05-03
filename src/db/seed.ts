import { db } from "@/db";
import { Type, typeTable, Entity, entityTable } from "@/db/schema";

const main = async () => {
  try {
    await db.delete(entityTable);
    await db.delete(typeTable);

    const types: Type[] = [
      {
        name: "Restaurant",
        indicators: ["Braille Menu", "ADA Compliant Restroom"],
      },
      {
        name: "Other",
        indicators: ["Wheelchair Accessible"],
      },
    ];
    await db.insert(typeTable).values(types);

    const entities: Entity[] = [
      {
        id: "ChIJhzdfk-c1joARgotYrid1P9U",
        lat: "37.2831557",
        lon: "-121.93133379999999",
        maps: "https://maps.google.com/?cid=15366129266900634498",
        url: "https://hinodeya-campbell-town.square.site/",
        hours: [
          "Monday: 11:00 AM – 11:00 PM",
          "Tuesday: 11:00 AM – 11:00 PM",
          "Wednesday: 11:00 AM – 11:00 PM",
          "Thursday: 11:00 AM – 11:00 PM",
          "Friday: 11:00 AM – 11:00 PM",
          "Saturday: 11:00 AM – 11:00 PM",
          "Sunday: 11:00 AM – 11:00 PM",
        ],
        name: "Hinodeya Campbell Town",
        type: "Restaurant",
        description:
          "Down-to-earth Japanese restaurant whipping up karaage, takoyaki & ramen, plus tea, beer & sake.",
        utc: -420,
        country: "US",
        zip: "95008-4330",
        state: "California",
        city: "Campbell",
        address1: "2210 S Bascom Ave",
        address2: "",
        displayType: "Ramen Restaurant",
        createdAt: new Date("2025-05-03T20:16:07.776929Z"),
      },
      {
        id: "ChIJR1988Qm7j4ARi_KmggVETuc",
        lat: "37.4454813",
        lon: "-122.16072450000001",
        maps: "https://maps.google.com/?cid=16667334061402288779",
        url: "http://www.ramennagiusa.com/",
        hours: [
          "Monday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM",
          "Tuesday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM",
          "Wednesday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM",
          "Thursday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM",
          "Friday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM",
          "Saturday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM",
          "Sunday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM",
        ],
        name: "Ramen Nagi",
        type: "Restaurant",
        description:
          "Japanese noodle chain outpost offering customizable ramen bowls and vibrant-colored broths.",
        utc: -420,
        country: "US",
        zip: "94301",
        state: "California",
        city: "Palo Alto",
        address1: "541 Bryant St",
        address2: "",
        displayType: "Ramen Restaurant",
        createdAt: new Date("2025-05-03T20:01:28.048924Z"),
      },
      {
        id: "ChIJUeIQ74TMj4ARtyCMGA73CV0",
        lat: "37.3492359",
        lon: "-121.89409669999999",
        maps: "https://maps.google.com/?cid=6704161160231133367",
        url: "",
        hours: [
          "Monday: Closed",
          "Tuesday: 11:00 AM – 7:30 PM",
          "Wednesday: 11:00 AM – 7:30 PM",
          "Thursday: 11:00 AM – 8:30 PM",
          "Friday: 11:00 AM – 8:30 PM",
          "Saturday: 11:00 AM – 8:30 PM",
          "Sunday: 11:00 AM – 8:30 PM",
        ],
        name: "Kumako Ramen",
        type: "Restaurant",
        description:
          "Compact Japanese noodle shop with a variety of ramen dishes from pork broth to spicy & vegetarian.",
        utc: -420,
        country: "US",
        zip: "95112-3202",
        state: "California",
        city: "San Jose",
        address1: "211 Jackson St",
        address2: "",
        displayType: "Ramen Restaurant",
        createdAt: new Date("2025-05-03T20:04:45.872556Z"),
      },
    ];
    await db.insert(entityTable).values(entities);

    console.log("Database seeded, press Ctrl+C to exit");
  } catch (error) {
    console.error("Error seeding the database:", error);
    throw new Error("Error seeding database");
  }
};

main();
