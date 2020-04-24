import { JsonValue } from "./JsonTypes";
import { RpcError } from "./RpcError";

export interface RpcResponseSuccess {
    jsonrpc: "2.0";
    result?: JsonValue;
    id: string | number | null;
}

export interface RpcResponseError {
    jsonrpc: "2.0";
    error?: RpcError;
    id: string | number | null;
}

export type RpcResponse = RpcResponseSuccess | RpcResponseError;
