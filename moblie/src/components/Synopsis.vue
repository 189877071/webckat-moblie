<style scoped lang="scss">
    .input-box {
        padding: .5rem .5rem 0;
        position: relative;
        span {
            position: absolute;
            font-size: .35rem;
            color: #666;
            right: .8rem;
            bottom: .95rem;
        }
    }

    textarea {
        box-sizing: border-box;
        height: 1rem;
        border: 1px solid #0abb98;
        width: 100%;
        background: none;
        padding: .3rem;
        height: 2rem;
        color: #111;
        font-size: .35rem;
        resize: none;
        border-radius: .08rem;
        box-shadow: 0 0 .5rem rgba(0, 0, 0, .3);
        background: rgba(255,255,255,.6);
    }

    .sm {
        line-height: .6rem;
        font-size: .3rem;
        color: #777;
    }
</style>

<template>
    <my-box :submit="send" title="修改个人介绍">
        <div class="input-box">
            <textarea v-model="text" placeholder="填写个性签名"></textarea>
            <span>{{num}} / 50</span>
            <div class="sm">个人介绍 更好的展示自己！</div>
        </div>
        <my-load v-if="load"></my-load>
    </my-box>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import myBox from './public/SetChildrenBox.vue'
    import myLoad from './public/SubmitLoad.vue'
    import config from '../assets/config'
    const { axios, url } = config
    export default {
        name: 'Synopsis',
        components: { myBox, myLoad },
        methods: {
            ...mapMutations(['setActive']),
            send() {
                if(this.text === '' || this.text === this.active.synopsis) {
                    history.back();
                    return;
                }
                this.load = true;
                axios.post(url.setUser, { state: 'synopsis', synopsis: this.text }).then(result => {
                    const { success, err } = result.data;
                    this.load = false;
                    if(success) {
                        this.setActive({key: 'synopsis', val: this.text});
                        history.back();
                        return;
                    }
                    this.app ? plus.nativeUI.toast('修改失败', {duration:"long"}) : alert('修改失败');
                })
            }
        },
        computed: {
            ...mapState(['active', 'app']),
            num() {
                return this.text ? this.text.length : 0;
            }
        },
        watch: {
            text(val) {
                if(val && val.length > 50) {
                    this.text = val.slice(0,50);
                }
            },
            active(val) {
                if(val && val.synopsis) {
                    this.text = val.synopsis;
                }
            }
        },
        data() {
            return {
                text: '',
                load: false
            }
        },
        mounted() {
            this.text = this.active.synopsis;
        }
    }
</script>