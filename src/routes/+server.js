import { hash } from '$lib/hash'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const body = await request.json();
    return new Response(await hash(body));
}
