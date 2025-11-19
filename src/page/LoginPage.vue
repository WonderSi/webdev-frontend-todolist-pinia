<template>
    <div class="auth-page">
        <div class="auth-page__overlay"></div>
        <div class="auth-page__content">
            <div class="auth-page__card">
                <h1>Login</h1>

                <form @submit.prevent="handleLogin">
                    <div class="form-group">
                        <label>Email</label>
                        <input
                            id="email"
                            v-model="email"
                            placeholder="your@email.com"
                            autocomplete="email"
                            :disabled="isLoading"
                            :class="{ 'input-error': errors.email }"
                        />
                    </div>
                    
                    <div class="form-group">
                        <label>Password</label>
                        <div class="form-group__password-wrapper">
                            <input
                                id="password"
                                :type="showPassword ? 'text' : 'password'"
                                v-model="password"
                                placeholder="••••••••"
                                autocomplete="current-password"
                                :disabled="isLoading"
                                :class="{ 'input-error': errors.password }"
                            />
                            <button 
                                type="button" 
                                class="show-password-btn"
                                @click="showPassword = !showPassword"
                                :disabled="isLoading"
                                tabindex="-1"
                            >
                                <EyeOpenIcon v-if="showPassword" />
                                <EyeClosedIcon v-else />
                            </button>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn-primary" :disabled="isLoading">
                        <span>{{ isLoading ? 'Logging in...' : 'Login' }}</span>
                    </button>
                </form>
                
                <p class="auth-link">
                    Don't have an account? 
                    <router-link to="/register">Register here</router-link>
                </p>
            </div>

            <div class="error">
                <Transition name="fade">
                    <div v-if="error" class="error__message">
                        {{ error }}
                    </div>
                </Transition>
            </div>

            <p class="about-link">  
                <router-link to="/about">About</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/useUserStore'
    import { validateLoginForm, handleLoginError } from '@/utils/validation/login'
    import { useErrorHandler } from '@/utils/useErrorHandler'
    import EyeOpenIcon from '@cmp/EyeOpenIcon.vue'
    import EyeClosedIcon from '@cmp/EyeClosedIcon.vue'

    const router = useRouter()
    const userStore = useUserStore()

    const email = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const isLoading = ref(false)

    const { error, errors, setError, clearErrors } = useErrorHandler()

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    async function handleLogin() {
        clearErrors()

        const validation = validateLoginForm(
            email.value, 
            password.value
        )

        if (!validation.isValid) {
            setError(validation.error, validation.field)
            return
        }
                
        isLoading.value = true
        
        try {
            await userStore.login(email.value, password.value)
            await delay(800)
            await router.push('/')
        } catch (e) {
            const errorInfo = handleLoginError(e)
            setError(errorInfo.message, errorInfo.field)
        } finally {
            isLoading.value = false
        }
    }
</script>

<style scoped lang="scss">
    .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;

        &__overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: -1000;
        }

        &__content {
            display: flex;
            flex-direction: column;
        }

        &__card{
            background: var(--bg);
            padding: 40px;
            border-radius: 12px;
            width: 100%;
            max-width: 400px;
            
            h1 {
                margin-bottom: 30px;
                text-align: center;
                color: var(--text);
            }
        }
    }

    .form-group {
        margin-bottom: 20px;
        
        label {
            display: block;
            margin-bottom: 8px;
            color: var(--text);
            font-weight: 500;
        }

        &__password-wrapper {
            position: relative;
            
            input {
                padding-right: 45px;
            }
            
            .show-password-btn {
                position: absolute;
                right: 10px;
                top: 55%;
                transform: translateY(-50%);
                background: none;
                border: none;
                cursor: pointer;
                font-size: 18px;
                padding: 5px;
                
                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }

    .input-error {
        border-color: var(--error-red) !important;
        background-color: var(--error-bg) !important;
    }   

    .error {
        display: flex;
        justify-content: center;
        min-height: 43px;
        margin-top: 15px;
        margin-inline: 30px;

        &__message {
            width: fit-content;
            padding: 10px;
            background: var(--error-bg);
            border: 1px solid var(--error-red);
            border-radius: 6px;
            color: var(--error-red);
            text-align: center;
            font-size: 14px;
        }
    }

    .btn-primary {
        width: 100%;
        padding: 12px;
        background: var(--button);
        color: var(--button-text);
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        
        &:hover {
            background: var(--button-focus);
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }

    .auth-link {
        margin-top: 20px;
        text-align: center;
        color: var(--text);
        font-size: 14px;
        
        a {
            color: var(--button);
            text-decoration: none;
            font-weight: 500;
            
            &:hover {
                text-decoration: underline;
            }
        }
    }

    .about-link {
        position: absolute;
        bottom: 1em;
        left: 1em;

        a {
            color: var(--button);
            text-decoration: none;
            font-weight: 500;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .eye-icon {
        color: var(--text)
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
