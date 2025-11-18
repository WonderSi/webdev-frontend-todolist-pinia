import { ref, reactive, onUnmounted } from "vue"

const ERROR_DISPLAY_DURATION = 3000

export function useErrorHandler() {
    const error = ref('')
    const errors = reactive({
        email: false,
        password: false,
        confirmPassword: false
    })

    let errorTimeout = null

    const clearErrorTimeout = () => {
        if (errorTimeout) {
            clearTimeout(errorTimeout)
            errorTimeout = null
        }
    }

    const setError = (message, field = null) => {
        clearErrorTimeout()

        Object.keys(errors).forEach(key => errors[key] = false)

        error.value = message
        if (field) errors[field] = true

        if (message) {
            errorTimeout = setTimeout(() => {
                error.value = ''
                Object.keys(errors).forEach(key => errors[key] = false)
                errorTimeout = null
            }, ERROR_DISPLAY_DURATION)
        }
    }

    const clearErrors = () => {
        clearErrorTimeout()
        error.value = ''
        Object.keys(errors).forEach(key => errors[key] = false)
    }

    onUnmounted(clearErrorTimeout)

    return { error, errors, setError, clearErrors }
}
