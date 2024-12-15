import { column, defineDb, defineTable } from "astro:db";

const Clients = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean(),
  },
});

const Post = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    title: column.text(),
    likes: column.number(),
  },
});

const FrasesM = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    fraseM: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Clients,
    Post,
    FrasesM,
  },
});
