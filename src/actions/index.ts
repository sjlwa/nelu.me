import { defineAction } from "astro:actions";
import { db, Event as EventEntity } from "astro:db";

const events = {
  getAll: defineAction({
    handler: async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // TODO: remove delay
      const data = await db.select().from(EventEntity).all();
      return data;
    },
  }),
}

export const server = {
  events,
};
