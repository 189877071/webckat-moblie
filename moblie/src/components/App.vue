<style scoped lang="scss">
    $num: 0.28;
    @keyframes init-load-l {
        0% {
            transform: translate3d(0, 0, 0);
        }
        25% {
            transform: translate3d($num + rem, 0, -$num + rem);
        }
        50% {
            transform: translate3d($num * 2 + rem, 0, 0);
        }
        75% {
            transform: translate3d($num + rem, 0, $num + rem);
            z-index: 1;
        }
        100% {
            transform: translate3d(0, 0, 0);
            z-index: 1;
        }
    }
    @keyframes init-load-r {
        0% {
            transform: translate3d(0, 0, 0);
        }
        25% {
            transform: translate3d(-$num + rem, 0, $num + rem);
        }
        50% {
            transform: translate3d(-$num *2 + rem, 0, 0);
        }
        75% {
            transform: translate3d(-$num + rem, 0, -$num + rem);
        }
        100% {
            transform: translate3d(0, 0, 0);
        }
    }

    .app-top-mask {
        height: .66rem;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #45515f;
        z-index: 9999;
    }

    .init-box {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: #fff;
    }

    .init-load {
        position: absolute;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        font-size: .4rem;
        text-align: center; 
        color: #fff;
        text-shadow: 0 0 .02rem rgba(0,0,0,1);  
    }
    
    .init-animate {
        display: inline-block;
        width: .9rem;
        height: .3rem;
        position: relative;
        margin-right: .1rem;
        perspective: 50px;

        i {
            position: absolute;
            width: .3rem;
            height: .3rem;
            top: 0;
            border-radius: 50%;
            box-shadow: 0 0 .2rem rgba(0,0,0,.3);
        }
        i:nth-of-type(1) {
            background: #e74c3c;
            left: 0;
            animation: init-load-l 2s linear infinite;
        }
        i:nth-of-type(2) {
            background: #2c3e50;
            right: 0;
            animation: init-load-r 2s linear infinite;
        }
    }
    
</style>
<template>
    <div id="app">
        <!-- 一级导航全部使用固定定位 开启硬件加速 -->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>

        <my-login v-if="!isLogin"></my-login>

        <div class="init-box" v-if="!init">
            <div class="init-load" ref="initload" v-if="!app"><div class="init-animate"><i></i><i></i></div></div>
        </div>
        
        <transition name="opacity">
            <my-rtc v-if="RTC"></my-rtc>
        </transition>

        <div class="app-top-mask" v-if="app"></div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    
    import myRtc from './public/Rtc.vue'

    import myLogin from './Login.vue'

    let showW = null;
    export default {
        name: 'App',
        components: { myLogin, myRtc },
        computed: {
            ...mapState(['init', 'isLogin', 'app', 'bg', 'RTC'])
        },
        methods: {
            ...mapMutations(['setLogin'])
        },
        watch: {
            init(newval) {
                if(process.env.ACTIVE === 'application') {
                    newval && showW.close();
                }
            }
        },
        beforeCreate() {
            if(process.env.ACTIVE === 'application') {
                showW = plus.nativeUI.showWaiting("正在加载，请等待...",{back:"none"});
            }
        },
        mounted() {
            if(process.env.ACTIVE !== 'application') { 
                const load = this.$refs.initload;
                load.style.top = (window.innerHeight - load.clientHeight) / 2 + 'px';
            }
        }
    }
</script>
