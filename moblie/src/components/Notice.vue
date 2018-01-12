<style scoped lang="scss">
    .box {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-size: 100% 100%;
    }
    .notice-box {
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        padding-bottom: .5rem;
        &::-webkit-scrollbar {
            width: 0;
        }
        &.app {
            top: 1.66rem;
        }
    }
    .list {
        margin: .5rem .5rem .0rem .5rem;
        // padding: .25rem;
        background: rgba(255,255,255, .6);
        box-shadow: 0 0 .5rem rgba(0,0,0,.3);
        font-size: .4rem;
        color: #627385;
        position: relative;
        height: 4.5rem;
        
        .title {
            line-height: 1.2rem;
            height: 1.2rem;
            border-bottom: 1px solid #d1d1d1;
            position: relative;
            padding: 0 .25rem;
            span {
                position: absolute;
                right: .25rem;
                font-size: .35rem;
            }
        }
        .jianjie {
            padding: .25rem;
            padding-top: .25rem;
            line-height: .7rem;
        }
        .remove {
            position: absolute;
            width: 100%;
            height: 4.5rem;
            top: 0;
            left: 0;
            text-align: center;
            background: rgba(0, 0, 0, .3);
            display: none;
            button {
                background: #4C5867;
                width: 1.2rem;
                height: .7rem;
                border: none;
                color: #fff;
                font-size: .35rem;
                border-radius: .1rem;
                margin-top: 2rem;
                box-shadow: 0 0 .2rem rgba(0,0,0,.5);
            }
        }
    }
</style>

<template>
    <div class="box" :style="{'background-image' : `url(${bg.notice})`}">
        <my-box title="最新公告">
            <div class="notice-box" ref="noticeBox" :class="{app: app}"  @touchstart="start" @touchend="end" @touchmove="end">
                <div ref="notice">
                    <div class="list" 
                        v-for="(item, index) in notice.read" :key="index"
                        @click="push({name: 'noticeContent', params: {id: item.id}})">
                        <my-fankui setbg="rgba(0,0,0,.1)">
                            <div class="title">{{item.title | slice}} <span>{{item.otime | time}}</span></div>
                            <div class="jianjie">{{item.content | jieStr}}</div>
                            <div class="remove" @touchstart.stop.prevent="hide($event)">
                                <button @touchstart.stop="remove($event, item.id)">删除</button>
                            </div>
                        </my-fankui>
                    </div>
                </div>
            </div>
        </my-box>
        <router-view></router-view>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    import myBg from './public/Bg.vue'
    import myBox from './public/CommonBox.vue'
    import myFankui from './public/NewFankui.vue'
    import fn from '../assets/fn'
    const { buWei } = fn;
    export default {
        name: 'notice',
        components: {myBg, myBox, myFankui},
        computed: {
            ...mapState(['notice', 'app', 'bg'])
        },
        filters: {
            slice(value) {
                return value.length < 10 ? value : value.slice(0, 10) + '...';
            },
            time(value) {
                const oTime = new Date(value);
                return `${oTime.getFullYear()}-${buWei(oTime.getMonth()+1)}-${buWei(oTime.getDate())}`
            },
            jieStr(value) {
                return value.length > 70 ? value.slice(0, 70) + '……' : value
            }
        },
        methods: {
            ...mapMutations(['readNotice', 'removeNotice']),
            push(data) {
                clearTimeout(this.time);
                this.pushonoff && this.$router.push(data);
            },
            end() {
                clearTimeout(this.time);
            },
            start(ev) {
                if(this.pushonoff === false) {
                    this.pushonoff = true;
                    const notice = this.$refs.notice;
                    const aRemove = notice.querySelectorAll('.remove');
                    for(let i=0; i<aRemove.length; i++) {
                        aRemove[i].style.display = 'none';
                    }
                }
                this.time = setTimeout(() => {
                    let oE = ev.target;
                    while(oE && oE.className !== 'list') {
                        oE = oE.parentNode;
                    }
                    if(oE) {
                        const oRemove = oE.querySelector('.remove');
                        oRemove.style.display = 'block';
                        this.pushonoff = false;
                    }
                }, 500);
            },
            remove(ev, id) {
                ev.target.parentNode.style.display = 'none';
                this.removeNotice(id);
            },
            hide(ev) {
                ev.target.style.display = 'none';
            }
        },
        data() {
            return {
                time: null,
                pushonoff: true
            }
        },
        activated() {
            this.readNotice();
            
            setTimeout(() => {
                const { noticeBox, notice } = this.$refs;
                
                const [boxH, H, boxPB] = [
                    parseFloat(getComputedStyle(noticeBox).height), 
                    parseFloat(getComputedStyle(notice).height), 
                    parseFloat(getComputedStyle(noticeBox).paddingBottom)
                ];
            
                noticeBox.scrollTop = H-boxH + boxPB;
            }, 60)
        }
    }
</script>
