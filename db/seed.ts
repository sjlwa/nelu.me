import { db, Event } from 'astro:db';

export default async function seed() {
	await db.insert(Event).values([
      {
        id: 1,
        date: new Date(),
        location: "Villa de Alvarez, Colima. Mi casita.",
      },
      {
        id: 2,
        date: new Date(),
        location: "Comala, Colima. Mi otra casita.",
      },
      {
        id: 3,
        date: new Date(),
        location: "Un lugar desconocido. Por ahi.",
      },
    ]);
}
