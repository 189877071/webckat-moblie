<style scoped lang="scss">
    .box {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-size: 100% 100%;
    }
    .set-content {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 0;
        }
    }

    .top {
        font-size: .5rem;
        text-align: center;
        padding-top: 1rem;
    }

    .top-box {
        $w: 3.5rem;
        width: $w;
        position: relative;
        margin: 0 auto;
        img {
            width: $w;
            height: $w;
            border-radius: 50%;
            box-shadow: 0 0 .5rem rgba(0, 0, 0, .6);
            vertical-align: top;
            opacity: 0;
            transition: opacity .3s;
        }
        figcaption {
            line-height: 1.5rem;
            color: #fff;
            text-shadow: 0 0 .2rem rgba(0,0,0,1);
            height: 1.5rem;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow: ellipsis;
        }
        .top-input {
            position: absolute;
            width: $w;
            height: $w;
            left: 0;
            top: 0;
            border-radius: 50%;
            opacity: 0;
        }
    }
    
    .content-app {
        padding-top: .66rem;
    }

    .list { 
        border-top: 1px solid #ddd;
        li {
            font-size: .4rem;
            height: 1.5rem;
            line-height: 1.5rem;
            color: #555;
            position: relative;
            border-bottom: 1px solid #ddd;

            background: rgba(255,255,255,.6);
            i {
                padding-right: .3rem;
                padding-left: .4rem;
                font-size: .4rem;
                font-weight: bold;
            }
        }

        .switch-box {
            position: absolute;
            right: .4rem;
            width: 1.75rem;
            height: .8rem;
            line-height: .8rem;
            top: .3rem;
            border-radius: .8rem;
            overflow: hidden;
            box-shadow: 0 0 .3rem rgba(0, 0, 0, .5);
            &.app-true {
                line-height: .9rem;
            }
            span {
                float: left;
                font-size: .35rem;
                width: 1.08rem;
                text-align: center;
     
                &.radius {
                    width: .56rem;
                    height: .56rem;
                    border-radius: 50%;
                    transform: translateY(.12rem);
                    transition: .2s;
                }
            }

            .switch {
                width: 3rem;
                height: .8rem;
                color: #fff;
                transition: .2s;
            }
            &.off {
                background: #c2cbd3;
                .switch {
                    transform: translateX(-.98rem);
                }
                .radius {
                    background: #8c97a2;
                }
            }
            &.on {
                background: #627385;
                .switch {
                    transform: translateX(0rem);
                }
                .radius {
                    background: #1abc9c;
                }
            }
        }

        .email,
        .pass,
        .age,
        .jianjie {
            position: absolute;
            right: .4rem;
            width: 5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: right;
            font-size: .35rem;
            color: #999;
        }

        .sex {
            height: 1.5rem;
            line-height: 1.5rem;
            position: absolute;
            right: 1rem;
            top: 0;
            font-size: .35rem;
            color: #999;
            .left {
                float: left;
                margin-right: 1rem;
            }
            .right {
                float: right;
            }
            .redis {
                box-shadow: 0 0 .2rem rgba(0, 0, 0, .3);
                transition: .2s;
                display: inline-block;
                width: .22rem;
                height: .22rem;
                border-radius: 50%;
                border: 2px solid #c2c8cd;
                padding: .068rem;
                vertical-align: middle;
                margin-right: .2rem;
                transform: translateY(-.05rem);
                &.active {
                    border: 2px solid #1abc9c;
                    background: #1abc9c;
                    background-clip: content-box;
                }
            }
        }
    }

    .logout {
        height: 1rem;
        text-align: center;
        padding: .5rem;
        padding-bottom: 2rem;
        .btn {
            width: 100%;
            font-size: .4rem;
            height: 1rem;
            line-height: 1rem;
            border: none;
            background: #627385;
            color: #fff;
            position: relative;
            box-shadow: 0 0 0.2rem rgba(0, 0, 0, .5);
        }
    }
</style>

