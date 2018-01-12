<style scoped lang="scss">
    .box {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-size: 100% 100%;
    }

    .user-box {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 0;
        }
        &.user-box-app {
            top: 1.66rem;
        }
    }

    .list-box {
        background: rgba(255,255,255,.5);
        &.border {
            border-top: 1px dashed #ddd;
        }
        &.show {
            .title i {
                transform: rotate(90deg);
            }
            .title {
                border-color: rgba(0,0,0,0);
            }
            .list-ul {
                display: block  ;
            }
        }
    }
    
    .title {
        font-size: .4rem;    
        color: #39597a;
        height: 1.3rem;
        line-height: 1.3rem;
        padding-left: .1rem;
        border-bottom: 1px dashed #ddd;
        position: relative;

        i {
            font-size: .5rem;
            position: relative;
            top: .05rem;
            margin-right: .1rem;
            margin-left: .1rem;
            color: #bbb;
            display: inline-block;
            width: .5rem;
            height: .5rem;
            line-height: .55rem;
        }
    }

    .list-ul {
        display: none;
        li {
            position: relative;
            border-bottom: 1px solid #eae6e6;
            height: 1.6rem;
        }
        img{
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
            border: 1px solid #ddd;
            box-sizing: border-box;
            display: block;
            opacity: 0;
            transition: opacity .2s;
            &.off {
                filter: grayscale(100%);
            }
        }
        .head-photo {
            width: 1.2rem;
            height: 1.2rem;
            padding: .2rem .3rem;
            padding-right: .1rem;
        }
        .somi {
            width: 8rem;
            height: 1.6rem;
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
            width: 7.8rem;
            line-height: .5rem;
            height: .5rem;
        }
    }
</style>

<template>
    <div ref="box" class="box" :style="{'background-image' : `url(${bg.users})`}">
        <my-box title="好友列表">
            <div class="user-box" :class="{'user-box-app': app}">
                <router-link to="/search" tag="div" class="search"><i class="iconfont icon-search"></i> 搜索</router-link>
                <div class="list-box" v-for="(usersItem, usersIndex) in users" :key="usersIndex" :class="{border: usersIndex==0, show: usersItem.show}">
                    <div class="title" @click="userShow(usersIndex)">
                        <my-fankui setbg="rgba(0,0,0,.1)">
                            <i class="iconfont icon-202-copy"></i>{{usersItem.title}}
                        </my-fankui>
                    </div>

                    <ul class="list-ul" v-if="init && usersItem.init" v-show="usersItem.show">
                        <!-- 在线好友 -->
                        <router-link 
                            tag="li"  
                            class="clearfix" 
                            v-for="(uitem, uindex) in usersItem.onLineUser"
                            :to="{name: 'userChat', params: {id: uitem.id} }" 
                            :key="uindex">
                            <my-fankui setbg="rgba(0,0,0,.1)">
                                <div class="left head-photo">
                                    <img @load="show($event)" :src="uitem.headphoto" alt="">
                                </div>
                                <div class="left somi">
                                    <div class="username">{{uitem.name ? uitem.name : uitem.username}}</div>
                                    <div class="jianjie">[在线] {{uitem.synopsis ? uitem.synopsis : '该好友未填写个人介绍'}}</div>
                                </div>
                            </my-fankui>
                        </router-link>
                    </ul>

                    <ul class="list-ul" v-if="init && usersItem.init" v-show="usersItem.show">
                        <!-- 离线好友 -->
                        <router-link 
                            tag="li"  
                            class="clearfix" 
                            v-for="(uitem, uindex) in usersItem.offLineUser"
                            :to="{name: 'userChat', params: {id: uitem.id} }" 
                            :key="uindex">
                            <my-fankui setbg="rgba(0,0,0,.1)">
                                <div class="left head-photo">
                                    <img @load="show($event)" :src="uitem.headphoto" alt=""  class="off">
                                </div>
                                <div class="left somi">
                                    <div class="username">{{uitem.name ? uitem.name : uitem.username}}</div>
                                    <div class="jianjie">[离线] {{uitem.synopsis ? uitem.synopsis : '该好友未填写个人介绍'}}</div>
                                </div>
                            </my-fankui>
                        </router-link>
                    </ul>
                </div>
            </div>
        </my-box>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import myBg from './public/Bg.vue'
    import myFankui from './public/NewFankui.vue'
    import myBox from './public/CommonBox.vue'

    export default {
        name: 'Users',
        components: { myBox, myFankui },
        computed: {
            ...mapState(['users', 'app', 'bg'])
        },
        methods: {
            ...mapMutations(['userShow']),
            show(ev) {
                ev.target.style.opacity = 1;
            }
        },
        data() {
            return {
                init: false
            }
        },
        mounted() {
            this.$refs.box.style.height = window.innerHeight;
            setTimeout(() => {
                this.init = true;
            }, 30);
        }
    }
</script>
