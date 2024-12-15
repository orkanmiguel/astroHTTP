import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import { Clients, db, eq, FrasesM } from "astro:db";
import { E } from "../../../../dist/_worker.js/chunks/astro/assets-service_sDQW2Zyw.mjs";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clientId = params.id ?? "";
  ///console.log("Revisando id", clientId);
  //const users = await db.select().from(Clients);

  const clients = await db
    .select()
    .from(FrasesM)
    .where(eq(FrasesM.id, +clientId));

  console.log("Revisando clients", clients);
  if (clients.length === 0) {
    return new Response(JSON.stringify({ msg: `id : ${clientId} no existe` }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response(JSON.stringify(clients.at(0)), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
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
  const clientId = params.id ?? "";
  //console.log("id", clientId);
  try {
    const { id, ...body } = await request.json();

    //update xxx=xxx, from Tabla ?? sin el where
    console.log();
    const results = await db
      .update(FrasesM)
      .set(body)
      .where(eq(FrasesM.id, +clientId));

    const updatedClient = await db
      .select()
      .from(FrasesM)
      .where(eq(FrasesM.id, +clientId));

    return new Response(JSON.stringify(updatedClient.at(0)), {
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
  const clientId = params.id ?? "";

  const { rowsAffected } = await db
    .delete(FrasesM)
    .where(eq(FrasesM.id, +clientId));

  if (rowsAffected > 0) {
    return new Response(JSON.stringify({ msg: "Deleted" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(
    JSON.stringify({ msg: `CLient with id ${clientId} not found` }),
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
