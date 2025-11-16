import { defineStore } from "pinia"
import { ref, computed } from 'vue'

export const useUserState = defineStore('user', () => {
    const currentUser = ref(null)
    const users = ref([])

    const isAuthenticated = computed(() => { currentUser.value !== null })

    function loadeUsers() {
        try {
            const stored = localStorage.getItem('todo-users')
            if (stored) {
                users.value = JSON.parse(stored)
            }
        } catch (e) {
            console.error('Error loading users:', e)
        }
    } 

    function saveUsers() {
        try {
            localStorage.setItem('todo-users', JSON.stringify(users.value))
        } catch (e) {
            console.error('Error saving users:', e)
        }
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
        saveUsers()

        currentUser.value = { id: newUser.id, email: newUser.email }
        return true
    }

    function login(email, password) {
        const user = users.value.find(u => u.email === email && u.password === password)

        if (!user) {
            throw new Error('Invalid email or password')
        }

        currentUser.value = { id: user.id, email: user.email }
        return true
    }

    function logout() {
        currentUser.value = null
    }

    function checkAuth() {
        loadeUsers()
    }

    return {
        currentUser,
        users,
        isAuthenticated,
        register,
        login,
        logout,
        checkAuth
    }
}, {
    persist: {
        key: 'todo-current-user',
        pick: ['currentUser']
    }
})
