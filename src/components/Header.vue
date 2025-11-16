<template>
    <header class="header">
        <h1 class="header__name">TODO LIST</h1>
        <div class="header__nav">
            <SearchBar/>
            <div class="nav__controls">
                <FiltersDropdown/>
                <ThemeToggle/>
                <button @click="$emit('logout')" class="logout-btn">
                    <OutIcon/>
                </button>
            </div>            
        </div>
    </header>
</template>

<script setup>
    import SearchBar from '@cmp/SearchBar.vue'
    import FiltersDropdown from '@cmp/FiltersDropdown.vue'
    import ThemeToggle from '@cmp/ThemeToggle.vue'
    import OutIcon from '@cmp/OutIcon.vue';
</script>

<style scoped lang="scss">
    .header {
        display: flex;
        flex-direction: column;

        &__name {
            margin-top: 40px;
            text-align: center;
            font-weight: 500;
        }

        &__nav {
            display: flex;
            flex-direction: row;
            gap: 15px;
            margin-top: 10px;
            &__controls {
                gap: 15px;
            }
        }
    }

    .nav {
        &__controls {
            display: flex;
            gap: 15px;
        }
    }

    .logout-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--button);
        color: var(--button-text);
        padding: 8px 9px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }

     .logout-btn:hover {
        background: var(--button-focus);
    }

    @include tablet {
        .header {
            &__name {
                margin-top: 20px;
            }

            &__nav {
                margin-top: 10px;
                gap: 10px;
            }
        }
    }

    @include mobile {
        .header {
            &__name {
                margin-top: 10px;
            }

            &__nav {
                margin-top: 15px;
                flex-direction: column;
                gap: 8px;
            }
        }

        .nav {
            &__controls {
                gap: 8px;
                
                button {
                    padding: 6px;
                }
            }
        }
    }
</style>
