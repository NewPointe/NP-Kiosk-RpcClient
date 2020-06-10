import { CheckinLabel } from "./models/CheckinLabel";
import { ZebraCard } from "./models/ZebraCard";

export interface KioskRpcClientApi {

    // RockCheckinNative

    /**
     * Prints the checkin labels.
     * @param labels The labels to print.
     */
    PrintLabels(labels: CheckinLabel[]): Promise<void>;

    /**
     * Starts the camera for QR scanning.
     * @param passive If the camera sould run passively in the background.
     */
    StartCamera(passive: boolean): Promise<void>;

    /**
     * Stops the camera.
     */
    StopCamera(): Promise<void>;

    /**
     * Sets the Kiosk's Id.
     * @param kioskId The Kiosk Id.
     */
    SetKioskId(kioskId: number): Promise<void>;

    // NP Extensions

    /**
     * Prints the cards.
     * @param cards The cards to print.
     */
    PrintCards(cards: ZebraCard[]): Promise<void>;

    /**
     * Gets an app preference.
     * @param key The preference key.
     */
    GetAppPreference(key: string): Promise<string | null>;

    /**
     * Sets an app preference.
     * @param key The preference key.
     * @param value The value to set.
     */
    SetAppPreference(key: string, value: string | null): Promise<boolean>;

    /**
     * Shows the in-app settings.
     */
    ShowSettings(): Promise<void>;
}
