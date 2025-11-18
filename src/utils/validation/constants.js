export const ERROR_MESSAGES = {
    //email
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    EMAIL_TOO_LONG: 'Email is too long',
    EMAIL_LOCAL_PART_TOO_LONG: 'Email local part is too long',
    EMAIL_ALREADY_REGISTERED: 'This email is already registered',

    //password
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters long',
    PASSWORD_MAX_LENGTH: 'Password is too long (maximum 128 characters)',
    PASSWORD_NO_UPPERCASE: 'Password must contain at least one uppercase letter',
    PASSWORD_NO_LOWERCASE: 'Password must contain at least one lowercase letter',
    PASSWORD_NO_NUMBER: 'Password must contain at least one number',
    PASSWORD_NO_SPECIAL: 'Password must contain at least one special character',
    PASSWORD_CONFIRM_REQUIRED: 'Please confirm your password',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',

    //general
    FILL_ALL_FIELDS: 'Please fill in all fields',
    LOGIN_FAILED: 'An error occurred during login',
    REGISTRATION_FAILED: 'An error occurred during registration'
}
