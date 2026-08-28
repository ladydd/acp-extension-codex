import type {SessionConfigOption} from "@agentclientprotocol/sdk";
import type * as acp from "@agentclientprotocol/sdk";
import type {Model} from "./app-server/v2";

export const FAST_MODE_CONFIG_ID = "fast-mode";
export const FAST_MODE_CATEGORY = "model_config";
export const FAST_MODE_ON = "on";
export const FAST_MODE_OFF = "off";

/** Catalog / request id Codex 0.148+ reports and accepts for Fast mode. */
export const FAST_SERVICE_TIER = "priority";
/** Legacy request value still accepted as an alias of Fast mode. */
export const LEGACY_FAST_SERVICE_TIER = "fast";

const FAST_MODE_DESCRIPTION = "1.5x speed, increased usage";

export function isFastServiceTier(value: string | null | undefined): boolean {
    return value === FAST_SERVICE_TIER || value === LEGACY_FAST_SERVICE_TIER;
}

export function modelSupportsFast(model: Model | undefined): boolean {
    return model?.additionalSpeedTiers?.includes("fast") ?? false;
}

export function resolveFastServiceTier(fastModeEnabled: boolean, currentModelSupportsFast: boolean): string | null {
    return fastModeEnabled && currentModelSupportsFast ? FAST_SERVICE_TIER : null;
}

export function clientSupportsBooleanConfigOptions(clientCapabilities?: acp.ClientCapabilities | null): boolean {
    return clientCapabilities?.session?.configOptions?.boolean != null;
}

export function createFastModeConfigOption(fastModeEnabled: boolean, useBooleanConfigOption = false): SessionConfigOption {
    if (useBooleanConfigOption) {
        return {
            id: FAST_MODE_CONFIG_ID,
            name: "Fast mode",
            description: FAST_MODE_DESCRIPTION,
            category: FAST_MODE_CATEGORY,
            type: "boolean",
            currentValue: fastModeEnabled,
        };
    }

    return {
        id: FAST_MODE_CONFIG_ID,
        name: "Fast mode",
        description: FAST_MODE_DESCRIPTION,
        category: FAST_MODE_CATEGORY,
        type: "select",
        currentValue: fastModeEnabled ? FAST_MODE_ON : FAST_MODE_OFF,
        options: [
            {
                value: FAST_MODE_OFF,
                name: "Off",
                description: "Default speed, normal usage",
            },
            {
                value: FAST_MODE_ON,
                name: "On",
                description: FAST_MODE_DESCRIPTION,
            },
        ],
    };
}
