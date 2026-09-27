<script lang="ts" setup>
defineProps<{
    lightParking: boolean;
    lightLow: boolean;
    lightHigh: boolean;
    lightBeacon: boolean;
    brakeParking: boolean;
    truckDamage: number;
    trailerDamage: number;
    cargoDamage: number;
    truckParts: number[];
    trailerParts: number[];
}>();

const { t } = useTranslations();
const { settings } = useSettings();

const showDamage = computed(() =>
    settings.value.activeUiComponents.includes("dashDamage"),
);
const showLights = computed(() =>
    settings.value.activeUiComponents.includes("dashLights"),
);

function damageClass(pct: number) {
    if (pct >= 25) return "dmg-red";
    if (pct >= 10) return "dmg-amber";
    return "dmg-green";
}
</script>

<template>
    <div v-show="showDamage || showLights" class="dash-strip">
        <div v-show="showDamage" class="strip-group">
            <div
                class="dmg-item"
                :title="`${t('dash.truck')}: eng/trans/cab/chas/wheel ${(truckParts ?? []).join('/')}`"
            >
                <Icon name="lucide:truck" size="20" :class="damageClass(truckDamage)" />
                <span class="dmg-text" :class="damageClass(truckDamage)">{{ truckDamage }}%</span>
            </div>
            <div
                class="dmg-item"
                :title="`${t('dash.trailer')}: body/chas/wheel ${(trailerParts ?? []).join('/')}`"
            >
                <Icon name="lucide:container" size="20" :class="damageClass(trailerDamage)" />
                <span class="dmg-text" :class="damageClass(trailerDamage)">{{ trailerDamage }}%</span>
            </div>
            <div class="dmg-item" :title="t('dash.cargo')">
                <Icon name="lucide:package" size="20" :class="damageClass(cargoDamage)" />
                <span class="dmg-text" :class="damageClass(cargoDamage)">{{ cargoDamage }}%</span>
            </div>
        </div>
        <div v-show="showDamage && showLights" class="strip-divider"></div>
        <div v-show="showLights" class="strip-group lights">
            <Icon
                name="mdi:car-parking-lights"
                size="20"
                class="lamp"
                :class="{ on: lightParking }"
                :title="t('dash.parkingLights')"
            />
            <Icon
                name="mdi:car-light-dimmed"
                size="20"
                class="lamp"
                :class="{ on: lightLow }"
                :title="t('dash.lowBeam')"
            />
            <Icon
                name="mdi:car-light-high"
                size="20"
                class="lamp"
                :class="{ on: lightHigh }"
                :title="t('dash.highBeam')"
            />
            <Icon
                name="mdi:alarm-light-outline"
                size="20"
                class="lamp"
                :class="{ on: lightBeacon }"
                :title="t('dash.beacon')"
            />
            <Icon
                name="mdi:car-brake-parking"
                size="20"
                class="lamp park"
                :class="{ on: brakeParking }"
                :title="t('dash.parkingBrake')"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dash-strip {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: calc(100vw - 20px);
    flex-wrap: wrap;
    justify-content: flex-end;
    background-color: rgba($primaryDarkerColor, 0.85);
    border: 1px solid $secondaryColor;
    border-radius: 10px;
    padding: 6px 10px;
    box-shadow: $default-box-shadow;
    backdrop-filter: blur(6px);
    pointer-events: auto;
}

.strip-group {
    display: flex;
    align-items: center;
    gap: 10px;

    &.lights {
        gap: 6px;
    }
}

.strip-divider {
    width: 1px;
    align-self: stretch;
    background-color: $secondaryColor;
}

.dmg-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

.dmg-text {
    font-size: 1.3rem;
    font-weight: 700;
    white-space: nowrap;
}

.dmg-green {
    color: $green-color;
}

.dmg-amber {
    color: $warning-color;
}

.dmg-red {
    color: $red-color;
}

.lamp {
    opacity: 0.3;

    &.on {
        opacity: 1;
        color: $warning-color;
    }

    &.park.on {
        color: $red-color;
    }
}
</style>
