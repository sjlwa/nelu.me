import { z } from "astro:schema";

const base = {
  id: z.number().positive(),

  date: z.string().datetime({ offset: true }).refine((datetime) => {
    const now = new Date();
    const dateTimeObj = new Date(datetime);
    return dateTimeObj >= now;
  }, { message: `The date field cannot accept a date before the current calendar day.` }),

  location: z.string().nonempty(),
}

export const EventSchemaCreate = z.object({
  date: base.date,
  location: base.location,
});

export const EventSchemaUpdate = z.object({
  id: base.id,
  date: base.date,
  location: base.location,
});

export const EventSchemaDelete = z.object({
  id: base.id,
});
