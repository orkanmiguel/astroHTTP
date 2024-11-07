import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  return new Response(
    JSON.stringify({
      method: "GET",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const POST: APIRoute = async ({ params, request }) => {
  const { id } = await params;

  return new Response(
    JSON.stringify({
      method: "POST",
      clientId: id,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = await params;

  return new Response(
    JSON.stringify({
      method: "PUT",
      clientId: id,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const PATCH: APIRoute = async ({ params, request }) => {
  const { id } = await params;

  return new Response(
    JSON.stringify({
      method: "PATCH",
      clientId: id,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { id } = await params;

  return new Response(
    JSON.stringify({
      method: "DELETE",
      clientId: id,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
