import { CardSource, CardDestination } from "./enumerations";
import { GraphicsInfo } from "./GraphicsInfo";
import { JsonObject } from "src/lib/rpc";

export interface ZebraCard extends JsonObject {
    CardSource: CardSource;
    CardDestination: CardDestination;
    GraphicsInfo: GraphicsInfo[];
}
