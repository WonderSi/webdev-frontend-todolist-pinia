<template>
    <div class="about-page"> 
        <div class="content">
            <pre>
                                                                                                                                                                    
                                                                                                                                                    
               AAA                                                                                             UUUUUUUU     UUUUUUUU                
              A:::A                                                                                            U::::::U     U::::::U                
             A:::::A                                                                                           U::::::U     U::::::U                
            A:::::::A                                                                                          UU:::::U     U:::::UU                
           A:::::::::A              mmmmmmm    mmmmmmm      ooooooooooo   nnnn  nnnnnnnn       ggggggggg   gggggU:::::U     U:::::U    ssssssssss   
          A:::::A:::::A           mm:::::::m  m:::::::mm  oo:::::::::::oo n:::nn::::::::nn    g:::::::::ggg::::gU:::::D     D:::::U  ss::::::::::s  
         A:::::A A:::::A         m::::::::::mm::::::::::mo:::::::::::::::on::::::::::::::nn  g:::::::::::::::::gU:::::D     D:::::Uss:::::::::::::s 
        A:::::A   A:::::A        m::::::::::::::::::::::mo:::::ooooo:::::onn:::::::::::::::ng::::::ggggg::::::ggU:::::D     D:::::Us::::::ssss:::::s
       A:::::A     A:::::A       m:::::mmm::::::mmm:::::mo::::o     o::::o  n:::::nnnn:::::ng:::::g     g:::::g U:::::D     D:::::U s:::::s  ssssss 
      A:::::AAAAAAAAA:::::A      m::::m   m::::m   m::::mo::::o     o::::o  n::::n    n::::ng:::::g     g:::::g U:::::D     D:::::U   s::::::s      
     A:::::::::::::::::::::A     m::::m   m::::m   m::::mo::::o     o::::o  n::::n    n::::ng:::::g     g:::::g U:::::D     D:::::U      s::::::s   
    A:::::AAAAAAAAAAAAA:::::A    m::::m   m::::m   m::::mo::::o     o::::o  n::::n    n::::ng::::::g    g:::::g U::::::U   U::::::Ussssss   s:::::s 
   A:::::A             A:::::A   m::::m   m::::m   m::::mo:::::ooooo:::::o  n::::n    n::::ng:::::::ggggg:::::g U:::::::UUU:::::::Us:::::ssss::::::s
  A:::::A               A:::::A  m::::m   m::::m   m::::mo:::::::::::::::o  n::::n    n::::n g::::::::::::::::g  UU:::::::::::::UU s::::::::::::::s 
 A:::::A                 A:::::A m::::m   m::::m   m::::m oo:::::::::::oo   n::::n    n::::n  gg::::::::::::::g    UU:::::::::UU    s:::::::::::ss  
AAAAAAA                   AAAAAAAmmmmmm   mmmmmm   mmmmmm   ooooooooooo     nnnnnn    nnnnnn    gggggggg::::::g      UUUUUUUUU       sssssssssss    
                                                                                                        g:::::g                                     
                                                                                            gggggg      g:::::g                                     
                                                                                            g:::::gg   gg:::::g                                     
                                                                                             g::::::ggg:::::::g                                     
                                                                                              gg:::::::::::::g                                      
                                                                                                ggg::::::ggg                                        
                                                                                                   gggggg                                           
            </pre>
            <pre>
::::::::::::::::::::::::::::::
:::::::::-=*%%%%%#*--:::::::::
:::::::+%@@@%%%%%%@@@*::::::::
:::::+@@@#*********#%@@-::::::
:::-#@@@@@@@@@@@#***#@@#::::::
::+@@#-....:--*@@%***%@%-:::::
:=%@=::::::---+#@@#**#@@%#*=-:
:=@@##**++++*###@@#**#@@%#@@@-
::+@@@%%####%%@@@#***#@@%##%@+
:::@@@@@@@@@@@%#*****#@@@%%%@#
::-@@#**************#%@@@%%%@@
::-@@%**************#%@@@%%%@@
::-@@%#************#%%@@@%%%@%
:::#@@%##********##%%%@@@%%@@#
:::+@@%%%%%%%%%%%%%%%%@@@%%@@=
            </pre>
        </div>
        <div class="controls">
            <button></button>
            <button @click="goBack" class="logout-btn">
                <OutIcon/>
            </button>
        </div>
    </div>
</template>

<script setup>
    import OutIcon from '@cmp/OutIcon.vue'
import { useRouter } from 'vue-router';

    const router = useRouter()

    const goBack = () => {
        router.back()
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
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: clamp(10px, 2vw, 20px);
            padding: clamp(10px, 3vw, 20px);
            color: var(--text);

            pre {   
                will-change: transform;
                font-size: clamp(0.3rem, 1.2vmin, 1rem);
                line-height: 1.2;
            }
        }

        .controls {
            position: absolute;
            display: flex;
            gap: 15px;
            padding: 15px;
            
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

    @include desktop {
        .controls {
            top: 0;
            right: 0;
        }
    }

    @include tablet {
        .about-page .content pre {
            font-size: clamp(0.25rem, 1vmin, 0.7rem);
        }

        .controls {
            top: 0;
            right: 0;
        }
    }

    @include mobile {
        .about-page .content pre {
            font-size: clamp(0.2rem, 0.9vmin, 0.5rem);
        }

        .controls {
            bottom: 0;
            right: 0;
        }
    }
</style>
