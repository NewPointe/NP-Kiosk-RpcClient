import { CheckinRpcApi } from "./CheckinRpcApi";

export type CheckinRpcClientApi = {
    [K in keyof CheckinRpcApi]: (...params: Parameters<CheckinRpcApi[K]>) => Promise<ReturnType<CheckinRpcApi[K]>>
}
