<template>
    <div class="todo-page">
        <Header @logout="handleLogout"/>
        <TodoList />
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/useUserStore'
    import Header from '@cmp/Header.vue'
    import TodoList from '@cmp/TodoList.vue'

    const router = useRouter()
    const userStore = useUserStore()

    function handleLogout() {
        userStore.logout()
        router.push('/login')
    }
</script>

<style lang="scss" scoped>
    .todo-page {
        min-height: 100vh;
        background: var(--background);
        padding: 0 20px;
        max-width: 800px;
        margin: 0 auto;
    }
</style>
