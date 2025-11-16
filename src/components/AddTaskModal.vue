<template>
    <Teleport to="body">
        <div 
            v-if="props.open"
            class="modal" 
            id="addTaskModal"
            @keydown.esc="handleCancel"
        >
            <div class="modal__overlay" @click="handleCancel"></div>
            <div class="modal__content"> 
                <h2 class="modal__title">NEW NOTE</h2>
                <input 
                    type="text" 
                    class="modal__input" 
                    placeholder="Input your note..." 
                    v-model="newTaskText"
                    ref="taskInput"
                    @keydown.enter="applyTask"
                >
                <div class="modal__buttons">
                    <button class="modal__button modal__button--cancel" @click="handleCancel">
                        CANCEL
                    </button>
                    <button class="modal__button modal__button--apply" @click="applyTask">
                        APPLY
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
    import { ref, watch, nextTick } from 'vue';

    const props = defineProps({
        open: Boolean
    });

    const emit = defineEmits(['close', 'add-task']);

    const newTaskText = ref('');
    const taskInput = ref(null);

    watch(() => props.open, (isOpen) => {
        if (isOpen) {
            newTaskText.value = '';
            nextTick(() => {
                taskInput.value?.focus();
            });
        }
    });

    function applyTask() {
        const text = newTaskText.value.trim();
        
        if (text === '') {
            alert('Please enter a task');
            return;
        }
        
        emit('add-task', text);
        newTaskText.value = '';
        emit('close');
    }

    function handleCancel() {
        newTaskText.value = '';
        emit('close');
    }
</script>

<style scoped lang="scss">
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;

        &__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            cursor: pointer;
        }

        &__content {
            position: relative;
            width: fit-content;
            border-radius: 16px;
            padding: 18px 30px;
            margin: 10% auto;
            background-color: var(--bg);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        &__title {
            font-size: 24px;
            font-weight: 500;
            text-align: center;
            color: var(--text);
        }

        &__input {
            width: 440px;
            margin-top: 25px;
            padding: 6px 16px;
            font-family: 'Kanit', 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 16px;
            border-radius: 6px;
            border-width: 1px;
            border-style: solid;
            border-color: var(--input);
            background-color: var(--bg);
            color: var(--text);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            
            &::placeholder { 
                color: var(--input-text);
            }
            
            &:focus {
                outline: none;
                box-shadow: 0 0 0 3px var(--input-shadow);
            }
        }

        &__buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 128px;
            gap: 50px;
        }

        &__button {
            font-family: 'Kanit', sans-serif;
            font-size: 18px;
            font-weight: 500;
            background-color: var(--bg);
            padding: 8px 22px;
            border-radius: 6px;
            border: 2px solid transparent;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;

            &--cancel {
                color: var(--button);
                border-color: var(--button);

                &:hover {
                    background-color: var(--button-focus-light);
                    box-shadow: 0 0 3px 0 var(--button);
                }
            }

            &--apply {
                background-color: var(--button);
                color: var(--button-text);

                &:hover {
                    background-color: var(--button-focus);
                    box-shadow: 0 0 3px 0 var(--button);
                }
            }
        }
    }

    @include tablet {
        .modal {
            &__content {
                margin: 4% auto;
            }
        }
    }

    @include mobile {
        .modal {
            &__content {
                margin: 4% auto;
                padding: 15px 20px;
            }

            &__title {
                font-size: 20px;
            }

            &__input {
                width: 100%;
                margin-top: 15px;
                font-size: 12px;
            }

            &__buttons {
                margin-top: 64px;
            }

            &__button {
                font-size: 14px;
                padding: 8px 22px;
            }
        }
    }
</style>
