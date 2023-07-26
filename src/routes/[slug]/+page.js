import { redirect } from '@sveltejs/kit';
import { dehash } from '$lib/hash';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const url = dehash(params.slug);
    throw redirect(302, url);
}