<script setup lang="ts">
onMounted(async () => {
    const { initSettings, settings } = useSettings();
    initSettings();

    const { initDesktopSettings } = useDesktopSettings();
    await initDesktopSettings();

    const { applySetting } = useKeepAwake();
    await applySetting(settings.value.keepAwake);
});
</script>

<template>
    <UApp>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>

<style lang="scss">
@use "~/assets/scss/global/global";
</style>
