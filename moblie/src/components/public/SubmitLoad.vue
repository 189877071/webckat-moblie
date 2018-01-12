<style scoped lang="scss">
    $num: 0.28;
    @keyframes user-load-l {
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
    @keyframes user-load-r {
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
    .user-load {
        position: absolute;
        text-align: center;
        font-size: .4rem;
        color: #000;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, .8);
        z-index: 999;

        .load-animate {
            display: inline-block;
            position: relative;
            width: .7rem;
            height: .25rem;
            perspective: 100px;
        }

        i {
            position: absolute;
            width: .25rem;
            height: .25rem;
            border-radius: 50%;
            top: 0;
            box-shadow: 0 0 .2rem rgba(0,0,0,.3);
        }

        i:nth-of-type(1) {
            left: 0;
            background: #e74c3c;
            animation: user-load-l 2s linear infinite;
        }
        
        i:nth-of-type(2) {
            right: 0;
            background: #2c3e50;
            animation: user-load-r 2s linear infinite;
        }
    }
</style>


<template>
    <div class="user-load" v-if="!app">
        <div :style="{transform: 'translateY('+ Y +'px)'}" ref="animate">
            <div class="load-animate"><i></i><i></i></div>
            {{title ? title: '正在发送请求…'}}
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'SubmitLoad',
        props: ['title'],
        computed: {
            ...mapState(['app'])
        },
        data() {
            return {
                Y: (window.innerHeight - 50) / 2,
                showW: null
            }
        },
        mounted() {
            if(this.app) {
                this.showW = plus.nativeUI.showWaiting("正在提交请求，请等待...",{back:"none"});
            }
        },
        beforeDestroy() {
            if(this.app) {
                this.showW.close();
            }
        }
    }
</script>

