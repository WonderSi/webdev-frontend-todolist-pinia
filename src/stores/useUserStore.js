import { defineStore } from "pinia"
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
    const currentUser = ref(null)
    const users = ref([])
    const initialized = ref(false)

    const isAuthenticated = computed(() => currentUser.value !== null)

    function init() {
        if (initialized.value) return

        if (currentUser.value) {
            const userExists = users.value.find(u => u.id == currentUser.value.id)
            if(!userExists) {
                currentUser.value = null
            }
        }

        initialized.value = true
    }

    function register(email, password) {
        const exists = users.value.find(u => u.email === email)
        if (exists) {
            throw new Error('Email already registered')
        }

        const newUser = {
            id: 'user-' + Date.now(),
            email: email,
            password: password,
            createAt: new Date().toISOString()
        }

        users.value.push(newUser)

        currentUser.value = { id: newUser.id, email: newUser.email }
        return true
    }

    function login(email, password) {
        const user = users.value.find(u => u.email === email)

        if (!user) {
            const error = new Error('User with this email does not exist')
            error.code = 'USER_NOT_FOUND'
            throw error
        }

        if (user.password !== password) {
            const error = new Error('Invalid password')
            error.code = 'INVALID_PASSWORD'
            throw error
        }

        currentUser.value = { id: user.id, email: user.email }
        return true
    }

    function logout() {
        currentUser.value = null
    }

    return {
        currentUser,
        users,
        isAuthenticated,
        initialized,
        init,
        register,
        login,
        logout
    }
}, {
    persist: {
        key: 'todo-current-user',
        paths: ['currentUser', 'users']
    }
})
