import { a, ainverse, m, c, maskone, masktwo } from './constants';

/**
 * @param {string} str
 */
export async function hash(str: string) : Promise<string> {

    let val = BigInt("0x"+encode(str));
    
    let hash : bigint = 0n;
    hash = (a*(val)+c)%m;
    hash ^= (hash >> 1098239n);
    hash ^=((hash%maskone) << 698879n);
    hash ^=((hash%masktwo) << 1497599n);
    hash ^=(hash >> 1797118n);

    return hash.toString();

}

/**
 * @param {string} str
 */
export async function dehash(str : string) : Promise<string> {

    let restore = BigInt(str);

    restore ^=(restore >> 1797118n);
    let revp = restore^((restore % masktwo) << 1497599n);
    restore = restore^((revp % masktwo) << 1497599n);
    revp = restore^((restore % maskone) << 698879n);
    revp = restore^((revp %maskone) << 698879n);
    revp = restore^((revp %maskone) << 698879n);
    revp = restore^((revp %maskone) << 698879n);
    restore = restore^((revp %maskone) << 698879n);
    revp = restore^(restore >> 1098239n);
    revp = restore^(revp >> 1098239n);
    restore = restore^(revp >> 1098239n);
    restore = (ainverse*(restore-c))%m;
    if (restore<0) {restore += m;}

    return decode(restore.toString(16));

}



function encode(val: string) : string {
    return val.split("")
     .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
     .join("")
}
function decode(hex: string) : string {
    return hex.split(/(\w\w)/g)
    .filter(p => !!p)
    .map(c => String.fromCharCode(parseInt(c, 16)))
    .join("")
}