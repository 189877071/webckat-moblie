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

    .list {
        background: rgba(255,255,255,.5);
    
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
            display: block;
            box-sizing: border-box;
            opacity: 0;
            transition: opacity .2s;
            &.off {
                filter: grayscale(100%);
                -webkit-filter: grayscale(100%);
            }
        }
        .head-photo {
            padding: .2rem .3rem;
            padding-right: .1rem;
        }
        .somi {
            width: 8.2rem;
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
            width: 6.8rem;
            line-height: .5rem;
            height: .5rem;
            img {
                width: .5rem;
                height: .5rem;
            }
        }
        .read-time {
            position: absolute;
            font-size: .3rem;
            color: #627385;
            right: .3rem;
            top: .2rem;
        }
        .unread {
            position: absolute;
            padding: 0rem .17rem;
            border-radius: .5rem;
            height: .5rem;
            line-height: .5rem;
            background: #627385;
            font-size: .3rem;
            color: #fff;
            right: .3rem;
            top: .8rem;
        }
        .rm-box {
            position: absolute;
            font-size: .3rem;
            z-index: 1;
            background: rgba(0, 0, 0, .3);
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            text-align: center;
            display: none;
            button {
                background: #4C5867;
                border: none;
                color: #fff;
                height: .6rem;
                width: 1.2rem;
                position: relative;
                top: .48rem;
                border-radius: .1rem;
            }
        }
    }
</style>

<template>
    <div class="box" :style="{'background-image' : `url(${bg.index})`}">
        <my-box title="聊天记录">
            <div class="user-box" :class="{app: app}"  @touchstart="rmHide">
                <router-link to="/search" tag="div" class="search"><i class="iconfont icon-search"></i> 搜索</router-link>
                <ul class="list">
                    <router-link tag="li" :to="{name: 'indexChat', params: {id: item.id} }" v-for="(item, index) in toMessage" :key="index">
                        <my-fankui setbg="rgba(0,0,0,.1)">
                            <div class="left head-photo">
                                <img @load="show($event)" :class="{off: !item.login}" :src="item.headphoto" alt=" ">
                            </div>
                            <div class="left somi" @touchstart="showRm($event)" @touchend="cancelRm">
                                <div class="username">{{item.name}}</div>
                                <div class="jianjie">[{{item.login ? '在线' : '离线'}}] <span v-html="item.otype == 'message' ? item.content : item.otype"></span></div>
                            </div>
                            <div class="read-time">{{item.time | time}}</div>
                            <div class="unread" v-if="item.unMLen">{{item.unMLen < 100 ? item.unMLen : '99+'}}</div>
                        </my-fankui>
                        <div class="rm-box">
                            <button @touchstart.stop.prevent="fn" @touchend="rm(item.id)">删除</button>
                        </div>
                    </router-link>
                </ul>
            </div>
        </my-box>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import myBox from './public/CommonBox.vue'
    import myFankui from './public/NewFankui.vue'
    import fn from '../assets/fn'
    const { buWei, getDay } = fn;

    export default {
        name: 'Index',
        components: { myBox, myFankui },
        computed: {
            ...mapState(['message', 'app', 'bg']),
            ...mapGetters(['getUser']),
            toMessage() {

                const getMessageTime = data => data.unread.length ? {id: data.id, unMLen: data.unread.length,...data.unread[data.unread.length - 1]} :  ( data.read.length ? {id: data.id, ...data.read[data.read.length - 1]} : false)
                
                let message = [];

                this.message.forEach(item => {
                    const data = getMessageTime(item);
                    data && message.push(data);
                });

                const len = message.length;

                for(let i=0; i<len; i++) {
                    for(let j=i+1; j<len; j++) {
                        if(message[i].time < message[j].time) {
                            const data = message[i];
                            message[i] = message[j];
                            message[j] = data;
                        }
                    }
                }
    
                for(let i=0; i<len; i++) { 
                    const user = this.getUser(message[i].id);
                    message[i].headphoto = user.headphoto;
                    message[i].login = user.login;
                    message[i].name = user.name ? user.name : user.username;
                }
                
                return message;
            }
        },
        filters: {
            time(value) {
                const [aTime, vTime] = [new Date(), new Date(value)];
                
                const [aFullYear, aMonth, aDate, aDay, aHours, aMinutes, vFullYear, vMonth, vDate, vDay, vHours, vMinutes] = [
                    aTime.getFullYear(),
                    aTime.getMonth() + 1,
                    aTime.getDate(),
                    aTime.getDay(),
                    aTime.getHours(),
                    aTime.getMinutes(),
                    vTime.getFullYear(),
                    vTime.getMonth() + 1,
                    vTime.getDate(),
                    vTime.getDay(),
                    vTime.getHours(),
                    vTime.getMinutes()
                ];
                // 今天
                if(aDate === vDate) {
                    return `${buWei(vHours)}:${buWei(vMinutes)}`;
                }
                // 昨天
                if(aDate - vDate < 2) {
                    return '昨天';
                }
                // 5天以内
                if(aDate - vDate < 5) {
                    return getDay(vDay);
                }
                // 一年以上
                if(aFullYear != vFullYear) {
                    return `${vFullYear}-${buWei(vMonth)}-${buWei(vdate)}`;
                }
                // 其他的用月表示
                return `${buWei(vMonth)}-${buWei(vDate)}`;
            }
        },
        methods: {
            ...mapMutations(['rmUserMessage']),
            showRm(e) {
                this.rmTime = setTimeout(() => {
                    e.preventDefault();
                  
                    for(let i=0; i<e.path.length; i++) {
                        if(e.path[i].tagName === 'LI') {
                            e.path[i].querySelector('.rm-box').style.display = 'block';
                            break;
                        }
                    }
                    
                }, 500);
            },
            cancelRm() {
                clearTimeout(this.rmTime);
            },
            rmHide() {
                const aRmBox = document.querySelectorAll('.rm-box');
                for(let i=0; i<aRmBox.length; i++) {
                    aRmBox[i].style.display = 'none';
                }
            },
            rm(id) {
                this.rmUserMessage(id);
                this.rmHide();
            },
            fn(){},
            show(ev) {
                ev.target.style.opacity = 1;
            }
        },
        data() {
            return {
                rmTime: null
            }
        }
    }
</script>