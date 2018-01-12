<style scoped lang="scss">
    .photo-box {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: #fff;
    }
    .img {
        position: absolute;
    }
    .mask {
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0rem;
        top: 0rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    .btn-box {
        position: absolute;
        bottom: 2rem;
        left: 1rem;
        right: 1rem;
        display: flex;
        .btn {
            flex: 1;
            position: relative;
            height: 1rem;
            margin: 0 .2rem;
            line-height: 1rem;
            font-size: .4rem;
            color: #fff;
            background: #627385;
            border-radius: .1rem;
            text-align: center;
            overflow: hidden;
            box-shadow: 0 0 .2rem #627385;
            i {
                font-size: .4rem;
            }
        }
        .left {
            float: left;
        }
        .right {
            float: right;
        }
    }
    .header {
        top: 0;
        left: 0;
        width: 100%;
        height: 1.1rem;
        line-height: 1.1rem;
        position: absolute;
        z-index: 3;
        color: #fff;
        h1 {
            text-align: center;
            font-weight: 500;
            font-size: .45rem;
        }
        span {
            position: absolute;
            font-size: .35rem;
            left: .4rem;
            
            i {
                padding-right: .1rem;
                font-size: .45rem;
                display: inline-block;
                vertical-align: middle;
            }
        }
        span.baocun {
            left: auto;
            right: .4rem;
            width: 1.4rem;
            text-align: center;
            background: #627385;
            height: .7rem;
            line-height: .7rem;
            font-size: .3rem;
            color: #fff;
            top: .2rem;
            border-radius: .08rem;
            box-shadow: 0 0 .2rem rgba(0,0,0,.4);
            overflow: hidden;
        }
        &.app {
            padding-top: .66rem;
            span.baocun {
                top: .86rem;
            }
        }
    }
</style>

<template>
    <transition name="opacity">
        <div class="photo-box" @touchstart.prevent="start($event)" @touchmove="move($event)" @touchend="end">
            <div class="header" :class="{app: app}">
                <span @touchend.stop="quxiao"><i class="iconfont icon-fanhui"></i>取消</span>
                <span class="baocun" @touchend.stop="save">
                    <my-fankui num="500" setbg="#1abc9c">保 存</my-fankui>
                </span>
            </div>
            <img class="img" :src="src" ref="oImg" @load="imgload($event)" alt=" ">
            <div class="mask" :style="{'background-image': `url(static/image/setphotomask.png)`}"></div>
            <div v-if="!app" class="btn-box">
                <div class="btn" @touchend.stop="fanda">
                    <my-fankui num="500" setbg="#1abc9c">
                        <i class="iconfont icon-jia"></i>
                        放大
                    </my-fankui>
                </div>
                <div class="btn" @touchend.stop="huanyuan">
                    <my-fankui num="500" setbg="#1abc9c">
                        <i class="iconfont icon-huanyuan"></i>
                        还原
                    </my-fankui>
                </div>
                <div class="btn" @touchend.stop="shuoxiao">
                    <my-fankui num="500" setbg="#1abc9c">
                        <i class="iconfont icon-icon"></i>
                        缩小
                    </my-fankui>
                </div>
            </div>
            <my-load v-if="load" title="正在上传图片……"></my-load>
        </div>
    </transition>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import myFankui from './NewFankui.vue'
    import myLoad from './SubmitLoad.vue'
    import fn from '../../assets/fn'
    import config from '../../assets/config'
    const { axios, url } = config;
    const { screenshot, pcUploader, toast } = fn;
    export default {
        name: 'SetHeadPhoto',
        components: { myFankui, myLoad },
        props: ['src'],
        computed: {
            ...mapState(['app'])
        },
        methods: {
            ...mapMutations(['setActive', 'showHeadPhoto']),
            imgload(ev) {
                let oImg = this.$refs.oImg;
                this.oW = this.imgW = oImg.width;
                this.oH = this.imgH = oImg.height;
                let L = (window.innerWidth - oImg.width) / 2;
                let T = (window.innerHeight - oImg.height) / 2;
                oImg.style.transform = oImg.style.webkitTransform = `translate3d(${L}px,${T}px,0)`;
                this.minScale = oImg.width > oImg.height ? this.seeH / oImg.height : this.seeW / oImg.width;
                this.L = L;
                this.T = T;
                this.minL = (this.seeW + this.seeL) - oImg.width;
                this.minT = (this.seeH + this.seeT) - oImg.height;
                this.imgbl = oImg.width / oImg.height;
            },
            scaleImg() {
                const [oImg, imgW, imgH] = [
                    this.$refs.oImg,
                    this.imgW * this.scale,
                    this.imgH * this.scale
                ];
                this.minL = (this.seeW + this.seeL) - imgW;
                this.minT = (this.seeH + this.seeT) - imgH;
                this.L += (this.oW - imgW) / 2;
                this.T += (this.oH - imgH) / 2; 
                this.oW = imgW;
                this.oH = imgH;
                if(this.L > this.seeL) {
                    this.L = this.seeL;
                }
                else if(this.L < this.minL) {
                    this.L = this.minL;
                }

                if(this.T > this.seeT) {
                    this.T = this.seeT;
                }
                else if(this.T < this.minT) {
                    this.T = this.minT;
                }
                oImg.style.width  = imgW   + 'px';
                oImg.style.height = imgH   + 'px';
                oImg.style.transform = oImg.style.webkitTransform = `translate3d(${this.L}px,${this.T}px,0)`;
            },
            fanda() {
                this.scale += .1;
                this.scaleImg();
            },
            shuoxiao() {
                this.scale -= .1;
                if(this.scale < this.minScale)  {
                    this.scale = this.minScale
                }
                this.scaleImg();
            },
            huanyuan() {
                this.scale = 1;
                this.scaleImg();
            },
            start(ev) {
                if(ev.targetTouches.length > 1) {
                    this.isScale = true;
                    this.startXc = Math.abs(ev.targetTouches[0].pageX - ev.targetTouches[1].pageX);
                    this.startYc = Math.abs(ev.targetTouches[0].pageY - ev.targetTouches[1].pageY);
                    this.fx = (this.startXc > this.startYc) ? 'X' : 'Y';
                }
                else {
                    this.isScale = false;
                    this.startL = ev.targetTouches[0].pageX;
                    this.startT = ev.targetTouches[0].pageY;
                }
            },
            move(ev) {
                if(ev.targetTouches.length > 1) {
                    this.liangluo(ev);
                }
                else {
                    this.yidon(ev);
                }
            },
            end() {
                if(this.isScale){
                    this.scalejc = this.scale;
                }
                else {
                    this.L = this.moveL;
                    this.T = this.moveT;
                }
            },
            save() {
                let [W, H, L, T, imgW, imgH] = [
                    200,
                    200,
                    ((this.L - this.seeL) / this.scale) * -1,
                    ((this.T - this.seeT) / this.scale) * -1,
                    this.seeW / this.scale,
                    this.seeH / this.scale
                ];
                this.load = true;
                screenshot(this.$refs.oImg, {W, H, L, T, imgW, imgH}).then(pcUploader).then(reslut => {
                    const { success, content } = reslut;
                    if(!success) {
                        this.load = false;
                        toast('图片上传失败');
                        return;
                    }

                    axios.post(url.setUser, { state: 'headphoto', headphoto: content }).then(result => {
                        const { success, err } = result.data;
                        this.load = false;
                        if(success) {
                            this.setActive({key: 'headphoto', val: url.hostname + content});
                            this.showHeadPhoto(false);
                            return;
                        }
                        toast('图片上传失败');;
                    })
                })
            },
            quxiao() {
                this.showHeadPhoto(false);
            },
            yidon(ev) {
                let [L, T] = [
                    this.L + (ev.targetTouches[0].pageX - this.startL),
                    this.T + (ev.targetTouches[0].pageY - this.startT)
                ];
                if(L > this.seeL) {
                    L = this.seeL;
                }
                else if(L < this.minL) {
                    L = this.minL;
                }
                if(T > this.seeT) {
                    T = this.seeT;
                }
                else if(T < this.minT) {
                    T = this.minT;
                }
                this.moveL = L;
                this.moveT = T;
                this.oImg.style.transform = this.oImg.style.webkitTransform = `translate3d(${L}px,${T}px,0)`;
            },
            liangluo(ev) {
                let C = 0;
                if(this.fx === 'X') {
                    // 以 X轴为中心点
                    C = Math.abs(ev.targetTouches[0].pageX - ev.targetTouches[1].pageX) - this.startXc;
                }
                else {
                    // 以 Y轴为中心点
                    C = Math.abs(ev.targetTouches[0].pageY - ev.targetTouches[1].pageY) - this.startYc;
                }
                this.scale = this.scalejc + C/200;
                if(this.scale < this.minScale) {
                    this.scale = this.minScale;
                }
                this.scaleImg();
            }
        },
        data() {
            return {
                L: 0,
                T: 0,
                startL: 0,
                startT: 0,
                moveL: 0,
                moveT: 0,
                seeW: 0,
                seeH: 0,
                seeL: 0,
                seeT: 0,
                minL: 0,
                minT: 0,
                imgW: 0,
                imgH: 0,
                scale: 1,
                oW: 0,
                oH: 0,
                minScale: 0,
                oImg: null,
                load: false,
                isScale: false,
                startXc: 0,
                startYc: 0,
                fx: 'X',
                scalejc: 1
            }
        },
        mounted() {
            const [maskImgW, maskImgH, seeW, seeH, windowW, windowH] = [640, 1136, 500, 500, window.innerWidth, window.innerHeight];
            this.seeW = seeW / (maskImgW / windowW);
            this.seeH = seeH / (maskImgH / windowH);
            this.seeL = (windowW - this.seeW) / 2;
            this.seeT = (windowH - this.seeH) / 2;
            this.oImg = this.$refs.oImg;
        }
    }
</script>

