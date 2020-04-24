import { JsonValue } from "../JsonTypes";
import { PromiseReturn } from "../PromiseReturn";
import { RpcRequestParameters, RpcRequest } from "../RpcRequest";
import { generateGuid } from "../Util";
import { RpcResponse } from "../RpcResponse";

/**
 * The base class for an RPC Connections.
 */
export abstract class RpcConnection {
    /**
     * The promise callbacks to match to incomming messages.
     */
    private callbacks = new Map<string, PromiseReturn>();

    /**
     * Sends a JSON RPC notification to the connected host.
     * @param method The method to run.
     * @param params The parameters to the method.
     */
    public sendNotification(method: string, params: RpcRequestParameters): void {
        this.internalWrite(JSON.stringify({ jsonrpc: "2.0", method, params } as RpcRequest));
    }

    /**
     * Sends a JSON RPC request to the connected host.
     * @param method The method to run.
     * @param params The parameters to the method.
     * @return A promise for the result of executing the method.
     */
    public sendRequest<TResp extends JsonValue | void>(method: string, params: RpcRequestParameters): Promise<TResp> {
        const id = generateGuid();
        const callback = new Promise<TResp>((resolve, reject) => this.callbacks.set(id, { resolve, reject }));
        this.internalWrite(JSON.stringify({ jsonrpc: "2.0", method, params, id }));
        return callback;
    }

    /**
     * Writes a message to the connected host.
     * @param message The message to write to the host.
     */
    protected abstract internalWrite(message: string): void;

    /**
     * Handles an incomming RPC message.
     * @param message The message.
     */
    protected handleIncomingMessage(message: string): void {
        let response: RpcResponse;
        try {
            response = JSON.parse(message);
        }
        catch (e) {
            console.error(`[RpcClient] Failed to parse JSON data from incomming message.\nError: ${e.message}\nMessage: ${message}`);
            return;
        }
        if (response.id) {
            const id = response.id.toString();
            const callback = this.callbacks.get(id);
            if (callback) {
                this.callbacks.delete(id);
                if ('error' in response) {
                    callback.reject(new Error(response.error?.message));
                }
                else if ('result' in response) {
                    callback.resolve(response.result);
                }
            }
        }
    }
}
