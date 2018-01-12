<style scoped lang="scss">
    $num: 0.4;
    @keyframes load-l {
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
    @keyframes load-r {
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
    .mask-box {
        position: fixed;
        z-index: 99;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.9);
    }
    .loadt {
        width: 1.2rem;
        margin: 0 auto;
        perspective: 50px;
        height: 0.4rem;
        position: relative;
    }
    .loadt div {
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        background: #f00;
        border-radius: 50%;
        box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.7);
    }
    .loadt div:nth-of-type(1) {
        left: 0;
        background: #e74c3c;
        animation: load-l 2s linear infinite;
    }
    .loadt div:nth-of-type(2) {
        right: 0;
        background: #2c3e50;
        animation: load-r 2s linear infinite;
    }
</style>

<template>
    <transition name="opacity">
        <div class="mask-box" v-if="!app">
            <div class="loadt" ref="load">
                <div></div>
                <div></div>
            </div>
        </div>
    </transition>
</template>

<script>
    import { mapState } from 'vuex'
    let showW = null;
    export default {
        name: 'Mask',
        computed: {
            ...mapState(['app'])
        },
        mounted() {
            if(process.env.ACTIVE !== 'application') {
                const load = this.$refs.load;
                load.style.marginTop = (window.innerHeight - parseFloat(getComputedStyle(load).height)) / 2 + "px";
            }
            else {
                showW = plus.nativeUI.showWaiting("正在提交请求，请等待...",{back:"none"});
            }
        },
        beforeDestroy() {
            if(process.env.ACTIVE === 'application') {
                showW.close();
            }
        }
    }
</script>
