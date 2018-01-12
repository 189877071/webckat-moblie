<style scoped lang="scss">
    .bottom {
        background: #fff;
        display: flex;
        border-top: 1px solid #eee;
        box-shadow: 0 0 1rem rgba(0,0,0,.2);
        height: 1.1rem;
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
            color: #627385;
            &.router-link-exact-active {
                color: #1abc9c;
                i {
                    color: #1abc9c;
                }
                em {
                    color: #fff;
                    background: #1abc9c;
                }
            }
        }
        i {
            position: absolute;
            width: 100%;
            left: 0;
            top: .05rem;
            font-size: .6rem;
            color: #627385;
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
            <my-fankui :num="num" :setbg="color">
                <router-link to="/users">
                    <i class="iconfont icon-lianxiren"></i>
                    <span>用户</span>
                </router-link>
            </my-fankui>
        </li>
        <li>
            <my-fankui :num="num" :setbg="color">
                <router-link to="/index">
                    <i class="iconfont icon-xiaoxi1"></i>
                    <span>消息</span>
                    <em v-if="getUnreadMessage>0">{{getUnreadMessage < 100 ? getUnreadMessage : '99+'}}</em>
                </router-link>
            </my-fankui>
        </li>
        <li>
            <my-fankui :num="num" :setbg="color">
                <router-link to="/notice">
                    <i class="iconfont icon-gonggao"></i>
                    <span>公告</span>
                    <em v-if="notice.unread.length>0">{{notice.unread.length < 100 ? notice.unread.length : '99+'}}</em>
                </router-link>
            </my-fankui>
        </li>
        <li>
            <my-fankui :num="num" :setbg="color">
                <router-link to="/set">
                    <i class="iconfont icon-bianji"></i>
                    <span>设置</span>
                </router-link>
            </my-fankui>
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
        data() {
            return {
                color: '#e4e9ee',
                num: 400
            }
        }
    }
</script>