<template>
    <div class="filters-dropdown" ref="dropdownRef">
        <button 
            class="filters-dropdown__button"
            :class="{ active: isOpen }"
            @click="toggleDropdown"    
        >
            <span class="filter-span">{{ currentFilterText }}</span>
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L1 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 1L4 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="filters-dropdown__menu" :class="{ active: isOpen }">
            <div 
                class="dropdown-item" 
                :class="{ active: todoStore.currentFilter === 'all' }"
                @click="selectFilter('all')"
            >
                All
            </div>
            <div 
                class="dropdown-item" 
                :class="{ active: todoStore.currentFilter === 'complete' }"
                @click="selectFilter('complete')"
            >
                Complete
            </div>
            <div 
                class="dropdown-item" 
                :class="{ active: todoStore.currentFilter === 'incomplete' }"
                @click="selectFilter('incomplete')"
            >
                Incomplete
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted, inject } from 'vue';
    import { useTodoStore } from '@/stores/useTodoStore';

    const todoStore = useTodoStore()
    const isOpen = ref(false);
    const dropdownRef = ref(null);

    const currentFilterText = computed(() => {
        const filterMap = {
            'all': 'ALL',
            'complete': 'COMPLETE',
            'incomplete': 'INCOMPLETE'
        }
        return filterMap[todoStore.currentFilter] || 'ALL';
    })

    function toggleDropdown(e) {
        e.stopPropagation();
        isOpen.value = !isOpen.value;
    }

    function selectFilter(filter) {
        todoStore.setFilter(filter)
        isOpen.value = false
    }

    function handleClickOutside(e) {
        if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
            isOpen.value = false;
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
    });
</script>

<style scoped lang="scss">
    .filters-dropdown {
        position: relative;
        height: fit-content;
        
        &__button {
            position: relative;
            display: flex;
            justify-content: space-between;
            min-width: 150px;
            background-color: var(--button);
            font-family: 'Kanit', 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 18px;
            align-items: center;
            gap: 15px; 
            color: var(--button-text);
            padding: 5px 10px;
            border: 1px solid transparent;
            border-radius: 6px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;

            svg {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            &.active {
                background-color: var(--button-focus);
                box-shadow: 0 0 3px 0 var(--button);
                border: 1px solid var(--button);
                svg {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: rotateX(180deg);
                }
            }

            &:hover {
                background-color: var(--button-focus);
                box-shadow: 0 0 3px 0 var(--button);
            }
        }

        &__menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: auto;
            width: 100%;
            background-color: var(--button-text); 
            border: 1px solid var(--button);
            border-radius: 8px;
            overflow: hidden;
            z-index: 1000;
            &.active {
                display: block;
            }
        }
    }

    .dropdown-item {
        font-size: 16px;
        font-weight: 400;
        color: var(--button);
        padding: 3px 5px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:first-child {
            padding-top: 6px;
        }

        &:last-child {
            padding-bottom: 6px;
        }
        
        &:hover {
            background-color: var(--button-focus-light);
        }

    }

    @include mobile {
        .filters-dropdown {
            &__button {
                font-size: 14px;
            }
        }

        .dropdown-item {
            font-size: 12px;
        }
    }
</style>
