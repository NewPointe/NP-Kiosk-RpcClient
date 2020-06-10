import { CheckinLabel } from "./models/CheckinLabel";
import { KioskRpcClientApi } from "./KioskRpcClientApi";
import { KioskRpcClientConfig } from "./KioskRpcClientConfig";
import { WebMessageRpcConnection, RpcConnection } from "./rpc";
import { ZebraCard } from "./models";

export class KioskRpcClient implements KioskRpcClientApi {
    private readonly connection: RpcConnection;
    constructor(config: KioskRpcClientConfig) {
        if(config.connection === "webmessage") {
            this.connection = new WebMessageRpcConnection();
        }
        else {
            throw new Error(`KioskRpcClient: Invalid config.connection value "${config.connection}".`);
        }
    }

    PrintLabels(labels: CheckinLabel[]): Promise<void> {
        return this.connection.sendRequest("PrintLabels", [labels]);
    }

    StartCamera(passive: boolean): Promise<void> {
        return this.connection.sendRequest("StartCamera", [passive]);
    }

    StopCamera(): Promise<void> {
        return this.connection.sendRequest("StopCamera", []);
    }

    SetKioskId(kioskId: number): Promise<void> {
        return this.connection.sendRequest("SetKioskId", [kioskId]);
    }

    PrintCards(cards: ZebraCard[]): Promise<void> {
        return this.connection.sendRequest("PrintCards", [cards]);
    }

    GetAppPreference(key: string): Promise<string | null> {
        return this.connection.sendRequest("GetAppPreference", [key]);
    }

    SetAppPreference(key: string, value: string | null): Promise<boolean> {
        return this.connection.sendRequest("SetAppPreference", [key, value]);
    }

    ShowSettings(): Promise<void> {
        return this.connection.sendRequest("ShowSettings", []);
    }
}
