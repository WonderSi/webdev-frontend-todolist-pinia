import { difineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
    const tasks = ref([])
    const searchQuery = ref('')
    const currentFilter = ref('all')

    const filteredTasks = computed(() => {
        return tasks.value.filter(taskItem => {
            const matchSearch = searchQuery.value
                ? taskItem.text.toLowerCase().includes(searchQuery.value.toLowerCase())
                : true

            let matcheFilter = false
            switch(currentFilter.value) {
                case 'all':
                    matcheFilter = true
                    break
                case 'complete':
                    matcheFilter = taskItem.completed
                    break
                case 'incomplete':
                    matcheFilter = !taskItem.completed
            }

        return matchSearch && matcheFilter
        })
    })

    const totalTasks = computed(() => { tasks.value.length })
    const completedTasks = computed(() => { tasks.value.filter(t => t.completed).length })
    const incompletedTasks = computed(() => { tasks.value.filter(t => !t.completed).length })

    function addTask(text) {
        const newTask = {
            id: 'task-' + Date.now(),
            text: text,
            completed: false
        }
        tasks.value.push(newTask)
    }

    function toggleTask(taskId) {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) {
            task.completed = !task.completed
        }
    }

    function deleteTask(taskId, newText) {
        const index = tasks.value.findIndex(t => t.id === taskId)
        if (index !== -1) {
            tasks.value.splice(index, 1)
        }
    }

    function editTask(taskId, newText) {
        const task = tasks.value.find(t => t.id === taskId)
        if (task) {
        task.text = newText
        }
    }

    function setSearchQuery(query) {
        searchQuery.value = query
    }

    function setFilter(filter) {
        currentFilter.value = filter
    }

    return {
        tasks,
        searchQuery,
        currentFilter,
        filteredTasks,
        totalTasks,
        completedTasks,
        incompletedTasks,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        setSearchQuery,
        setFilter
    }
}, {
    persist: true
})
