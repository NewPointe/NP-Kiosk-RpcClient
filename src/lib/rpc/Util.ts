
/**
 * Lookup table for hex conversion
 */
const hex = Array(256).fill(0).map((_, i) => i.toString(16).padStart(2, '0'));

/**
 * Generates a random GUID
 */
export function generateGuid(): string {
    const b = new Uint8Array(16);
    window.crypto.getRandomValues(b);
    return hex[b[0]] + hex[b[1]] + hex[b[2]] + hex[b[3]] + '-' + hex[b[4]] + hex[b[5]] + '-' + hex[b[6] | 0x40] + hex[b[7]] + '-' + hex[b[8] | 0x80] + hex[b[9]] + '-' + hex[b[10]] + hex[b[11]] + hex[b[12]] + hex[b[13]] + hex[b[14]] + hex[b[15]];
}

/**
 * Compares the origins of the specifies urls.
 * @param a The first url.
 * @param b The second url.
 */
export function compareOrigins(a: string | URL, b: string | URL): boolean {
    if(typeof a === 'string') a = new URL(a);
    if(typeof b === 'string') b = new URL(b);
    return a.origin === b.origin;
}
