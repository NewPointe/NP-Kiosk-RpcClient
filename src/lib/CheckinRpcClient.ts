import { CheckinLabel } from "./CheckinLabel";
import { CheckinRpcClientApi } from "./CheckinRpcClientApi";
import { CheckinRpcClientConfig } from "./CheckinRpcClientConfig";
import { WebMessageRpcConnection, RpcConnection } from "./rpc";

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

    printLabels(labels: CheckinLabel[]): Promise<void> {
        return this.connection.sendRequest("printLabels", [labels]);
    }

    getAppPreference(key: string): Promise<string> {
        return this.connection.sendRequest("getAppPreference", [key]);
    }

    setAppPreference(key: string, value: string | null): Promise<boolean> {
        return this.connection.sendRequest("setAppPreference", [key, value]);
    }

    showSettings(): Promise<void> {
        return this.connection.sendRequest("showSettings", []);
    }
}
