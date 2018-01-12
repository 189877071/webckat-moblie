<style scoped lang="scss">
    .box {
        position: fixed;
        transform: translateZ(0);
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }

    .login-box {
        width: 3rem;
        height: 3rem;
        margin: 0 auto;
        padding: 0.25rem;
        border-radius: 50%;
        border: 0.1rem solid #fff;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.7);
        background: rgba(0, 0, 0, 0.3);
        transition: opacity .1s;
        img {
            width: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0.4rem rgba(255, 255, 255, 1);
        }
    }

    h1.title {
        height: 1.3rem;
        font: 0.6rem/1.3rem "Avenir";
        text-align: center;
        color: #fff;
        text-shadow: 0 0 0.5rem rgba(0, 0, 0, 1);
    }

    .input-box {
        width: 8.5rem;
        margin: 0 auto;
        .input-list {
            padding-bottom: 0.2rem;
            position: relative;
        }

        .p4 {
            padding-top: 0.6rem;
        }

        input {
            font-size: 0.4rem;
            width: 100%;
            transition: 0.2s;
            height: 1rem;
            border: none;
            border-bottom: 1px solid #627385;
            text-indent: 0.2rem;
            background: none;
            -webkit-appearance: none;
        }

        .btn {
            width: 100%;
            font-size: 0.4rem;
            height: 1rem;
            line-height: 1rem;
            border: none;
            background: #627385;
            color: #fff;
            position: relative;
            text-align: center;
            box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.5);
        }

        em {
            position: absolute;
            font-size: 0.35rem;
            font-style: normal;
            color: #cc011e;
            right: 0.3rem;
            top: 0.52rem;
        }
    }

    .fu-ben {
        position: relative;
        height: 1rem;
        line-height: 1rem;
        width: 8rem;
        margin: 0 auto;

        input {
            padding: 0;
            margin: 0;
            position: absolute;
            left: 0;
            top: 0.22rem;
            background: #f00;
            &.browser {
                top: 0.35rem;
            }
        }

        label {
            font-size: 0.4rem;
            padding-left: 0.5rem;
            display: inline-block;
            vertical-align: top;
            color: #34495e;
        }

        span.right {
            font-size: 0.4rem;
            line-height: 1rem;
            position: absolute;
            right: 0;
            color: #34495e;
        }
    }

    .bottom {
        position: absolute;
        width: 100%;
        height: 1.5rem;
        font-size: 0.4rem;
        line-height: 1.5rem;
        text-align: center;
        color: #34495e;
        bottom: 0;
        z-index: 4; 
        i {
            font-size: 0.4rem;
            color: #34495e;
        }
    }

    .key-controller {
        transform: translateY(1.5rem);
    }

    .key-controller-true {
        transform: translateY(-2.4rem);
        .login-box {
            opacity: 0;
        }
    }

    .key-transition {
        transition: transform .1s;
    }
</style>

<template>
    <div class="box">
        <my-bg mask="rgba(255,255,255,.9)" zIndex="999" :imgsrc="bg.login">
        
            <div class="key-transition" :class="{'key-controller-true': keyboard, 'key-controller': !keyboard}">
                <div class="login-box">
                    <img src="static/image/logo.jpg" alt="Logo">
                </div>

                <h1 class="title">WEBCHAT</h1>

                <div class="input-box">
                    <div class="input-list">
                        <input type="text" v-model="loginData.username" placeholder="用户名/邮箱" @focus="loginfoucs('username')">
                        <transition name="opacity">
                        <em v-if="loginErr.username.show">{{loginErr.username.text}}</em>
                        </transition>
                    </div>

                    <div class="input-list">
                        <input type="password" v-model="loginData.password" placeholder="密码" @focus="loginfoucs('password')">
                        <transition name="opacity">
                        <em v-if="loginErr.password.show">{{loginErr.password.text}}</em>
                        </transition>
                    </div>

                    <div class="input-list p4">
                        <div @click="loginSubmit" class="btn" ref="btn">
                            <my-fankui setbg="#1abc9c">登 录</my-fankui>
                        </div>
                    </div>
                </div>

                <div class="fu-ben" ref="fuben">
                    <input type="checkbox" :class="{browser: !app}" id="jzmm" v-model="autoLogin" />
                    <label for="jzmm">记住密码</label>
                    <span class="right" @click="loginCsSubmit">直接进入</span>
                </div>
            </div>

            <div class="bottom" ref="bottom" v-if="!keyboard"><i class="iconfont icon-qingqiu"></i>无知不是生存的障碍，傲慢才是！</div>

            <my-load v-if="mask"></my-load>
        </my-bg>
    </div>
