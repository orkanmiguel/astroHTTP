import type { APIRoute, GetStaticPaths } from "astro";
import { getEntry } from "astro:content";
import { Clients, db, eq, FrasesM } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  /*   const body = {
    method: 'GET',
  }; */

  //select * from clients
  const users = await db.select().from(FrasesM);

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id, ...body } = await request.json();

    const { lastInsertRowid } = await db.insert(Clients).values(body);

    return new Response(
      JSON.stringify({ id: +lastInsertRowid!.toString(), ...body }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ msg: "no body found" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  return new Response(
    JSON.stringify({
      method: "PUT",
      ...body,
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
  const clientId = params.clientId ?? "";

  try {
    const { id, ...body } = await request.json();

    //update xxx=xxx, from Tabla ?? sin el where

    const results = await db
      .update(Clients)
      .set(body)
      .where(eq(Clients.id, +clientId));

    const updateClient = await db
      .select()
      .from(Clients)
      .where(eq(Clients.id, +clientId));

    return new Response(JSON.stringify(updateClient), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ msg: "no body found" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  return new Response(
    JSON.stringify({
      method: "DELETE",
      slug: slug,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
