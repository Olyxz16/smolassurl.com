import { a, ainverse, m, c, maskone, masktwo } from './constants';

/**
 * @param {string} str
 */
export async function hash(str: string) : Promise<string> {

    let val = BigInt("0x"+encode(str));
    
    val ^=(val >> 1797118n);
    let revp = val^((val % masktwo) << 1497599n);
    val = val^((revp % masktwo) << 1497599n);
    revp = val^((val % maskone) << 698879n);
    revp = val^((revp %maskone) << 698879n);
    revp = val^((revp %maskone) << 698879n);
    revp = val^((revp %maskone) << 698879n);
    val = val^((revp %maskone) << 698879n);
    revp = val^(val >> 1098239n);
    revp = val^(revp >> 1098239n);
    val = val^(revp >> 1098239n);
    val = (ainverse*(val-c))%m;
    if (val<0) {val += m;}

    return val.toString();

}

/**
 * @param {string} str
 */
export async function dehash(str : string) : Promise<string> {

    let restore = BigInt(str);

    restore = (a*(restore)+c)%m;
    restore ^= (restore >> 1098239n);
    restore ^=((restore%maskone) << 698879n);
    restore ^=((restore%masktwo) << 1497599n);
    restore ^=(restore >> 1797118n);

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