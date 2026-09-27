<script lang="ts" setup>
const props = defineProps<{
    truckSpeed: number;
    speedLimit: number;
}>();

const { kmToUserUnits, speedUnit } = useUnitConversion();
const { settings } = useSettings();

const truckSpeedConverted = computed(() => kmToUserUnits(props.truckSpeed));
const speedLimitConverted = computed(() => kmToUserUnits(props.speedLimit));
const hasLimit = computed(() => props.speedLimit > 0);
const isOver = computed(
    () => hasLimit.value && props.truckSpeed > props.speedLimit + 5,
);
const badgeShape = computed(() =>
    settings.value.selectedGame === "ats" ? "square" : "circle",
);
</script>

<template>
    <div class="speed-widget" :class="{ over: isOver }">
        <div class="speed-circle">
            <span class="speed-value">{{ truckSpeedConverted }}</span>
            <span class="speed-unit">{{ speedUnit }}</span>
        </div>
        <div class="limit-badge" :class="[badgeShape, { 'no-limit': !hasLimit }]">
            <span v-if="hasLimit">{{ speedLimitConverted }}</span>
        </div>
    </div>
</template>

<style
    lang="scss"
    scoped
    src="~/assets/scss/scoped/navigation/speedLimit.scss"
></style>
