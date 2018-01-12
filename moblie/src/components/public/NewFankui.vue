<style scoped lang="scss">
    .fankui {
        position: absolute;
        left: 0; 
        top: 0;
        right: 0;
        bottom: 0;
        transform: translateZ(0);
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .bg {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        border-radius: 50%;
        transform: scale3d(0, 0, 0);
    }
    .content {
        position: relative;
        z-index: 1;
    }
</style>
<template>
    <div class="fankui" ref="box" @touchstart="start($event)" @touchmove="move" @touchend="end()">
        <div class="bg" ref="bg" 
        :style="{
            transition: 'opacity .3s, transform ' + (num ? num : 1000) +'ms', 
            background: (setbg ? setbg: '#ddd')
        }"></div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Fankui',
        props: ['setbg', 'num'],
        methods: {
            start(ev) {
                
                const oBox = this.$refs.box;
                const oBg  = this.$refs.bg;
               
                let top   = oBox.offsetHeight / 2;
                let left  = oBox.offsetLeft;
                let obj   = oBox.offsetParent;
                let width = oBox.offsetWidth * 2;
                while(obj) {
                    left += obj.offsetLeft;
                    obj   = obj.offsetParent;
                }

                left = ev.changedTouches[0].pageX - left;
                
                oBg.style.width   = width + 'px';
                oBg.style.height  = width + 'px';
                oBg.style.left    = -(oBox.offsetWidth - left) + 'px';
                oBg.style.top     = -(oBox.offsetWidth - top) + 'px';
                oBg.style.opacity = 1;
                oBg.style.transform = 'scale3d(1,1,1)';

            },
            end() {
                clearTimeout(this.time);
                
                this.time = setTimeout(() => {
                    const oBg  = this.$refs.bg;
                    if(!oBg) return;
                    oBg.style.opacity = 0;
                    oBg.style.transform = 'scale3d(0,0,0)';
                }, 300);
            },
            move() {
                const oBg  = this.$refs.bg;
                oBg.style.opacity = 0;
                oBg.style.transform = 'scale3d(0,0,0)';
            }
        },
        data() {
            return {
                time: null
            }
        }
    }
</script>