<template>
    <div class="box" :style="{'background-image' : `url(${bg.notice})`}">
        <my-box>
            <div class="set-content" :class="{'content-app': app}">
                <div class="top">
                    <div class="top-box">
                        <input v-if="!app" @change="setPhoto($event)" class="top-input" type="file" accept="image/*">
                        <figure>
                            <img ref="topImg" :src="active.headphoto" @load="imgload" @click="appSetPhoto" alt="">
                            <figcaption>{{active.username}}</figcaption>
                        </figure>
                    </div>
                </div>

                <ul class="list">
                    <!-- 声音 -->
                    <li>
                        <span><i class="iconfont icon-shengyin"></i>声音</span>

                        <div class="switch-box" :class="{off: audio != 1, on: audio==1, 'app-true': app}" @touchend="setAudio">
                            <div class="switch">
                                <span>ON</span>
                                <span class="radius"></span>
                                <span>OFF</span>
                            </div>
                        </div>
                    </li>

                    <!-- 昵称 -->
                    <router-link :to="{name: 'name'}" tag="li">
                        <my-fankui setbg="rgba(93,115,133,.2)">
                            <span>
                                <span>
                                    <i class="iconfont icon-xingming"></i>昵称</span>
                                <span class="email">{{active.name ? active.name: active.username}}</span>
                            </span>
                        </my-fankui>
                    </router-link>

                    <!-- 邮箱 -->
                    <router-link :to="{name: 'email'}" tag="li">
                        <my-fankui setbg="rgba(93,115,133,.2)">
                            <span>
                                <i class="iconfont icon-youxiang"></i>邮箱地址</span>
                            <span class="email">{{active.email}}</span>
                        </my-fankui>
                    </router-link>

                    <!-- 密码-->
                    <router-link :to="{name: 'password'}" tag="li">
                        <my-fankui setbg="rgba(93,115,133,.2)">
                            <span>
                                <i class="iconfont icon-password"></i>密码</span>
                            <span class="pass">*********</span>
                        </my-fankui>
                    </router-link>

                    <!-- 年龄 -->
                    <router-link :to="{name: 'age'}" tag="li">
                        <my-fankui setbg="rgba(93,115,133,.2)">
                            <span>
                                <i class="iconfont icon-nianling"></i>年龄</span>
                            <span class="age">{{active.age}}岁</span>
                        </my-fankui>
                    </router-link>

                    <!-- 性别 -->
                    <li>
                        <span>
                            <i class="iconfont icon-xingbie"></i>性别</span>
                        <div class="sex">
                            <div class="left" @touchend="setSex(1)">
                                <span class="redis" :class="{active: active.sex==1}"></span>男
                            </div>
                            <div class="right" @touchend="setSex(2)">
                                <span class="redis" :class="{active: active.sex==2}"></span>女
                            </div>
                        </div>
                    </li>

                    <!-- 介绍 -->
                    <router-link :to="{name: 'synopsis'}" tag="li">
                        <my-fankui setbg="rgba(93,115,133,.2)">
                            <span>
                                <i class="iconfont icon-jianjie"></i>介绍</span>
                            <span class="jianjie">{{active.synopsis ? active.synopsis : '来点什么，巴拉巴拉一下吧！'}}</span>
                        </my-fankui>
                    </router-link>
                </ul>

                <div class="logout">
                    <div class="btn" @click="exit">
                        <my-fankui setbg="#1abc9c">退 出</my-fankui>
                    </div>
                </div>
            </div>
        </my-box>
        
        <transition name="translate">
            <router-view></router-view>
        </transition>

        <set-head-photo v-if="headphoto" :src="photoSrc"></set-head-photo>

        <my-load v-if="load"></my-load>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import myBg from './public/Bg.vue'
    import myFankui from './public/NewFankui.vue'
    import myLoad from './public/SubmitLoad.vue'
    import myBox from './public/CommonBox.vue'
    import config from '../assets/config'
    import setHeadPhoto from './public/SetHeadPhoto.vue'
    import fn from '../assets/fn'
    const { axios, url } = config;
    const { toast, pack } = fn;
    export default {
        name: 'Set',
        components: { myBox, myBg, myFankui, myLoad, setHeadPhoto },
        computed: {
            ...mapState(['active', 'audio', 'socketInfor', 'app', 'bg', 'headphoto'])
        },
        methods: {
            ...mapMutations(['setAudio', 'setSex', 'showHeadPhoto']),
            exit() {
                this.load = true;

                axios.post(url.exit, { state: 2, socketid: this.socketInfor.socketid }).then(result => {
                    const { success } = result.data;
                    this.load = false;
                    if(!success) {
                        alert('退出失败……');
                        return;
                    }
                    location.reload();
                })
            },
            setPhoto(ev) {
                if(ev.target.files[0]) {
                    let reader = new FileReader();
                    reader.onload = ev => {
                        this.showHeadPhoto(true);
                        this.photoSrc = ev.target.result;
                    }
                    reader.readAsDataURL(ev.target.files[0]);
                }
            },
            appSetPhoto() {
                pack().then(src => {
                    this.showHeadPhoto(true);
                    this.photoSrc = src;
                })
            },
            imgload() {
                this.$refs.topImg.style.opacity = 1;
            }
        },
        data(){
            return {
                load: false,
                photoSrc: ''
            }
        }
    }
</script>