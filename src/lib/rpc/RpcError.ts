import { JsonValue } from "./JsonTypes";

export interface RpcError {
    code: number;
    message: string;
    data?: JsonValue;
}
