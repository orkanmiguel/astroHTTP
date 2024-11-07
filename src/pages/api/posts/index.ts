import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  //Validdamos si el slug existe {nombre del slug}
  if (slug) {
    //traemos y esperamos el valor del slug
    const post = await getEntry("blog", slug);
    console.log("slug data", post);
    //si el post existe trae toda su data y retorna un 2000 y la informacion en formato json
    if (post) {
      return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
          "Contetn-Type": "aplication/json",
        },
      });
    }
    // en el caso de que el slug este sin datos o "undefine" por defecto retorna error 404 y el nombre del slug que no existe.
    return new Response(JSON.stringify({ msg: `Post ${slug} not found` }), {
      status: 404,
      headers: {
        "Contetn-Type": "aplication/json",
      },
    });
  }

  const posts = await getCollection("blog");
  //console.log("slug", slug);

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: {
      "Contetn-Type": "aplication/json",
    },
  });
};
