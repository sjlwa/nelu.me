import { db, Event } from "astro:db";

export default async function seed() {
  await db.insert(Event).values([
    {
      id: 1,
      date: new Date("2026-08-07T05:05-06:00"),
      location: "Villa de Alvarez, Colima. Mi casita.",
    },
    {
      id: 2,
      date: new Date("2025-12-01T10:30-06:00"),
      location: "Comala, Colima. Mi otra casita.",
    },
    {
      id: 3,
      date: new Date(),
      location: "Un lugar desconocido. Por ahi.",
    },
  ]);
}
