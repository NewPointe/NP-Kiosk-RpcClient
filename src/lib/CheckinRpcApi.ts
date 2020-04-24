import { CheckinLabel } from "./CheckinLabel";

export interface CheckinRpcApi {
    printLabels(labels: CheckinLabel[]): void;
    getAppPreference(key: string): string | null;
    setAppPreference(key: string, value: string | null): boolean;
    showSettings(): void;
}
