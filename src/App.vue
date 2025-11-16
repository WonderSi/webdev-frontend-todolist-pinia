<template>
    <div class="app">
        <div class="app__container">
            <Header/>
            <TodoList ref="todoListRef"/> 
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import Header from '@cmp/Header.vue';
    import TodoList from '@cmp/TodoList.vue';

    const todoListRef = ref(null);
</script>

<style scoped lang="scss">
    .app {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100vh;

        &__container {
            width: fit-content;
            height: 100%;
            position: relative;
            box-sizing: border-box;
        }
    }
</style>
