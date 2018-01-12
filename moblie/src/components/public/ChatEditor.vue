<style lang="scss" scoped>
    .editor-box {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 1;
        
        .col-1 {
            position: relative;
            
            .editor {
                float: left;
                background: #fff;
                max-height: 2.9rem;
                overflow: auto;
                width: 7.4rem;
                margin-left: .2rem;
                bottom: 0;
                border-radius: .1rem;
                font-size: .38rem;
                min-height: .6rem;
                line-height: .6rem;
                padding: .1rem .2rem;
            }

            .send {
                border: none;
                width: 1.6rem;
                position: absolute;
                right: .2rem;
                bottom: 0;
                height: .8rem;
                background: #627385;
                color: #fff;
                border-radius: .1rem;
                
            }
        }

        .col-2 {
            display: flex;
            line-height: 1rem;
            height: 1rem;
            div {
                flex: 1;
                text-align: center;
                i.iconfont {
                    font-size: .7rem;
                    color: #627385;
                }
            }
        }

        .biaoqinbao-box {
            height: 3.8rem;
            background: rgba(255,255,255, .5);
            border-top: 1px solid rgba(93,115,133, .5);
            margin-top: .2rem;
            padding-left: .2rem;
            position: relative;
            display: none;
            img {
                width: .8rem;
                height: .8rem;
                padding: .1rem .2rem;
            }
            .jt {
                position: absolute;
                width: .5rem;
                height: .25rem;
                background: rgba(93,115,133, .5);
                top: -.25rem;
                left: .73rem;
                clip-path: polygon(.25rem 0, .5rem .25rem, 0rem .25rem);
            }
        }
    }
</style>

<template>
    <div class="editor-box">
        <div class="col-1 clearfix">
            <div class="editor" contenteditable="true" @touchstart.stop="focus($event)" ref="content"></div>
            <button type="button" class="send" @touchend="messageSend">发送</button>
        </div>
        
        <div class="col-2 clearfix">
            <div class="activei"><i class="iconfont icon-biaoqing"></i></div>
            <div><i class="iconfont icon-llrandomshake"></i></div>
            <div><i class="iconfont icon-552cd47fba2cc"></i></div>
            <div><i class="iconfont icon-yuyin"></i></div>
            <div><i class="iconfont icon-shexiangtou"></i></div>
        </div>

        <div class="biaoqinbao-box">
            <div class="jt"></div>
            <img :src="item" v-for="(item, index) in bqb" :key="index" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChatEditor'
    }
</script>

