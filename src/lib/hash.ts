//import { gzip } from "node-gzip";

/**
 * @param {string} val
 */
function hash(val: string) : string {
    return btoa(val);
}

/**
 * @param {string} val
 */
function dehash(val : string) : string {
    return atob(val);
}

export { hash };
export { dehash };