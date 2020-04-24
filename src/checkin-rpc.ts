
import { CheckinRpcClient, CheckinRpcClientConfig, JsonValue } from './lib';
export { CheckinRpcClient, CheckinRpcClientConfig };

declare global {
    interface Window {
        _checkinRpcClientInit?: boolean;
        ZebraPrintPlugin?: {
            printTags?: (labelJson: string, success: () => void, fail: () => void) => void;
        };
        Cordova?: {
            exec?: (success: () => void, fail: () => void, classname: string, method: string, args: any[]) => void;
        };
        labelData?: JsonValue;
        onDeviceReady?: () => void;
    }
    interface External {
        PrintLabels?: (labels: string) => void;
    }

}

function tryParse<T>(data: string): Promise<T> {
    return new Promise(resolve => resolve(JSON.parse(data)));
}

function initRpcClient(config: CheckinRpcClientConfig): void {
    const client = new CheckinRpcClient(config);
    if (config.shim) {

        // Windows client compatibility shim
        if (!window.external) (window as any).external = {};
        window.external.PrintLabels = (labelsJson: string): void => {
            client.printLabels(JSON.parse(labelsJson));
        };

        // iOS client compatibility shim
        if (!window.Cordova) window.Cordova = {};
        window.Cordova.exec = (success, fail, classname, method, args): void => {
            if (classname === "ZebraPrint" && method === "printTags") {
                client.printLabels(JSON.parse(args[0])).then(success, fail);
            }
            else if (classname === "ApplicationPreferences") {
                if (method === "getSetting") {
                    client.getAppPreference(args[0].key).then(success, fail);
                }
                else if (method === "setSetting") {
                    client.setAppPreference(args[0].key, args[0].value).then(success, fail);
                }
            }
        };

        // ZebraPrintPlugin compatibility shim
        if (!window.ZebraPrintPlugin) window.ZebraPrintPlugin = {};
        window.ZebraPrintPlugin.printTags = (labelJson, success, fail): void => {
            client.printLabels(JSON.parse(labelJson)).then(success, fail);
        };


    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (!window._checkinRpcClientInit) {
        window._checkinRpcClientInit = true;
        const initElement = document.getElementById("checkin-rpc-init");
        if (initElement instanceof HTMLScriptElement) {
            const content = initElement.innerHTML;
            if (content.trim()) {
                tryParse<CheckinRpcClientConfig>(content).then(
                    config => initRpcClient(config),
                    error => console.error(`checkin-rpc: Found a 'checkin-rpc-init' element, but it did not contain valid JSON.\nDetails: ${error}`)
                );
            }
            else if (initElement.src) {
                fetch(initElement.src)
                    .then(data => {
                        if (data.ok) {
                            data.json().then(
                                config => initRpcClient(config),
                                error => console.error(`checkin-rpc: Found a 'checkin-rpc-init' element, but it did not contain valid JSON.\nDetails: ${error}`)
                            );
                        }
                        else {
                            console.error(`checkin-rpc: Found a 'checkin-rpc-init' element, but it's source could not be loaded.\nUrl: ${data.url}\nStatus: ${data.status} ${data.statusText}`)
                        }
                    })
                    .catch(
                        error => console.error(`checkin-rpc: Found a 'checkin-rpc-init' element, but it's source could not be loaded.\nDetails: ${error}`)
                    );
            }
            else {
                console.error("checkin-rpc: Found a 'checkin-rpc-init' element, but it was empty.");
            }
        }
        else if (initElement instanceof HTMLInputElement) {
            const content = initElement.value;
            if (content.trim()) {
                tryParse<CheckinRpcClientConfig>(content).then(
                    config => initRpcClient(config),
                    error => console.error(`checkin-rpc: Found a 'checkin-rpc-init' element, but it did not contain valid JSON.\nDetails: ${error}`)
                );
            }
            else {
                console.error("checkin-rpc: Found a 'checkin-rpc-init' element, but it was empty.");
            }
        }
        else if (initElement) {
            console.error("checkin-rpc: Found a 'checkin-rpc-init' element, but it is not a supported element type.");
        }
    }
});
