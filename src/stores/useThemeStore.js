import { defineStore } from "pinia"
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    const currentTheme = ref('light')

    function init() {
        const savedTheme = localStorage.getItem('todoTheme')
        if (savedTheme) {
            currentTheme.value = savedTheme
            applyTheme(savedTheme)
        } else {
            applyTheme('light')
        }
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('todoTheme', theme)
        currentTheme.value = theme
    }

    function toggleTheme() {
        const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark'
        applyTheme(newTheme)
    }

    function getCurrentTheme() {
        return currentTheme.value
    }

    return {
        currentTheme,
        init,
        toggleTheme,
        getCurrentTheme
    }
}, {
    persist: {
        key: 'todo-theme',
        paths: ['currentTheme']
    }
})
