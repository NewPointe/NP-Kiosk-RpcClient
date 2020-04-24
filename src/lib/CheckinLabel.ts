import { JsonObject } from "./rpc";

export interface CheckinLabel extends JsonObject {
    FileGuid: string;
    LabelFile: string;
    LabelKey: string;
    LabelType: number;
    MergeFields: Record<string, string>;
    Order: number;
    PersonId: number;
    PrintFrom: number;
    PrintTo: number;
    PrinterAddress: string;
    PrinterDeviceId: number;
}
