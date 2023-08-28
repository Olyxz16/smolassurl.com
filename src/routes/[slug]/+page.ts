import { redirect, error } from '@sveltejs/kit';
import { GetURLFromKey } from '$lib/db.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const key = params.slug;
    if(!validateKey(key)) {
       throw error(404);
    }
    const url = await GetURLFromKey(key);
    throw redirect(302, url);
}



function validateKey(key: string) {
    return !Number.isNaN(parseInt(key));
}