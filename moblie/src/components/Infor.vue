<style scoped lang="scss">
    .infor-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        background-color: #fff;
        background-size: 100% 100%;
        &.app .header{
            padding-top: .66rem;
            .router {
                top: .66rem;
            }
        }
        &.app .content-box {
            top: 4rem;
        }
    }

    .header {
        color: #627385;
        height: 1rem;
        font-size: .4rem;
        font-weight: 500;
        .router {
            position: absolute;
            top: 0;
            width: 1rem;
            line-height: 1rem;
            text-align: center;
            color: #627385;
            i {
                font-size: .5rem;
            }
            &.left {
                left: 0;
            }
            &.right {
                right: .1rem;
            }
        }
        .title {
            padding-top: .15rem;
            height: .5rem;
            line-height: .5rem;
            text-align: center;
        }
        .xq-title {
            line-height: 1rem;
            text-align: center;
        }
        .state {
            line-height: .3rem;
            font-size: .28rem;
            text-align: center;
        }
    }

    .content-box {
        background: rgba(255,255,255,.5);
        box-shadow: 0 0 .2rem rgba(0,0,0,.3);
        position: absolute;
        top: 3.5rem;
        left: .5rem;
        right: .5rem;
        bottom: .5rem;
    }

    .user-img {
        position: absolute;
        z-index: 1;
        padding: .5rem;
        width: 4rem;
        height: 4rem;
        left: 2rem;
        top: -2.5rem;
        img {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            box-shadow: 0 0 .5rem rgba(0,0,0,1);
            vertical-align: middle;
        }
    }

    .content {
        font-size: .35rem;
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        color: #627385;
        left: 0;
        right: 0;
        bottom: .5rem;
        top: 2rem;
        transform: translateZ(0);
        &::-webkit-scrollbar {
            width: 0;
        }
        ul {
            // padding-bottom: 100px;
        }
        li {
            padding: 0 .5rem;
            border-bottom: 1px solid #D1D1D1;
            &.none {
                border: none;
            }
        }
        span.da-title {
            float: left;
            width: 1.25rem;
            line-height: 1.5rem;
            font-weight: bold;
            font-size: .35rem;
        }
        span.da-nr {
            float: left;
            width: 6.75rem;
            line-height: .7rem;
            padding: .4rem 0;
        }
    }
</style>

<template>
<transition name="translate"  @after-enter="setInit">
    <div class="translate3d infor-box" 
        ref="inforBox" 
        :style="{'background-image' : keyboard ? 'none' : `url(${bg.infor})`}" 
        :class="{app: app}">
        <div class="header">
            <div class="router left" @touchend.stop="back"><i class="iconfont icon-fanhui"></i></div>
            <div class="xq-title">用户详情</div>
        </div>

        <div class="content-box">
            <div class="user-img">
                <img :src="userdata.headphoto" alt="">
            </div>

            <div class="content" ref="box" 
                @touchstart.prevent.stop="scrollStart($event)"
                @touchmove="scrollMove($event)"
                @touchend="scrollEnd">
                <ul ref="list">
                    <li class="clearfix"><span class="da-title">账号：</span><span class="da-nr">{{userdata.username}}</span></li>
                    <li class="clearfix"><span class="da-title">姓名：</span><span class="da-nr">{{userdata.name}}</span></li>
                    <li class="clearfix"><span class="da-title">性别：</span><span class="da-nr">{{userdata.sex==1 ? '男' : '女'}}</span></li>
                    <li class="clearfix"><span class="da-title">邮箱：</span><span class="da-nr">{{userdata.email}}</span></li>
                    <li class="clearfix"><span class="da-title">年龄：</span><span class="da-nr">{{userdata.age}}岁</span></li>
                    <li class="clearfix"><span class="da-title">分组：</span><span class="da-nr">{{getClass(userdata.class)}}</span></li>
                    <li class="clearfix none"><span class="da-title">介绍：</span><span class="da-nr">{{userdata.synopsis ? userdata.synopsis : '未填写'}}</span></li>
                </ul>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    let box = null;
    export default {
        name: 'Infor',
        computed: {
            ...mapGetters(['getClass', 'getUser']),
            ...mapState(['app', 'users', 'bg', 'keyboard'])
        },
        methods: {
            setInit() {
                this.init = true;
                this.userdata = this.getUser(this.$route.params.id);
            },
            scrollStart(ev) {
                const oBox   = this.$refs.box;
                this.startY = ev.targetTouches[0].pageY;
                this.oList  = this.$refs.list;
                this.minY   = parseFloat(getComputedStyle(oBox).height) - this.oList.offsetHeight;
                if(this.minY > 0) this.minY = 0;
            },
            scrollMove(ev) {
                this.Y = this.endY + (ev.targetTouches[0].pageY - this.startY);
                if(this.Y > 0) {
                    this.Y = 0;
                }
                else if(this.Y < this.minY) {
                    this.Y = this.minY;
                }
                this.oList.style.transform = this.oList.style.webkitTransform ='translateY('+ this.Y +'px)';  
            },
            scrollEnd() {
                this.endY = this.Y;
            },
            back() {
                history.back();
            }
        },
        data() {
            return {
                init: false,
                b: false,
                startY: 0,
                Y: 0,
                endY: 0,
                minY: 0,
                oList: null,
                userdata: {}
            }
        },
        mounted() {
            setTimeout(() => {
                if(this.init) return;
                this.setInit();
            }, 1000);
        },
        destroyed() {
            window.mainBox = box;
        }
    }
</script>
