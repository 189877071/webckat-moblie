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
    <my-box :submit="send" title="修改昵称">
        <div class="input-box">
            <input type="text" v-model="oname" @focus="(err='')" placeholder="输入您的昵称">
            <transition name="opacity">
                <span v-if="err" class="err">{{err}}</span>
            </transition>
            <div class="sm">好的昵称可以让你的朋友更好的记住你哦！</div>
        </div>
        <my-load v-if="load"></my-load>
    </my-box>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import myBox from './public/SetChildrenBox.vue'
    import myLoad from './public/SubmitLoad.vue'
    import config from '../assets/config'
    const { axios, url } = config;
    export default {
        name: 'Name',
        components: { myBox, myLoad },
        computed: {
            ...mapState(['active', 'app'])
        },
        methods: {
            ...mapMutations(['setActive']),
            send() {
               
                if(this.oname === '') {
                    this.err = '昵称不能为空';
                    return;
                }

                if(this.active.name === this.oname) {
                    history.back();
                    return;
                }

                this.load = true;
                axios.post(url.setUser, { state: 'name', name: this.oname }).then(result => {
                    const { success, err } = result.data;
                    this.load = false;
                    if(success) {
                        this.setActive({key: 'name', val: this.oname});
                        history.back();
                        return;
                    }
                    this.app ? plus.nativeUI.toast('修改失败', {duration:"long"}) : alert('修改失败');
                })
            }
        },
        data() {
            return {
                oname: '',
                err: '',
                load: false
            }
        },
        watch: {
            active(newval) {
                if(newval) this.oname = newval.name;
            }
        },
        mounted() {
            this.oname = this.active.name;
        }
    }
</script>