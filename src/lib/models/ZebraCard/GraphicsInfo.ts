import { GraphicType, PrintType, CardSide, OrientationType } from "./enumerations";
import { Byte } from "./Byte";
import { JsonObject } from "src/lib/rpc";

/** Class for specifying the graphics information used during printing. */
export interface GraphicsInfo extends JsonObject {
    /** Background fill color. */
    FillColor: number;

    /** Bitmap image data. */
    GraphicData: Byte[] | null;

    /** Type of image data. */
    GraphicType: GraphicType;

    /** Opacity value - meaningful only with multiple bitmaps of the same PrintType. */
    Opacity: 0 | 1;

    /** Applies to UV PrintType only. */
    Overprint: boolean;

    /** Sets the amount of baseline energy used on the non-printed (white areas) of the card. */
    Preheat: number;

    /** Type of graphics information (color, mono, etc.). */
    PrintType: PrintType;

    /** Card side to print on. */
    Side: CardSide;

    /** X-offset (pixels) from origin 0, 0. */
    XOffset: number;

    /** Y-offset (pixels) from origin 0, 0.  */
    YOffset: number;

    /** The orientation of the image. */
    orientation: OrientationType;
}
