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

function damageClass(pct: number) {
    if (pct >= 25) return "dmg-red";
    if (pct >= 10) return "dmg-amber";
    return "dmg-green";
}
</script>

<template>
    <div class="dash-strip">
        <div class="strip-group">
            <div
                class="dmg-item"
                :title="`eng/trans/cab/chas/wheel: ${(truckParts ?? []).join('/')}`"
            >
                <Icon name="lucide:truck" size="20" :class="damageClass(truckDamage)" />
                <span class="dmg-text" :class="damageClass(truckDamage)">{{ t("dash.truck") }} {{ truckDamage }}%</span>
            </div>
            <div
                class="dmg-item"
                :title="`body/chas/wheel: ${(trailerParts ?? []).join('/')}`"
            >
                <Icon name="lucide:container" size="20" :class="damageClass(trailerDamage)" />
                <span class="dmg-text" :class="damageClass(trailerDamage)">{{ t("dash.trailer") }} {{ trailerDamage }}%</span>
            </div>
            <div class="dmg-item">
                <Icon name="lucide:package" size="20" :class="damageClass(cargoDamage)" />
                <span class="dmg-text" :class="damageClass(cargoDamage)">{{ t("dash.cargo") }} {{ cargoDamage }}%</span>
            </div>
        </div>
        <div class="strip-divider"></div>
        <div class="strip-group lights">
            <Icon
                name="lucide:lamp"
                size="20"
                class="lamp"
                :class="{ on: lightParking }"
                :title="t('dash.parkingLights')"
            />
            <Icon
                name="lucide:lightbulb"
                size="20"
                class="lamp"
                :class="{ on: lightLow }"
                :title="t('dash.lowBeam')"
            />
            <Icon
                name="lucide:zap"
                size="20"
                class="lamp"
                :class="{ on: lightHigh }"
                :title="t('dash.highBeam')"
            />
            <Icon
                name="lucide:siren"
                size="20"
                class="lamp"
                :class="{ on: lightBeacon }"
                :title="t('dash.beacon')"
            />
            <Icon
                name="lucide:circle-parking"
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
