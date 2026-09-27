import { KeepAwake } from "@capacitor-community/keep-awake";
import { Capacitor } from "@capacitor/core";

let wakeSentinel: { release: () => Promise<void> } | null = null;
let visibilityHandler: (() => void) | null = null;
let wantLock = false;

async function requestWebLock() {
    try {
        const nav = navigator as Navigator & {
            wakeLock?: { request: (type: string) => Promise<{ release: () => Promise<void> }> };
        };
        if (!nav.wakeLock) return;
        if (document.visibilityState !== "visible") return;
        wakeSentinel = await nav.wakeLock.request("screen");
    } catch {
        wakeSentinel = null;
    }
}

async function releaseWebLock() {
    if (visibilityHandler) {
        document.removeEventListener("visibilitychange", visibilityHandler);
        visibilityHandler = null;
    }
    if (wakeSentinel) {
        try {
            await wakeSentinel.release();
        } catch {
            // Already released by the browser.
        }
        wakeSentinel = null;
    }
}

async function applyNativeLock(enabled: boolean) {
    try {
        const result = await KeepAwake.isSupported();
        if (!result.isSupported) return;
        if (enabled) {
            await KeepAwake.keepAwake();
        } else {
            await KeepAwake.allowSleep();
        }
    } catch {
        // Plugin unavailable (e.g. plain web build).
    }
}

export const useKeepAwake = () => {
    const acquire = async () => {
        wantLock = true;
        if (Capacitor.isNativePlatform()) {
            await applyNativeLock(true);
            return;
        }
        if (wakeSentinel) return;
        await requestWebLock();
        if (!visibilityHandler) {
            visibilityHandler = () => {
                if (wantLock && document.visibilityState === "visible") {
                    void requestWebLock();
                }
            };
            document.addEventListener("visibilitychange", visibilityHandler);
        }
    };

    const release = async () => {
        wantLock = false;
        if (Capacitor.isNativePlatform()) {
            await applyNativeLock(false);
            return;
        }
        await releaseWebLock();
    };

    const applySetting = async (enabled: boolean) => {
        if (enabled) {
            await acquire();
        } else {
            await release();
        }
    };

    return { acquire, release, applySetting };
};
