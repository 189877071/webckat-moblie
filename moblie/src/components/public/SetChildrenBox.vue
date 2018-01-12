<style scoped lang="scss">
    .setabc-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        background-color: #fff;
        background-size: 100% 100%;
    }
    .header {
        height: 1.1rem;
        line-height: 1.1rem;
        position: relative;
        color: #000;
        h1 {
            text-align: center;
            font-weight: 500;
            font-size: .45rem;
        }
        span {
            position: absolute;
            font-size: .35rem;
            left: .4rem;
            
            i {
                padding-right: .1rem;
                font-size: .45rem;
                display: inline-block;
                vertical-align: middle;
            }
        }
        span.baocun {
            left: auto;
            right: .4rem;
            width: 1.4rem;
            text-align: center;
            background: #627385;
            height: .7rem;
            line-height: .7rem;
            font-size: .3rem;
            color: #fff;
            top: .2rem;
            border-radius: .08rem;
            box-shadow: 0 0 .2rem rgba(0,0,0,.4);
            overflow: hidden;
        }
        &.app {
            padding-top: .66rem;
            span.baocun {
                top: .86rem;
            }
        }
    }
</style>

<template>
    <div class="translate3d setabc-box" ref="box" :style="{'background-image' : keyboard ? 'none' : `url(${bg.setchild})`}" >
        <div class="header" :class="{app: app}">
            <span @touchend="back"><i class="iconfont icon-fanhui"></i>返回</span>
            <h1>{{title}}</h1>
            <span class="baocun" v-if="submit" @touchend="submit()">
                <my-fankui num="500" setbg="#1abc9c">保 存</my-fankui>
            </span>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import { back } from '../../assets/common'
    import { mapState } from 'vuex'
    import myFankui from './NewFankui.vue'
    export default {
        name: 'modify',
        props: ['submit', 'title'],
        components: { myFankui },
        computed: {
            ...mapState(['app', 'bg', 'keyboard'])
        },
        methods: {
            back() {
                history.back();
            }
        }
    }
</script>
