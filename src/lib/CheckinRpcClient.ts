import { CheckinLabel } from "./models/CheckinLabel";
import { CheckinRpcClientApi } from "./CheckinRpcClientApi";
import { CheckinRpcClientConfig } from "./CheckinRpcClientConfig";
import { WebMessageRpcConnection, RpcConnection } from "./rpc";
import { ZebraCard } from "./models";

export class CheckinRpcClient implements CheckinRpcClientApi {
    private readonly connection: RpcConnection;
    constructor(config: CheckinRpcClientConfig) {
        if(config.connection === "webmessage") {
            this.connection = new WebMessageRpcConnection();
        }
        else {
            throw new Error(`CheckinRpcClient: Invalid config.connection value "${config.connection}".`);
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
