<template>
    <router-view/>
</template>

<script setup>
    import { onMounted } from 'vue'
    import { useUserStore } from '@/stores/useUserStore'
    import { useThemeStore } from '@/stores/useThemeStore'

    const userStore = useUserStore()
    const themeStore = useThemeStore()

    onMounted(() => {
        userStore.init()
        themeStore.init()
    })
</script>

<style scoped lang="scss">
</style>
