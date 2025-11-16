<template>
    <div class="auth-page">
        <div class="auth-page__overlay"></div>
        <div class="auth-page__card">
            <h1>Login</h1>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      v-model="email"
                      placeholder="your@email.com"
                      autocomplete="email"
                      required
                    />
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="form-group__password-wrapper">
                        <input
                            id="password"
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
                            placeholder="••••••••"
                            autocomplete="current-password"
                            required
                        />
                        <button 
                            type="button" 
                            class="show-password-btn"
                            @click="showPassword = !showPassword"
                            tabindex="-1"
                        >
                            <EyeOpenIcon v-if="showPassword" />
                            <EyeClosedIcon v-else />
                        </button>
                    </div>
                </div>
                
                <span v-if="error" class="error-message">{{ error }}</span>
                
                <button type="submit" class="btn-primary">Login</button>
            </form>
            
            <p class="auth-link">
                Don't have an account? 
                <router-link to="/register">Register here</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/useUserStore'
    import EyeOpenIcon from '@cmp/EyeOpenIcon.vue'
    import EyeClosedIcon from '@cmp/EyeClosedIcon.vue'

    const router = useRouter()
    const userStore = useUserStore()

    const email = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const error = ref('')

    async function handleLogin() {
        error.value = ''
        
        if (!email.value || !password.value) {
            error.value = 'Please fill in all fields'
            return
        }
        
        try {
            userStore.login(email.value, password.value)
            router.push('/')
        } catch (e) {
            error.value = e.message
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

        input {
        &:-webkit-autofill {
            -webkit-background-clip: text;
            -webkit-text-fill-color: var(--text) !important;
            caret-color: var(--text);
        }


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

    .error-message {
        display: block;
        margin-bottom: 15px;
        padding: 10px;
        background: rgba(255, 68, 68, 0.1);
        border: 1px solid #ff4444;
        border-radius: 6px;
        color: #ff4444;
        text-align: center;
        font-size: 14px;
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

    .eye-icon {
        color: var(--text)
    }
</style>
