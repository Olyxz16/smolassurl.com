import { GetKeyFromURL } from '$lib/db.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = (await request.json()).data;
    const key = await GetKeyFromURL(data);
    return new Response(key);
}

