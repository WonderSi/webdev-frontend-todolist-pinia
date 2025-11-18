import { ERROR_MESSAGES } from "./constants"

export function validatePasswordStrength(password) {
    if (!password) return ERROR_MESSAGES.PASSWORD_REQUIRED
    if (password.length < 6) return ERROR_MESSAGES.PASSWORD_MIN_LENGTH
    if (password.length > 128) return ERROR_MESSAGES.PASSWORD_MAX_LENGTH

    if (!/[A-Z]/.test(password)) return ERROR_MESSAGES.PASSWORD_NO_UPPERCASE
    if (!/[a-z]/.test(password)) return ERROR_MESSAGES.PASSWORD_NO_LOWERCASE
    if (!/\d/.test(password)) return ERROR_MESSAGES.PASSWORD_NO_NUMBER
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return ERROR_MESSAGES.PASSWORD_NO_SPECIAL
    }

    return ''
}

export function validatePasswordConfirmation(password, confirmPassword) {
    if (!confirmPassword) return ERROR_MESSAGES.PASSWORD_CONFIRM_REQUIRED
    if (password !== confirmPassword) return ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH

    return ''
}

export function validatePasswordLogin(password) {
    return password ? '' : ERROR_MESSAGES.PASSWORD_REQUIRED
}
