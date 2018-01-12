<style scoped lang="scss">
   .input-box {
        padding: .5rem .5rem 0;
    }

    p {
        position: relative;
    }

    .tobtn-box {
        padding-top: .5rem;
    }

    input {
        height: 1rem;
        border: none;
        border-bottom: 1px solid #0abb98;
        width: 100%;
        background: none;
        text-indent: .5rem;
        color: #111;
        font-size: .35rem;
    }

    input.yzm {
        width: 5.5rem;
    }

    .submit-btn,
    .verify-btn {
        font-size: .3rem;
        text-align: center;
        height: .8rem;
        line-height: .8rem;
        background: #627385;
        overflow: hidden;
        color: #fff;
        border-radius: .08rem;
    }

    .verify-btn {
        position: absolute;
        width: 3rem;
        top: .52rem;
        right: 0;
    }

    .submit-btn {
        position: relative;
        display: block;
    }

    .err,
    .verify-err {
        position: absolute;
        font-size: .35rem;
        right: .3rem;
        top: .57rem;
        color: #d70000;
    }

    .verify-err {
        right: 3.5rem;
    } 
</style>
<template>
    <my-box :submit="send" title="修改邮箱地址">
        <div class="input-box">
            <p>
                <input type="email" v-model="email" @focus="focus('email')" placeholder="输入新的邮箱地址">
                <transition name="opacity">
                    <span v-if="emailErr" class="err">{{emailErr}}</span>
                </transition>
            </p>
            <p>
                <input type="text" v-model="verify" @focus="focus()" placeholder="输入邮箱验证码" class="yzm">
                <span class="verify-btn" @touchend="getVerify">
                    <my-fankui setbg="#1abc9c" num="1000">{{verifyText ? verifyText + ' 秒' : '获取验证码'}}</my-fankui>
                </span>
                <transition name="opacity">
                    <span v-if="verifyErr" class="verify-err">{{verifyErr}}</span>
                </transition>
            </p>
            <p class="tobtn-box">
                <span class="submit-btn" @touchend="send()">
                    <my-fankui setbg="#1abc9c">保 存</my-fankui>
                </span>
            </p>
        </div>
        <my-load v-if="load"></my-load>
    </my-box>
</template>
<script>
    import { mapMutations, mapState } from 'vuex'
    import myBox from './public/SetChildrenBox.vue'
    import myFankui from './public/NewFankui.vue'
    import myLoad from './public/SubmitLoad.vue'
    import config from '../assets/config'
    const { axios, url } = config;
    export default {
        name: 'Email',
        components: { myBox, myFankui, myLoad },
        computed: {
            ...mapState(['app'])
        },
        methods: {
            ...mapMutations(['setActive']),
            send() {

                if(!this.email) {
                    this.emailErr = '请先输入邮箱地址';
                    return;
                }

                if(this.step != 2) {
                    this.verify = '';
                    this.verifyErr = '请先获取验证码';
                    return;
                }

                if(!this.verify) {
                    this.verifyErr = '请先输入验证码';
                    return;
                }

                this.load = true;

                axios.post(url.setUser, { state: 'emailverify', emailverify: this.verify }).then(result => {
                    this.load = false;

                    const { success, err } = result.data;

                    if(success) {
                        this.setActive({key: 'email', val: this.email});
                        history.back();
                        return;
                    }
                    
                    switch(err) {
                        case 1:
                            this.verifyErr = '验证码不正确';
                            break;
                        case 2:
                            this.verifyErr = '验证码已超时';
                            break;
                        default:
                            this.app ? plus.nativeUI.toast('修改失败', {duration:"long"}) : alert('修改失败');
                    }
                });
            },
            countDown() {
                this.verifyText = 120;
                
                clearInterval(this.time);

                this.time = setInterval(() => {
                    if(this.verifyText > 0) {
                        this.verifyText--;
                    } 
                    else {
                        clearInterval(this.time);
                    }
                }, 1000);
            },
            getVerify() {
                
                if( this.verifyText > 0) return;

                if(this.email === '') {
                    this.emailErr = '请先输入邮箱';
                    return;
                }
                
                if(!/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(this.email)) {
                    this.emailErr = '邮箱格式不正确'
                    return;
                }

                this.load = true;
                
                axios.post(url.setUser, { state: 'email', email: this.email }).then(result => {
                    const { success, err } = result.data;
                    
                    this.load = false;

                    if(success) {
                        this.step = 2;
                        this.countDown();
                        return;
                    }

                    if(err == 1) {
                        this.emailErr = '该邮箱已存在';
                    }
                })
            },
            focus(key) {
                if(key === 'email') {
                    this.emailErr = '';
                }
                else {
                    this.verifyErr = '';
                }
            }
        },
        watch: {
            
        },
        data() {
            return {
                verifyText: 0,
                emailErr: '',
                verifyErr: '',
                email: '',
                time: null,
                load: false,
                verify: '',
                step: 1
            }
        }
    }
</script>
