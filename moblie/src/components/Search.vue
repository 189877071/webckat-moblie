<style scoped lang="scss">
    .search-box {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        background-size: 100% 100%;
        &.app {
            .input-box {
                margin-top: .66rem;
            }
            .list-box {
                top: 2.1rem;
            }
        }
    }

    .input-box {
        position: relative;
    }

    .input-box-b {
        position: absolute;
        top: .3rem;
        left: .3rem;
        border-bottom: 1px solid #0abb98;
        width: 7rem;
        height: .75rem;
        padding-left: .6rem;

        input {
            width: 7rem;
            height: .7rem;
            line-height: .7rem;
            border: none;
            font-size: .35rem;
            vertical-align: top;
            padding: 0;
            background: none;
        }
    }

    .search-icon {
        position: absolute;
        font-size: .4rem;
        height: .5rem;
        width: .5rem;
        line-height: .5rem;
        text-align: center;
        left: .3rem;
        top: .38rem;
        i {
            font-size: .4rem;
            color: #999;
        }
    }

    .fanhui {
        position: absolute;
        width: 1.4rem;
        height: .7rem;
        line-height: .7rem;
        font-size: .3rem;
        text-align: center;
        top: .4rem;
        right: .3rem;
        background: #627385;
        color: #fff;
        border-radius: .08rem;
        box-shadow: 0 0 .2rem rgba(0,0,0,.4);
        overflow: hidden;
    }

    .list-box {
        position: absolute;
        bottom: 0rem;
        top: 1.35rem;
        left: 0rem;
        right: 0rem;
        overflow: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 0;
        }
        li {
            position: relative;
            border-bottom: 1px solid #ddd;
            height: 1.6rem;
            background: rgba(255,255,255,.6);
            padding: 0 .3rem;
        }
        img{
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            border: 1px solid #ddd;
            display: block;
            box-sizing: border-box;
            &.off {
                filter: grayscale(100%);
                -webkit-filter: grayscale(100%);
            }
        }
        .head-photo {
            padding: .2rem .3rem .2rem .3rem;
        }
        .somi {
            width: 7.9rem;
            height: 1.6rem;
            padding-right: .3rem;
        }
        .username, .jianjie {
            font-size: .35rem;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow: ellipsis;
        }
        .username {
            padding-top: .2rem;
            color: #3b5877;
            width: 5rem;
            line-height: .6rem;
            height: .6rem;
        }
        .jianjie {
            color: #888;
            width: 7.6rem;
            line-height: .5rem;
            height: .5rem;
        }
    }

    .title {
         font-size: .35rem;
         height: .8rem;
         line-height: .8rem;
         color: #666;
         border-bottom: 1px solid #ddd;
    }
</style>

<template>
    <div class="search-box" :class="{app: app}" :style="{'background-image' : keyboard ? 'none' : `url(${bg.search})`}">
        <div class="input-box">
            <div class="input-box-b">
                <input ref="search" type="search" v-model="search" placeholder="搜索">
            </div>
            <span class="search-icon"><i class="iconfont icon-search"></i></span>
            <span class="fanhui" @click="back">
                <my-fankui num="500" setbg="#1abc9c">取消</my-fankui>
            </span>
        </div>

        <div class="list-box" v-if="search">
            <div class="list">
                <div class="title">联系人</div>
                <!-- 在线 -->
                <ul>
                    <router-link 
                        :to="{name: 'indexChat', params: {id: item.id} }" 
                        tag="li" 
                        class="clearfix"
                        v-for="(item,index) in searchuser.on" 
                        :key="index">
                        <my-fankui  setbg="rgba(0,0,0,.1)">
                            <div class="left head-photo">
                                <img :src="item.headphoto" alt="">
                            </div>
                            <div class="right somi">
                                <div class="username">{{item.name ? item.name : item.username}}</div>
                                <div class="jianjie">[在线] {{item.synopsis ? item.synopsis : '该同事未填写个人介绍'}}</div>
                            </div>
                        </my-fankui>
                    </router-link>
                </ul>

                <!-- 离线 -->
                <ul>
                    <router-link 
                        :to="{name: 'indexChat', params: {id: item.id} }" 
                        tag="li" 
                        class="clearfix"
                        v-for="(item,index) in searchuser.off" 
                        :key="index">
                        <my-fankui  setbg="rgba(0,0,0,.1)">
                            <div class="left head-photo">
                                <img :src="item.headphoto" alt="" class="off">
                            </div>
                            <div class="right somi">
                                <div class="username">{{item.name ? item.name : item.username}}</div>
                                <div class="jianjie">[离线] {{item.synopsis ? item.synopsis : '该同事未填写个人介绍'}}</div>
                            </div>
                        </my-fankui>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {  mapGetters, mapState } from 'vuex'
    import myBg from './public/SlotBg.vue'
    import myFankui from './public/NewFankui.vue'
    export default {
        name: 'search',
        components: { myFankui, myBg },
        methods: {
            back() {
                if(this.keyboard) {
                    this.$refs.search.blur();
                    return;
                }
                this.search = '';
                history.back();
            }
        },
        computed: {
            ...mapGetters(['getSearch']),
            ...mapState(['app', 'bg', 'keyboard']),
            searchuser() {
                return this.getSearch(this.search);
            }
        },
        data() {
            return {
                search: ''
            }
        },
        activated() {
            this.search = '';
        }
    }
</script>
