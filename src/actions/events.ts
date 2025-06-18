import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, Event as EventsTable, eq } from "astro:db";
import type { NewNeluEvent, NewNeluEventDTO, NeluEvent, NeluEventDTO } from "../types/event";

const EventSchemaCreate = z.object({
  date: z.string().datetime(),
  location: z.string().nonempty(),
});

const EventSchemaUpdate = z.object({
  id: z.number().positive(),
  date: z.string().datetime(),
  location: z.string().nonempty(),
});

const EventSchemaDelete = z.object({
  id: z.number().positive(),
});


export const events = {

  getAll: defineAction({
    handler: async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // TODO: remove delay
      const data = await db.select().from(EventsTable).all();
      return data;
    },
  }),

  create: defineAction({
    accept: "json",
    input: EventSchemaCreate,
    handler: async (event: NewNeluEventDTO) => {
      const newEvent: NewNeluEvent = {
        date: new Date(event.date),
        location: event.location,
      };
      await new Promise(resolve => setTimeout(resolve, 1000)); // TODO: remove delay
      await db.insert(EventsTable).values(newEvent);
    },
  }),

  update: defineAction({
    accept: "json",
    input: EventSchemaUpdate,
    handler: async (event: NeluEventDTO) => {
      const neluEvent: NeluEvent = {
        id: event.id,
        date: new Date(event.date),
        location: event.location,
      };
      await new Promise(resolve => setTimeout(resolve, 2000)); // TODO: remove delay
      await db.update(EventsTable).set(neluEvent).where(eq(EventsTable.id, neluEvent.id));
    },
  }),

  delete: defineAction({
    accept: "json",
    input: EventSchemaDelete,
    handler: async (data: { id: number }) => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // TODO: remove delay
      await db.delete(EventsTable).where(eq(EventsTable.id, data.id));
    },
  }),
}
