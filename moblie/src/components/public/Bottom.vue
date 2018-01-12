<style scoped lang="scss">
    .bottom {
        height: 1.1rem;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #fff;
        display: flex;
        border-top: 1px solid #ccc;
        box-shadow: 0 0 1rem rgba(0,0,0,.2);
        z-index: 2;
    }
    .bottom li {
        flex: 1;
        text-align: center;
        color: #666;
        position: relative;
        a { 
            height: 1.1rem;
            display: block;
            position: relative;
            color: #777;
            transition: background .3s;
            &.router-link-exact-active {
                background: #627385;
                color: #eee;
                i {
                    color: #eee;
                }
                em {
                    color: #000;
                    background: #fff;
                }
            }
        }
        i {
            position: absolute;
            width: 100%;
            left: 0;
            top: .05rem;
            font-size: .6rem;
            color: #454545;
        }
        span {
            display: block;
            padding-top: .65rem;
            font-size: .3rem;
        }
        em {
            position: absolute;
            font-style: normal;
            font-size: .3rem;
            padding: .05rem .15rem;
            color: #fff;
            background: #627385;
            text-align: center;
            border-radius: .8rem;
            top: 0.01rem;
            left: 1.55rem;
        }
    }
</style>
<template>
    <ul class="bottom" ref="list">
        <li>
            <a href="javascript:;" @touchend="push('/users')" data-name="users"><i class="iconfont icon-lianxiren"></i> <span>用户</span></a>
        </li>
        <li>
            <a href="javascript:;" @touchend="push('/index')" data-name="index">
                <i class="iconfont icon-xiaoxi1"></i> <span>消息</span>
                <em v-if="getUnreadMessage>0">{{getUnreadMessage < 100 ? getUnreadMessage : '99+'}}</em>
            </a>
        </li>
        <li>
            <a href="javascript:;" @touchend="push('/notice')" data-name="notice">
                <i class="iconfont icon-gonggao"></i> <span>公告</span>
                <em v-if="notice.unread.length>0">{{notice.unread.length < 100 ? notice.unread.length : '99+'}}</em>
            </a>
        </li>
        <li>
            <a href="javascript:;" @touchend="push('/set')" data-name="set">
                <i class="iconfont icon-bianji"></i> <span>设置</span>
            </a>
        </li>
    </ul>
</template>
<script>
    import { mapGetters, mapState } from 'vuex'
    import myFankui from './NewFankui.vue'
    export default {
        name: 'bottom',
        components: {myFankui},
        computed: {
            ...mapState(['notice']),
            ...mapGetters(['getUnreadMessage'])
        },
        methods: {
            push(url) {
                this.$router.push(url);
            }
        },
        activated() {
            const aA = this.$refs.list.getElementsByTagName('a');
            for(let i=0; i<aA.length; i++) {
                aA[i].className = this.$route.path.search(aA[i].dataset.name) != -1 ? 'router-link-exact-active' : '';
            }
        }
    }
</script>