import { hash, dehash } from '$lib/hash';
import { test, expect } from "vitest";

const values: string[] = ["https://www.twitter.com"];

test("hash", async () => {
    values.forEach(element => expect(dehash(hash(element))).to.equal(element));
});