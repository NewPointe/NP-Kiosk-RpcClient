import { RpcConnection } from "./RpcConnection";
import { compareOrigins } from "../Util";

export class WebMessageRpcConnection extends RpcConnection {

    /**
     * The message port to use for communication.
     */
    private messagePort?: MessagePort;

    /**
     * A backlog of messages to send once the message port is connected.
     */
    private messageBacklog: string[] = [];

    /**
     * Creates a new WebMessageRpcConnection
     */
    constructor() {
        super();
        window.addEventListener("message", this.OnWindowMessage.bind(this));
    }

    /**
     * Handles an incoming window message
     * @param ev The message event.
     */
    private OnWindowMessage(ev: MessageEvent): void {
        if (
            compareOrigins(window.location.toString(), ev.origin)
            && ev.data === "KIOSK_RPC_CLIENT_INIT"
            && ev.ports.length === 1
        ) {
            console.info('WebMessageRpcConnection: Got init message.');
            this.messagePort = ev.ports[0];
            this.messagePort.addEventListener("message", this.OnMessagePortMessage.bind(this));
            this.messagePort.addEventListener("messageerror", this.OnMessagePortMessageError.bind(this));
            while(this.messageBacklog.length) {
                this.messagePort.postMessage(this.messageBacklog.shift());
            }
        }
    }

    /**
     * Handles an incoming message port message
     * @param ev The message event.
     */
    private OnMessagePortMessage(ev: MessageEvent): void {
        this.handleIncomingMessage(ev.data);
    }

    /**
     * Handles an incoming message port error
     * @param ev The message event.
     */
    private OnMessagePortMessageError(ev: MessageEvent): void {
        console.log("WebMessageRpcConnection: WebMessage Error: " + ev.data);
    }

    /**
     * Writes a message to the connected message port.
     * @param message The message.
     */
    protected internalWrite(message: string): void {
        if(this.messagePort) {
            this.messagePort.postMessage(message);
        }
        else {
            this.messageBacklog.push(message);
        }
    }

}
