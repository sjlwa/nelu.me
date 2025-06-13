import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db, Event as EventEntity } from "astro:db";
import type { NewEvent, NewEventDTO } from "../types/event";

const newEventSchema = z.object({
  date: z.string().datetime(),
  location: z.string().nonempty(),
});

const events = {
  getAll: defineAction({
    handler: async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // TODO: remove delay
      const data = await db.select().from(EventEntity).all();
      return data;
    },
  }),
  create: defineAction({
    accept: "json",
    input: newEventSchema,
    handler: async (event: NewEventDTO) => {
      const newEvent: NewEvent = {
        date: new Date(event.date),
        location: event.location,
      };
      await new Promise(resolve => setTimeout(resolve, 1000)); // TODO: remove delay
      await db.insert(EventEntity).values(newEvent);
    },
  }),
}

export const server = {
  events,
};
