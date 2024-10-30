import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const person = {
    name: "Orkan Miguel",
    rol: "dev",
  };

  return new Response(JSON.stringify(person), {
    status: 200,
    headers: {
      "Contetn-Type": "aplication/json",
    },
  });
};
