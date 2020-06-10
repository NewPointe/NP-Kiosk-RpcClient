import { CheckinLabel } from "./models/CheckinLabel";
import { ZebraCard } from "./models/ZebraCard";

export interface CheckinRpcApi {
    printLabels(labels: CheckinLabel[]): void;
    printCards(cards: ZebraCard[]): void;
    getAppPreference(key: string): string | null;
    setAppPreference(key: string, value: string | null): boolean;
    showSettings(): void;
}
