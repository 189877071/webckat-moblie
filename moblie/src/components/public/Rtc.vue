<style scoped lang="scss">
    .box {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        z-index: 99;
        background-color: #fff;
        background-size: 100% 100%;

        iframe {
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
        }
    }
    h1, .photo, .jujue, .jieting {
        text-align: center;
        color: #fff;
        text-shadow: 0 0 .2rem rgba(0,0,0,1);
    }
    h1 {
        margin-top: 2rem;
        font-size: .6rem;
        height: 1rem;
        line-height: 1rem;
    }
    .photo {
        margin-top: 1rem;
        font-size: .5rem;
        line-height: 1rem;
        img.photoimg {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            box-shadow: 0 0 .2rem rgba(0,0,0,.5);
        }
    }

    .chaozuo {
        position: absolute;
        bottom: 3rem;
        width: 6rem;
        left: 2rem;
    }

    .jujue, .jieting {
        text-align: center;
        width: 2.5rem;
        
        .btn {
            $h: .8rem;
            position: relative;
            border: none;
            overflow: hidden;
            height: $h;
            line-height: $h;
            width: 1.7rem;
            border-radius: .5rem;
            box-shadow: 0 0 .2rem rgba(0,0,0,.5);
            margin: 0 auto;
            font-size: $h;
            i {
                line-height: $h;
                font-size: $h;
                color: rgb(231, 209, 209);
            }
        }
        .text {
            line-height: .7rem;
            font-size: .4rem;
        }
    }

    .jujue {
        float: left;
        .btn {
            background: #b22e2c;
        }
    }

    .jieting {
        float: right;
        .btn {
            background: #369c50;
        }
    }

    .fanhui {
        position: absolute;
        color: #fff;
        text-shadow: 0 0 .2rem rgba(0,0,0,1);
        text-align: center;
        height: .8rem;
        line-height: .8rem;
        top: .3rem;
        left: .3rem;
        font-size: .35rem;
        i {
            font-size: .4rem;
        }
    }
</style>

<template>
    <div class="box" :style="{'background-image' : keyboard ? 'none' : `url(${bg.rtc})`}">
        <div v-if="RTC.state == 2 && !iframe">
            <h1>视频通话</h1>

            <div class="photo">
                <div>
                    <img class="photoimg" :src="userdata.headphoto" alt=" ">
                </div>
                <span>{{userdata.name ? userdata.name : userdata.username}}</span>
            </div>

            <div class="chaozuo">
                <div class="jujue">
                    <div class="btn" @click="jujue">
                        <my-fankui num="500" setbg="#2D6EB4">
                            <i class="iconfont icon-guaduan"></i>
                        </my-fankui>
                    </div>
                    <div class="text">拒绝</div>
                </div>
                <div class="jieting">
                    <div class="btn" @click="jieting">
                        <my-fankui num="500" setbg="#2D6EB4">
                            <i class="iconfont icon-shipintonghua"></i>
                        </my-fankui>    
                    </div>
                    <div class="text">接听</div>
                </div>
            </div>
        </div>

        <div v-if="RTC.state == 1 || iframe">
            <iframe scrolling="no" frameborder="0" :src="iframeurl"></iframe>
            <div class="fanhui" @click="quxiao"><i class="iconfont icon-fanhui"></i> 返回</div>
        </div>

        <my-load v-if="load" title="正在提交中……"></my-load>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import myLoad from './SubmitLoad.vue'
    import myFankui from './NewFankui.vue'
    import config from '../../assets/config'
    import fn from '../../assets/fn'
    const { url, axios } = config;
    export default {
        name: 'RTC',
        components: { myLoad, myFankui },
        computed: {
            ...mapState(['bg', 'keyboard', 'RTC', 'app', 'socketInfor', 'active']),
            ...mapGetters(['getUser']),
            userdata() {
                return this.getUser(this.RTC.sendid);
            }
        },
        methods: {
            ...mapMutations(['setRTC']),
            jujue() {
                this.load = true;
                axios.post(url.rtc, {state: 'jujue', sendid: this.RTC.sendid}).then(reslut => {
                    this.load = false;
                    this.setRTC(null);
                });
            },
            jieting() {
                this.iframe = true;
            },
            quxiao() {
                this.setRTC(null);
            }
        },
        data() {
            return {
                load: false,
                iframeurl: '',
                state: '',
                iframe: false
            }
        },
        mounted() {
            if(this.RTC.state == 1 && !this.userdata.login) {
                alert('对方不在线,无法进行视频通话');
                this.setRTC(null);
                return;
            }

            this.iframeurl = encodeURI(fn.edUrl(url.rtcindexurl, {
                ...this.RTC, 
                headphoto: this.userdata.headphoto, 
                name: this.userdata.name ? this.userdata.name : this.userdata.username
            }));
        }
    }
</script>