import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  return new Response("OK!", { status: 200 });
};