</template>

<script>
    import { mapState, mapMutations, mapActions } from "vuex";
    import myFankui from "./public/NewFankui.vue";
    import myBg from './public/SlotBg.vue'
    import myLoad from './public/SubmitLoad.vue'
    import config from "../assets/config"
    const { axios, url } = config;
   
    export default {
        name: 'Login',
        components: { myBg, myLoad, myFankui },
        computed: {
            ...mapState(['isLogin', 'socketInfor', 'app', 'bg', 'keyboard'])
        },
        methods: {
            ...mapMutations(['setLogin']),
            ...mapActions(['init', 'newSetUsers']),
            setErr(key, str) {
                this.loginErr[key].text = str;
                this.loginErr[key].show = true;
            },
            loginSubmit() {
                const { username, password } = this.loginData;

                if (username === "") {
                    this.setErr("username", "用户名不能为空");
                    return;
                }

                if (password === "") {
                    this.setErr("password", "密码不能为空");
                    return;
                }

                if (password.length < 6 || password.length > 20) {
                    this.setErr("password", "密码应为6-20位字符");
                    return;
                }

                if (this.autoLogin) {
                    const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ0123456789";
                    let key = Date.now();
                    let len = Math.floor(Math.random() * 5 + 5);
                    for (let i = 0; i < len; i++) {
                        key += str[Math.floor(Math.random() * str.length)];
                    }
                    localStorage.setItem("autoLoginKey", key);
                    this.loginData.autokey = key;
                } else {
                    this.loginData.autokey = "";
                    localStorage.removeItem("autoLoginKey");
                }

                this.mask = true;
                
                const noticeid = localStorage.getItem('noticeid') ? localStorage.getItem('noticeid') : '';

                axios.post(url.login, {...this.loginData, ...this.socketInfor, device: "moblie", noticeid }).then(results => this.SubmitCallback(results));
            },
            loginCsSubmit() {
                this.mask = true;

                const noticeid = localStorage.getItem('noticeid') ? localStorage.getItem('noticeid') : '';
                
                axios.post(url.login, { ...this.socketInfor, device: "moblie", cs: true, noticeid }).then(results => this.SubmitCallback(results));
            },
            loginfoucs(str) {
                this.loginErr[str].show = false;
            },
            SubmitCallback(results) {
                const { data: { success, err }, data } = results;

                this.mask = false;

                if(data.success) {
                    this.setLogin(true);
                    this.newSetUsers(data);
                    return;
                }

                localStorage.removeItem('autoLoginKey');

                switch (err) {
                    case 1:
                        this.setErr("username", "用户名或邮箱不存在");
                        break;
                    case 2:
                        this.setErr("password", "密码不正确");
                        break;
                    default:
                        alert('登录失败');
                }
            }
        },
        data() {
            return {
                loginData: {
                    username: "",
                    password: "",
                    autokey: ""
                },
                loginErr: {
                    username: {
                        text: "",
                        show: false
                    },
                    password: {
                        text: "",
                        show: false
                    }
                },
                autoLogin: false,
                mask: false
            };
        },
        activated() {
            this.loginData.username = '';
            this.loginData.password = '';
        }
    }
</script>