import { defineDb, defineTable, column } from 'astro:db';

const Event = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    date: column.date(),
    location: column.text(),
  }
});

export default defineDb({
  tables: { Event }
});
