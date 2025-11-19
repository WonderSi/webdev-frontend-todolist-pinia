<template>
    <div class="about-page"> 
        <div class="content">
            <div class="quote-section" @click="quotesStore.nextQuote()">
                <p class="quote">"{{ currentQuote }}"</p>
                <p class="author">(C) Jason Statham</p>
                <p class="click">Click on me</p>
            </div>
            <img :src="getImageUrl(currentImage)" alt="Jason Statham">
        </div>
        <div class="controls">
            <button @click="goBack" class="logout-btn">
                <OutIcon/>
            </button>
        </div>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import OutIcon from '@cmp/OutIcon.vue'
    import { useQuotesStore } from '@/stores/useQuotesStore'
    import { storeToRefs } from 'pinia'

    const router = useRouter()
    const quotesStore = useQuotesStore()
    const { currentQuote, currentImage } = storeToRefs(quotesStore) 

    const goBack = () => {
        router.back()
    }

    const getImageUrl = (imageName) => {
        return new URL(`/src/assets/img/${imageName}`, import.meta.url).href
    }
</script>

<style lang="scss" scoped>
    .about-page {
        width: 100vw;
        height: 100vh; 
        display: flex;
        align-items: flex-start;
        justify-content: center;

        .content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: var(--text);

            .quote-section {
                flex: 0 0 500px;
                max-width: 500px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 20px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                gap: 20px;

                &:hover {
                    .click {
                        opacity: 0;
                    }
                }
                
                .quote {
                    font-family: 'Kanit', 'Roboto', sans-serif;
                    font-weight: 400;
                    font-size: 24px;
                    line-height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    word-wrap: break-word;

                }
                .author {
                    opacity: 0.8;
                }

                .click {
                    opacity: 0.2;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
            }

            img {
                max-width: 50%;
                max-height: 50%;
                width: auto;
                height: auto;
                object-fit: contain;
            }
        }

        .controls {
            position: absolute;
            display: flex;
            gap: 15px;
            padding: 15px;
            top: 0;
            right: 0;
            
            button {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--button);
                color: var(--button-text);
                padding: 8px;
                border: none;
                border-radius: 6px;
                cursor: pointer;

                &:hover {
                    background: var(--button-focus);
                }
            }
            
            .logout-btn {
                padding: 8px 9px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
            }
        }
    }

    @include tablet {
        .content {
            flex-direction: column-reverse;
        }
    }

    @include mobile  {
        .content {
            flex-direction: column-reverse;
        }
    }
</style>
