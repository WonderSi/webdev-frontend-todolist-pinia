<template>
    <div class="theme-toggle">
        <button class="theme-toggle__button" @click="themeStore.toggleTheme">
            <SunThemeIcon v-if="themeStore.getCurrentTheme() === 'dark'" />
            <MoonThemeIcon v-else />
        </button>
    </div>
</template>


<script setup>
    import { onMounted } from 'vue';
    import { useThemeStore } from '@/stores/useThemeStore';
    import SunThemeIcon from './SunThemeIcon.vue';
    import MoonThemeIcon from './MoonThemeIcon.vue';

    const themeStore = useThemeStore();

    onMounted(() => {
        themeStore.init();
    });
</script>

<style scoped lang="scss">
    .theme-toggle {
        position: relative;
        height: fit-content;

        &__button {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            background-color: var(--button);
            color: var(--button-text);
            padding: 8.5px;
            border: 1px solid transparent;
            border-radius: 6px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;

            &:hover {
                background-color: var(--button-focus);
                box-shadow: 0 0 3px 0 var(--button);                
            }
        }
    }

    @include mobile {
        .theme-toggle {
            &__button {
                padding: 6px;
            }
        }
    }
</style>
