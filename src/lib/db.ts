import { error } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
 
const min: number = 10000;
const max: number = 99999;


export async function GetKeyFromURL(url: string) {
  const req = (await sql`SELECT * FROM urls WHERE url=${url}`).rows[0];
  if(req !== undefined) {
    return req["id"];
  }
  let id = Math.floor(Math.random() * (max - min) + min);
  await sql`INSERT INTO urls VALUES (${id}, ${url})`;
  return id;
}


export async function GetURLFromKey(key: string) {
  const req = (await sql`SELECT * FROM urls WHERE id=${key}`).rows[0];
  if(req === undefined) {
    throw error(404);
  }
  return req['url'];
}






