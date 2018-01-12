<style scoped lang="scss">
    .input-box {
        padding: .5rem .5rem 0;
        position: relative;
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
    .sm {
        line-height: 1rem;
        font-size: .3rem;
        color: #777;
    }
    .err {
        font-size: .3rem;
        color: #f00;
        position: absolute;
        right: .6rem;
        top: 1.25rem;
    }
</style>

<template>
    <my-box :submit="send" title="修改年龄">
        <div class="input-box">
            <input type="number" v-model="age" min="0" max="120" placeholder="输入您的年龄">
            <div class="sm">让大家知道你今年多大了！</div>
            <transition name="opacity">
                <span v-if="err" class="err">{{err}}</span>
            </transition>
        </div>
        <my-load v-if="load"></my-load>
    </my-box>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import  myBox from './public/SetChildrenBox.vue'
    import myLoad from './public/SubmitLoad.vue'
    import config from '../assets/config'
    const { axios, url } = config;
    export default {
        name: 'Age',
        components: { myBox, myLoad },
        methods: {
            ...mapMutations(['setActive']),
            send() {
                if(this.age === '') {
                    this.err = '年龄不能为空';
                    return;
                }
                if(this.age < 1) {
                    this.err = '年龄最少为一岁';
                    return;
                }
                if(this.age > 120) {
                    this.err = '年龄不能大于120岁';
                    return;
                }
                this.load = true;
                axios.post(url.setUser, { state: 'age', age: this.age }).then(result => {
                    const { success, err } = result.data;
                    this.load = false;
                    if(success) {
                        this.setActive({key: 'age', val: this.age});
                        history.back();
                        return;
                    }
                    
                    this.app ? plus.nativeUI.toast('修改失败', {duration:"long"}) : alert('修改失败');
                })
            }
        },
        computed: {
            ...mapState(['active', 'app'])
        },
        data() {
            return {
                age: '',
                err: '',
                load: false
            }
        },
        watch: {
            active(newval) {
                if(newval && newval.age) this.age = newval.age;
            }
        },
        mounted() {
            this.age = this.active.age;
        }
    }
</script>