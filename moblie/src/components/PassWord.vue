<style scoped lang="scss">
    .input-box {
        padding: .5rem .5rem 0;
        p {
            position: relative;
        }
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

    .submit-btn{
        font-size: .3rem;
        text-align: center;
        height: .8rem;
        line-height: .8rem;
        background: #627385;
        overflow: hidden;
        color: #fff;
        border-radius: .08rem;
        position: relative;
        display: block;
    }

    .err {
        font-size: .3rem;
        color: #f00;
        position: absolute;
        right: .6rem;
        top: .75rem;
    }
</style>

<template>
    <my-box title="修改密码" :submit="send">
        <div class="input-box">
            <p>
                <input type="password" @touchstart="start($event, 'passwordErr')" v-model="password" placeholder="输入新密码">
                <transition name="opacity">
                    <span v-if="passwordErr" class="err">{{passwordErr}}</span>
                </transition>
            </p>
            <p>
                <input type="password" @touchstart="start($event, 'repasswordErr')" v-model="repassword" placeholder="确认密码">
                <transition name="opacity">
                    <span v-if="repasswordErr" class="err">{{repasswordErr}}</span>
                </transition>
            </p>
            <p class="tobtn-box">
                <span class="submit-btn" @touchend="send">
                    <my-fankui setbg="#1abc9c">保 存</my-fankui>
                </span>
            </p>
        </div>
        <my-load v-if="load"></my-load>
    </my-box>
</template>

<script>
    import { mapState } from 'vuex'
    import myBox from './public/SetChildrenBox.vue'
    import myFankui from './public/NewFankui.vue'
    import myLoad from './public/SubmitLoad.vue'
    import config from '../assets/config'
    const { axios, url } = config;
    export default {
        name: 'PassWord',
        computed: {
            ...mapState(['app'])
        },
        components: { myBox, myFankui, myLoad },
        methods: {
            send() {
                
                if(this.password === '') {
                    this.passwordErr = '密码不能为空'
                    return;
                }
                if(this.password.length < 6 ) {
                    this.passwordErr = '密码长度不能少于6位';
                    return;
                }
                if(this.password.length > 20) {
                    this.passwordErr = '密码长度不能少于20位';
                    return;
                }
                if(this.repassword === '') {
                    this.repasswordErr = '请确认密码';
                    return;
                }
                if(this.repassword !== this.password) {
                    this.repasswordErr = '重复输入不正确';
                    return;
                }
               
                axios.post(url.setUser, { state: 'password', password: this.password }).then(result => {
                    const { success, err } = result.data;
                    if(success) {
                        history.back();
                        return;
                    }
                    this.app ? plus.nativeUI.toast('修改失败', {duration:"long"}) : alert('修改失败');
                })

            },
            start(ev, err) {
                ev.currentTarget.focus();
                this[err] = '';
            }
        },
        data() {
            return {
                password: '',
                passwordErr: '',
                repassword: '',
                repasswordErr: '',
                load: false
            }
        }
    }
</script>
