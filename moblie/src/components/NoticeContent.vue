<style scoped lang="scss">
    .n-box {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        background-size: 100% 100%;
        &.app {
            .header {
                padding-top: .66rem;
            }
        }
    }

    .header {
        font-size: .4rem;
        height: 1rem;
        line-height: 1rem;
     
        a {
            color: #000;
            font-size: .35rem;
            padding-left: .3rem;
        }
        i {
            display: inline-block;
            vertical-align: middle;
            font-size: .45rem;
            width: .55rem;
        }
    }

    .load {
        flex: 1;
        text-align: center;
        font-size: .4rem;
        line-height: 2rem;
    }

    .ctb {
        flex: 1;
        padding: 0rem .2rem;
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 0;
        }
        .title {
            font-size: .5rem;
            line-height: .6rem;
            padding: .3rem .1rem .1rem;
        }
        .time {
            font-size: .3rem;
            line-height: .8rem;
            height: .8rem;
            padding-left: .1rem;
            padding-bottom: .1rem;
            border-bottom: 1px solid #0abb98;
        }
        .ctbtc {
            font-size: .45rem;
            line-height: .7rem;
            color: #15191E;
            padding-top: .5rem;
        }
    }
</style>

<template>
<transition name="translate"  @after-enter="setInit">
    <div class="translate3d n-box" ref="box" :class="{app: app}" :style="{'background-image' : keyboard ? 'none' : `url(${bg.infor})`}" >
        <div class="header">
            <a href="javascript:;" @touchend="back"><i class="iconfont icon-fanhui"></i>返回</a>
        </div>

        <div class="load" v-if="load">正在加载……</div>

        <div ref="ctb" class="ctb" :class="{app: app}" v-if="!load">
            <div class="title">{{content.title}}</div>
            <div class="time">{{content.otime | time}}</div>
            <div class="ctbtc">{{content.content}}</div>
        </div>
    </div>
</transition>
</template>
<script>
    import { mapState } from 'vuex'
    import myBg from './public/SlotBg.vue'
    import config from '../assets/config'
    import fn from '../assets/fn'
    const { buWei } = fn;
    const { url, axios } = config;

    export default {
        name: 'noticeContent',
        components: { myBg },
        computed: {
            ...mapState(['app', 'bg', 'keyboard'])
        },
        methods: {
            back() {
                history.back();
            },
            setInit() {
                this.init = true;
                axios.post(url.notice, { id: this.$route.params.id }).then(result => {
                    const { success, data } = result.data;
                    if(!success) return;
                    this.content = data;
                    this.load = false;
                });
            }
        },
        mounted() {
            setTimeout(() => {
                if(this.init) return;
                this.setInit();
            }, 1000);
        },
        data() {
            return {
                content: {title: '',otime: '',content: ''},
                load: true,
                init: false
            }
        },
        filters: {
            time(value) {
                const Time = new Date(value);
                return `${Time.getFullYear()}-${buWei(Time.getMonth()+1)}-${buWei(Time.getDate())}`
            }
        }
    }
</script>
