import { JsonValue } from "./JsonTypes";

export type RpcRequestParameters = Array<JsonValue> | Record<string, JsonValue>;

export interface RpcRequest {
    jsonrpc: "2.0";
    method: string;
    params?: RpcRequestParameters;
    id?: string | number | null;
}
