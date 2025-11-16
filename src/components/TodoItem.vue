<template>
    <li class="task-item " :class="{ 'task-item--completed': task.completed, 'task-item--removing': isRemoving }">
        <input  
            type="checkbox" 
            class="task-item__checkbox" 
            :id="task.id" 
            v-model="task.completed"
            @change="$emit('toggle','task.id')"
        />
        <div class="task-item__content">
            <span 
                v-if="!isEditing"
                :for="task.id" 
                class="task-item__span"
            >
                {{ task.text }}
            </span>
            <input 
                v-else
                type="text"
                class="task-item__edit-input"
                v-model="editText"
                ref="editInput"
                @blur="saveEdit"
                @keydown.enter="saveEdit"
                @keydown.esc="cancelEdit"
            />
        </div>
        <div class="task-item__actions">
        <button 
            class="task-item__action task-item__action--edit" 
            aria-label="Edit"
            @click="startEdit"
        >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.67272 5.99106L2 12.6637V16H5.33636L12.0091 9.32736M8.67272 5.99106L11.0654 3.59837L11.0669 3.59695C11.3962 3.26759 11.5612 3.10261 11.7514 3.04082C11.9189 2.98639 12.0993 2.98639 12.2669 3.04082C12.4569 3.10257 12.6217 3.26735 12.9506 3.59625L14.4018 5.04738C14.7321 5.37769 14.8973 5.54292 14.9592 5.73337C15.0136 5.90088 15.0136 6.08133 14.9592 6.24885C14.8974 6.43916 14.7324 6.60414 14.4025 6.93398L14.4018 6.93468L12.0091 9.32736M8.67272 5.99106L12.0091 9.32736" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <button 
            class="task-item__action task-item__action--delete" 
            aria-label="Delete"
            @click="deleteTask"
        >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.87414 7.61505C3.80712 6.74386 4.49595 6 5.36971 6H12.63C13.5039 6 14.1927 6.74385 14.1257 7.61505L13.6064 14.365C13.5463 15.1465 12.8946 15.75 12.1108 15.75H5.88894C5.10514 15.75 4.45348 15.1465 4.39336 14.365L3.87414 7.61505Z" stroke="currentColor"/>
            <path d="M14.625 3.75H3.375" stroke="currentColor" stroke-linecap="round"/>
            <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="currentColor"/>
            <path d="M10.5 9V12.75" stroke="currentColor" stroke-linecap="round"/>
            <path d="M7.5 9V12.75" stroke="currentColor" stroke-linecap="round"/>
            </svg>
        </button>
        </div>
    </li>
</template>

<script setup>
    import { ref, nextTick } from 'vue';

    const props = defineProps({
        task: {
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['toggle', 'delete', 'edit']);

    const isEditing = ref(false);
    const isRemoving = ref(false);
    const editText = ref('');
    const editInput = ref(null);

    function startEdit() {
        if (props.task.completed) {
            alert('The change is not available!');
            return;
        }
        
        isEditing.value = true;
        editText.value = props.task.text;
        
        nextTick(() => {
            if (editInput.value) {
                editInput.value.focus();
                const length = editText.value.length;
                editInput.value.setSelectionRange(length, length);
            }
        });
    }

    function saveEdit() {
        const newText = editText.value.trim();
        if (newText) {
            emit('edit', { id: props.task.id, newText });
        }
        isEditing.value = false;
    }

    function cancelEdit() {
        editText.value = props.task.text;
        isEditing.value = false;
    }

    function deleteTask() {
        isRemoving.value = true;
        setTimeout(() => {
            emit('delete', props.task.id);
        }, 300);
    }
</script>

<style scoped lang="scss">
    .task-item {
        display: flex;
        align-items: center;
        padding-block: 17px;
        padding-inline: 3px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        gap: 17px;
        
        &__checkbox {
            width: 26px;
            height: 26px;
            border-radius: 4px;
            cursor: pointer;
            flex-shrink: 0;
            &:checked {
                accent-color: var(--button);
                &:hover {
                    accent-color: var(--button-focus);
                }   
            }
            &:focus {
                box-shadow: none;
            }
        }

        &__content {
            flex: 1;
            min-width: 0;
            display: block;
            position: relative;
            height: 36px;
        }

        &__span,
        &__edit-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 8px 12px;
            margin: 0;
            font-family: 'Kanit', 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 20px;
            box-sizing: border-box;
            border-radius: 6px;
            border: 0.5px solid transparent;
            background-color: transparent;
            color: var(--text);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
            padding-top: calc((36px - 20px) / 2);
            padding-bottom: calc((36px - 20px) / 2);
        }

        &__span {
            cursor: default;
        }

        &__edit-input {
            background-color: var(--bg);
            padding-left: 12px;
            padding-right: 12px;
            
            &:focus {
                outline: none;
                box-shadow: 0 0 0 3px var(--input-shadow);
                border-color: var(--input-shadow);
            }
        }
    
        &__actions {
            display: flex;
            gap: 10px;
            flex-shrink: 0;
        }
    
        &__action {
            background: none;
            border: none;
            color: var(--icon-gray-color);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            
            svg {
                width: 18px;
                height: 18px;
            }
            
            &--edit {
                &:hover {
                    color: var(--icon-purple);
                }
            }
            &--delete {
                &:hover {
                    color: var(--icon-red);
                }
            }
        }
        
        &--completed {
            .task-item__span {
                color: var(--text-crossed);
                text-decoration: line-through;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
            }
        }
        
        &--removing {
            transform: translateX(100%);
            opacity: 0;
            max-height: 0;
            padding: 0;
            margin: 0;
        }
    
        button {
            opacity: 0;
        }
    
        &:hover {
            button {
                opacity: 1;
            }
        }

        @include tablet {
            &__span,
            &__edit-input {
                max-width: 375px;
                padding: 6px 10px;
                min-height: 34px;
            }
        }

        @include mobile {
            &__span,
            &__edit-input {
                max-width: 200px;
                font-size: 14px;
                padding: 5px 8px;
                min-height: 32px;
            }
        }
    }
</style>
