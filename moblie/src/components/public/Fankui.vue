<style scoped lang="scss">
    .fankui {
        position: absolute;
        left: 0; 
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
    .bg {
        position: absolute;
        transition: opacity .2s;
        left: 0;
        top: 0;
        opacity: 0;
    }
    .content {
        position: relative;
        z-index: 1;
    }
</style>

<template>
    <div class="fankui" @touchend="end()" @touchmove="move" @touchstart="start($event)" ref="box">
        <canvas class="bg" :width="w" :height="h" ref="bg"></canvas>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NewFankui',
        data() {
            return {
                w: 0,
                h: 0,
                time: null,
                animate: true,
                startTime: null
            }
        },
        methods: {
            start(ev) {
                let bg = this.$refs.bg;
                let objStyle = getComputedStyle(this.$refs.box);
                let w = Math.ceil(parseFloat(objStyle.width));
                let h = Math.ceil(parseFloat(objStyle.height));
                let max = w * 2;
                let t = h / 2;
                let l = ev.changedTouches[0].pageX - this.$refs.box.offsetParent.offsetLeft;
                let num = 0;
                let ctx = bg.getContext('2d');
                let n = this.num ? parseFloat(this.num) : 20;
      
                this.w = w;
                this.h = h;
                
                
                const bgAnimate = () => {
                    num += n;
                    ctx.clearRect(0,0,w,h);
                    ctx.beginPath();
                    ctx.arc(l, t, num, 0, Math.PI * 2, true)
                    ctx.closePath();
                    ctx.fillStyle = this.setbg ? this.setbg : '#ddd';
                    ctx.fill();
                    (this.animate && num <= max) && requestAnimationFrame(bgAnimate);
                }
                clearTimeout(this.startTime);
                this.startTime = setTimeout(() => {
                    bg.style.opacity = 1;
                    requestAnimationFrame(bgAnimate);
                }, 5);
            },
            end() {
                this.animate = true;
                clearTimeout(this.time);
                
                this.time = setTimeout(() => {
                    this.$refs.bg && (this.$refs.bg.style.opacity = 0);
                }, 260);
            },
            move() {
                clearTimeout(this.startTime);
                this.animate = false;
                this.$refs.bg.style.opacity = 0;
            }
        },
        props: ['setbg', 'num']
    }
</script>
