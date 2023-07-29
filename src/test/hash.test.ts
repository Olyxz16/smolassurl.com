import { hash, dehash } from '$lib/hash';
import { test, expect } from "vitest";

const values: string[] = ["https://www.twitter.com"];

test("hash", async () => {
    values.forEach(async element => expect(await dehash(await hash(element))).to.equal(element));
});