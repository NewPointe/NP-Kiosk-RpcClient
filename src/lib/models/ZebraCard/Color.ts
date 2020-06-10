import { Byte } from "./Byte";

/** Represents an ARGB (alpha, red, green, blue) color. */
export interface Color {
    /** The alpha component. Valid values are 0 through 255. */
    A: Byte;

    /** The red component. Valid values are 0 through 255. */
    R: Byte;

    /** The green component. Valid values are 0 through 255. */
    G: Byte;

    /** The blue component. Valid values are 0 through 255. */
    B: Byte;
}
