import { getCollection } from "astro:content";
import { Clients, db, Post } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO
  await db.insert(Clients).values([
    { id: 1, name: "Kasim", age: 35, isActive: true },
    { id: 2, name: "orkan", age: 111, isActive: true },
    { id: 3, name: "torfin", age: 12, isActive: true },
    { id: 4, name: "ragnar", age: 122, isActive: true },
    { id: 5, name: "loki", age: 143, isActive: true },
    { id: 6, name: "luffy", age: 2, isActive: true },
  ]);

  const posts = await getCollection("blog");

  await db.insert(Post).values(
    posts.map((p) => ({
      id: p.id,
      title: p.data.title,
      likes: Math.round(Math.random() * 100),
    }))
  );

  console.log("seed ");
}
