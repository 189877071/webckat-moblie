<style scoped lang="scss">
    .box-32fgfg {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        background-color: #fff;
        background-size: 100% 100%;
    }

    .chat-box {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;

        &.app {
            .header {
                padding-top: .66rem;
                .router {
                    top: .66rem;
                }
            }
            .content {
                top: 1.66rem;
            }
        }
    }

    .header {
        height: 1rem;
        font-size: .4rem;
        font-weight: 500;
        background: #627385;
        color: #fff;
        .router {
            position: absolute;
            top: 0;
            width: 1rem;
            line-height: 1rem;
            text-align: center;
            color: #fff;
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

    .message-box {
        flex: 1;
        position: relative;
        overflow: hidden;
    }

    .message-list-box {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 0;
        }

        ul.list-box {
            padding-top: 1.2rem;
        }

        li {
            padding-bottom: .5rem;
            position: relative;
            .imgbox {
                position: absolute;
                width: 1.2rem;
                height: 1.2rem;
                top: .4rem;
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .time, .state {
                text-align: center;
                font-size: .3rem;
                color: #666;
                height: .3rem;
                line-height: .3rem;
                position: absolute;
                width: 100%;
            }
            .time span{
                color: #000;
                background: #fff;
                
            }
            .state {
                box-sizing: border-box;
                padding-right: .3rem;
                text-align: right;
                &.err {
                    color: #FF4747;
                    text-shadow: 0 0 .1rem rgba(255,133,10,.5);
                }
                &.send {
                    color: #627385;
                    text-shadow: 0 0 .1rem rgba(123,98,131,.5);
                }
            }
            .chatlist {
                padding: .2rem;
                border-radius: .2rem;
                font-size: .4rem;
                margin-top: .5rem;
                word-wrap: break-word;
                position: relative;
            }
        }

        .zhengdong {
            width: 1.8rem;
            height: 1.8rem;
            line-height: 2rem;
            text-align: center;
            i {
                font-size: 1.5rem;
                color: #627385;
            }
        }

        .image {
            width: 4rem;
            height: auto;
        }

        .rm {
            position: absolute;
            top: -1.6rem;
            right: -.6rem;
            text-align: center;
            font-size: .3rem;
            display: none;
            .rm-content {
                background: rgba(0,0,0, .8);
                border-radius: .2rem;
                padding: .1rem 0 .2rem 0;
                text-align: center;
                width: 1.6rem;
                color: #fff;
                box-shadow: 0 0 .2rem rgba(0,0,0,.3);
                i {
                    display: block;
                    height: .7rem;
                    line-height: .7rem;
                    font-size: .5rem;
                }
                span {
                    display: block;
                    font-size: .3rem;
                    line-height: .3rem;
                    height: .3rem;
                }
            }
            .rm-bottom {
                width: 15px;
                height: 7px;
                background: rgba(0,0,0,.8);
                clip-path: polygon(0 0, 15px 0, 7px 7px);
                margin: 0 auto;
                vertical-align: top;
            }
        }
            
        .oaudio {
            i.iconfont {
                font-size: .6rem;
                display: inline-block;
                vertical-align: middle;
                color: #A7B3BE;
            }
            .iconbox {
                display: inline-block;
                height: 1rem;
                margin-left: .3rem;
                vertical-align: middle;
                div {
                    display: inline-block;
                    float: left;
                    overflow: hidden;
                    border-left: 2px solid #A7B3BE;
                    &:nth-of-type(1) {
                        width: .3rem;   
                        height: .8rem;
                        margin-top: .1rem;
                        border-radius: 50%;
                    }
                    &:nth-of-type(2) {
                        width: .25rem;
                        height: .6rem;
                        margin-top: .2rem;
                        border-radius: 50%;
                    }
                    &:nth-of-type(3) {
                        width: .2rem;
                        height: .4rem;
                        margin-top: .3rem;
                        border-radius: 50%;
                    }
                }
            }
        }

        .he {
            .imgbox {
                left: .2rem;
                border: 1px solid #C2C2C2;
            }
            .chatlist {
                float: left;
                margin-left: 1.5rem;
                margin-right: 1rem;
                color: #000;
                background: rgba(255,255,255,.4);
                border: 1px solid #C2C2C2;
            }
            .oaudio .iconbox {
                margin-left: 0;
                margin-right: .3rem;
            }
            .oaudio .iconbox div {
                border-left: none;
                border-right: 2px solid #A7B3BE;
                &:nth-of-type(1) {
                    width: .2rem;
                    height: .4rem;
                    margin-top: .3rem;
                }
                &:nth-of-type(2) {
                    width: .25rem;
                    height: .6rem;
                    margin-top: .2rem;
                }
                &:nth-of-type(3) {
                    width: .3rem;   
                    height: .8rem;
                    margin-top: .1rem;
                }
            }
        }

        .mi {
            .imgbox {
                right: .2rem;
                border: 1px solid #96A3A6;
            }
            .chatlist {
                float: right;
                margin-left: 1rem;
                margin-right: 1.5rem;
                color: #251706;
                background: rgba(222,216,218,.8);
                border: 1px solid #96A3A6;
            }
        }
    }


    .editor-box {  
            
        .col-1 {
            position: relative;
            .editor-fb {
                position: absolute;
                z-index: -1;
                min-height: .5rem;
                line-height: .5rem;
                max-height: 2.5rem;
                bottom: 0;
                left: .2rem;
                opacity: 0;
                width: 7.4rem;
                font-size: .4rem;
                
                white-space: pre-wrap;
            }
            .editor-hffd {
                padding: .2rem .2rem;
                background: #fff;
                width: 7.4rem;
                border-radius: .1rem;
                margin-left: .2rem;
                &.showkey {
                    background: #f0f1f6;
                }
            }
            .editor {
                width: 100%;
                font-size: .4rem;
                line-height: .5rem;
                display: block;
                border: none;
                height: .5rem;
                resize: none;
                background: none;
            }
            .send {
                border: none;
                width: 1.6rem;
                position: absolute;
                right: .2rem;
                bottom: 0;
                height: 1rem;
                background: #A7B3BE;
                color: #fff;
                border-radius: .1rem;
                &.send-ok {
                    background: #627385;
                }
            }
        }

        .col-2 {
            display: flex;
            line-height: 1rem;
            height: 1rem;
            padding-bottom: .1rem;
            div {
                flex: 1;
                text-align: center;
                i.iconfont {
                    font-size: .7rem;
                    color: #627385;
                    font-weight: bold;
                }
                &.active {
                    i {                        
                        color: #e50000;
                    }
                }
                &.fileimg {
                    position: relative;
                    input {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                        z-index: 1;
                    }
                }
            }
        }
    }

    .biaoqinbao-list {
        background: rgba(255,255,255, .5);
        position: relative;
        border-top: 1px solid #eee;
        display: flex;
        flex-wrap: wrap;
        height: 5.68rem;
        overflow-x: hidden;
        overflow-y: auto;
        img.list {
            width: .9rem;
            height: .9rem;
            padding: .26rem;
        }
    }

    .audio-box {
        border-top: 1px solid #eee;
        height: 5.68rem;
        background: rgba(255,255,255, .5);
        position: relative;
        .anzhushuohua, .send-yuyin {
            text-align: center;
            font-size: .4rem;
            color: #627385;
        }
        .anzhu-title, .anzhu-time {
            height: 1.2rem;
            line-height: 1.2rem;
            padding-top: .5rem;
        }
        .anzhu-time {
            strong {
                font-weight: 500;
            }
            span {
                width: .8rem;
                display: inline-block;
                vertical-align: middle;
                border-bottom: 2px dotted rgb(230, 126, 8);
            }
        }
        .anzhu-icon {
            height: 3rem;
            width: 3rem;
            line-height: 3rem;
            background: #627385;
            color: #fff;
            border-radius: 50%;
            box-shadow: 0 0 .2rem rgba(0,0,0,.3);
            transition: transform .2s;
            margin: 0 auto;
            i {
                font-size: 2rem;
            }
        }
        .send-text {
            height: 1.5rem;
            line-height: 1.5rem;
            padding-top: 1rem;
            span {
                color: #f00;  
                padding: 0 .1rem;  
            }
        }

        .send-btn {
            button {
                border: none;
                background: #627385;
                color: #fff;
                height: 1rem;
                padding: 0 .3rem;
                border-radius: .1rem;
                margin: 0 .1rem;
                box-shadow: 0 0 .2rem rgba(0,0,0,.3);
                font-size: .4rem;
            }
        }
        .audio-mask {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background: rgba(255,255,255,.3);
            font-size: .5rem;
            text-align: center;
            line-height: 5.68rem;
            color: #627385;
        }
    }

    .ynimg {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: #000;
        z-index: 5;
        text-align: center;
        img {
            width: 80%;
        }
    }
</style>

<template>
    <transition name="translate" @after-enter="setInit">
        <div class="translate3d box-32fgfg" ref="box" :style="{'background-image' : keyboard ? 'none' : `url(${bg.chat})`}">
            <div class="chat-box" :class="{app: app}">
                <!-- 头部 完成 -->
                <div class="header">
                    <div class="router left" @touchend.stop="back"><i class="iconfont icon-fanhui"></i></div>
                    <div class="title">{{userdata.name ? userdata.name : userdata.username}}</div>
                    <div class="state">{{userdata.login ? '在线' : '离线'}}</div>
                    <div class="router right" @touchend="setUserInfor"><i class="iconfont icon-xingming"></i></div>
                </div>
                <!-- 消息列表 -->
                <div class="message-box" ref="messageBox"  @touchstart="hideRm">
                    <div class="message-list-box" ref="messageListBox">
                        <ul class="list-box" v-if="init" ref="list">
                            <li 
                                class="clearfix" 
                                :class="{he: item.launch == 'he', mi: item.launch == 'mi'}" 
                                v-for="(item, index) in messageList" 
                                :key="index">
                                <div class="imgbox">
                                    <img :src="(item.launch == 'mi' ? active.headphoto : userdata.headphoto)" alt="">
                                </div>
                                <div class="time"><span>{{item.time | analysisTime(index, messageList)}}</span></div>
                                <div class="state err">{{item.err ? '发送失败' : ''}}</div>
                                <div class="chatlist" @touchstart="showRm($event)" @touchend="showRmEnd">

                                    <div v-if="item.otype === 'message'" v-html="item.content"></div>

                                    <div v-if="item.otype === 'shock'" class="zhengdong"><i class="iconfont icon-llrandomshake"></i></div>
                                    
                                    <img class="image" alt=" "
                                        @click="previewImage(item.launch == 'mi' ? item.content : hostname + item.content)" 
                                        v-if="item.otype === 'image'"
                                        :src="item.launch == 'mi' ? item.content : hostname + item.content">
                                    
                                    <div v-if="item.otype === 'voice'" class="oaudio" @click="playYuyin($event, item.launch, item.content)">
                                        <i v-if="item.launch != 'mi'" class="iconfont icon-yuyin"></i>
                                        <div class="iconbox">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <i v-if="item.launch == 'mi'" class="iconfont icon-yuyin"></i>
                                    </div>

                                    <div class="rm" @touchstart.stop="rmList($route.params.id, index)">
                                        <div class="rm-content">
                                            <i class="iconfont icon-shanchu"></i>
                                            <span>删除</span>
                                        </div>
                                        <div class="rm-bottom"></div>
                                    </div>

                                </div>
                            </li>
                            
                            <li class="clearfix mi" v-if="preMessage.show">
                                <div class="imgbox">
                                    <img :src="active.headphoto" alt="">
                                </div>
                                <div class="state send">正在发送</div>
                                <div class="chatlist">
                                    <div v-if="preMessage.otype === 'message'" v-html="preMessage.content"></div>

                                    <div v-if="preMessage.otype === 'shock'" class="zhengdong"><i class="iconfont icon-llrandomshake"></i></div>

                                    <img @click="previewImage(preMessage.content)" v-if="preMessage.otype === 'image'" :src="preMessage.content" class="image" alt="">

                                    <div v-if="preMessage.otype === 'voice'" class="oaudio" @click="playYuyin($event, 'mi', preMessage.content)">
                                        <div class="iconbox">
                                            <div></div>
                                            <div></div>
                                            <div></div>
                                        </div>
                                        <i class="iconfont icon-yuyin"></i>
                                    </div>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 编辑器 -->
                <div class="editor-box">
                    <div class="col-1 clearfix">
                        <!-- <div class="editor" :class="{showkey: keyboard}" contenteditable="true" ref="content"></div> -->
                        <pre class="editor-fb" ref="fb"></pre>
                        <div class="editor-hffd" :class="{showkey: keyboard}">
                            <textarea class="editor" @keydown="down($event)" ref="content" ></textarea>
                        </div>
                        <!-- <input type="text" class="editor" ref="content" :class="{showkey: keyboard}"> -->
                        <button type="button" class="send" :class="{'send-ok': sendOk}" @touchstart.stop.prevent="messageSend">发送</button>
                    </div>
                    
                    <div class="col-2 clearfix">
                        <div :class="{active: !keyboard && editor.audio}" @touchend="editorShow('audio')"><i class="iconfont icon-yuyin"></i></div>
                        <div :class="{active: !keyboard && editor.biaoqinbao}" @touchend="editorShow('biaoqinbao')"><i class="iconfont icon-biaoqing"></i></div>
                        <div @touchend="shock"><i class="iconfont icon-llrandomshake"></i></div>

                        <div v-if="app" @touchend="getImage"><i class="iconfont icon-tupian"></i></div>
                        <div class="fileimg" v-if="!app">
                            <input type="file" ref="inputImage" accept="image/*" @change="pcgetImage">
                            <i class="iconfont icon-tupian"></i>
                        </div>
                        <div @touchend="webRTCChat"><i class="iconfont icon-shexiangtou"></i></div>
                    </div>

                    <div class="biaoqinbao-box" v-if="!keyboard && editor.biaoqinbao">
                        <div class="biaoqinbao-list">
                            <img class="list" @click="addImage(item.name)" :src="item.src" v-for="(item, index) in bqb" :key="index" alt="">
                        </div>
                    </div>

                    <div class="audio-box" v-if="!keyboard && editor.audio">
                        <div class="anzhushuohua" v-if="app && !showSendYuyin">
                            <div class="anzhu-title" v-if="!showYuyinTime">按住说话</div>
                            <div class="anzhu-time" v-if="showYuyinTime">
                                <span></span>
                                <strong>{{yuyinTime | yuyinTime}}</strong>
                                <span></span>
                            </div>
                            <div class="anzhu-icon"
                                ref="anzhu"
                                @touchstart="startyuyin"
                                @transitionend="transitionyuyin"
                                @touchend="endyuyin">
                                <i class="iconfont icon-yuyin"></i>
                            </div>  
                        </div>
                        <div class="send-yuyin" v-if="app && showSendYuyin">
                            <div class="send-text">…… 语音还有<span>{{sendyyTime}}</span>秒发送 ……</div>
                            <div class="send-btn">
                                <button @touchend="yuyinsend">立即发送</button>
                                <button @touchend="quxiaoYuyinSend">取消</button>
                            </div>
                        </div>
                        <div class="audio-mask" v-if="!app">抱歉浏览器下无法使用语音功能</div>
                    </div>
                </div>
            </div>

            <router-view></router-view>

            <transition name="opacity">
                <div class="ynimg" @click="yullangImg = ''" ref="ynimg" v-if="yullangImg">
                    <img :src="yullangImg" alt="">
                </div>
            </transition>

            <my-load v-if="mask" title="图片正在发送中…"></my-load>
        </div>
    </transition>
</template>
<script>
    import { mapMutations, mapGetters, mapState } from 'vuex'
    import fn from '../assets/fn'
    import config from '../assets/config'
    import myBg from './public/SlotBg.vue'
    import myLoad from './public/SubmitLoad.vue'
    const { url, axios } = config;
    const { 
        buWei, 
        bqbReplace, 
        vibrate, 
        toast, 
        handleImage, 
        getCookie, 
        pack, 
        zipImg, 
        updloadImage, 
        pcUploader, 
        startLuyin, 
        endLuyin,
        AppPlayYuyin,
        borwserPlayYuyin,
        openBrowesr,
        getVerify } =  fn;
    const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
  
    export default {
        name: 'Chat',
        components: { myBg, myLoad },
        methods: {
            ...mapMutations(['updateMessage', 'rmMessage', 'setChatId', 'setRTC']),
            setInit(){
                this.init = true;
            },
            // 发送消息
            messageSend() {
                let { content, fb } = this.$refs;

                content.focus();

                let contentval = content.value.replace(/&|=/g, ' ').trim();
                
                
                if(!contentval) return;
    
                content.value = '';
                
                fb.innerHTML = '';
                
                content.style.height = getComputedStyle(fb).height;
                
                this.sendOk = false;

                this.preMessage = {
                    show: true,
                    content: bqbReplace(contentval, this.bqb),
                    otype: 'message'
                }
               
                this.send(contentval, 'message');
            },
            // 发送
            send(content, otype, data) {
                axios.post(url.message, { content, heid: this.$route.params.id, otype }).then(results => {
                    const { data: { success } } = results;
                    this.preMessage = {show: false, content: '', otype: ''};
                    this.updateMessage({id: this.$route.params.id, content: data ? data : content, err: !success, otype});
                });
            },
            // 显示删除消息按钮
            showRm(ev) {
                this.showRmTime = setTimeout(() => {
                    let target = ev.target;
                    let onoff = true;
                    while(target && onoff) {
                        if(target && target.className == 'chatlist') {
                            onoff = false;
                        }else {
                            target = target.parentNode;
                        }
                    }
                    if(!target) return;
                    const rm = target.querySelector('.rm');
                    rm && (rm.style.display = 'block');
                }, 500);
            },
            // 取消消息按钮定时器
            showRmEnd() {
                clearTimeout(this.showRmTime);
            },
            // 隐藏消息按钮
            hideRm() {
                const arm = document.querySelectorAll('.rm');
                for(let i=0; i<arm.length; i++) {
                    arm[i].style.display = 'none';
                }
                this.$refs.content.blur();
            },
            // 删除消息
            rmList(id, index) {
                this.rmonoff = true;
                this.rmMessage({id, index});
                this.hideRm();
            },
            // 转跳到用户信息页面
            setUserInfor() {
                this.$router.push(this.$route.path + '/infor');
            },
            // 返回
            back() {
                if(this.keyboard) {
                    this.$refs.content.blur();
                    return;
                }
                // back(); 
                history.back();
            },
            // 显示最底部消息
            setListScrollTop() {
                setTimeout(() => {
                    const { messageListBox, list } = this.$refs;
                    if(!list) return;
                    messageListBox.scrollTop = messageListBox.scrollHeight - messageListBox.clientHeight;
                }, 30);
            },
            // 监听输入框键盘事件 用来设置输入框高度
            down(ev) {
                requestAnimationFrame(() => {
                    const { content, fb } = this.$refs;
                    fb.innerHTML = content.value;
                    this.sendOk = content.value !== '' ?true : false;
                    content.style.height = getComputedStyle(fb).height;
                    content.scrollTop = content.scrollHeight - content.clientHeight;
                })
            },
            // 显示 表情包 或者 语言
            editorShow(key) {
                requestAnimationFrame(() => {
                    for(let k in this.editor) {
                        this.editor[k] = (key === k) ? ( this.editor[k] ? false : true) : false;
                    }
                })
            },
            // 添加图片
            addImage(name) {
                this.$refs.content.value += `{{${name}}}`;
                this.sendOk = true;
            },
            // 设置消息窗口高度
            setContentHeight() {
                const {messageListBox, messageBox} = this.$refs;
                messageListBox.style.height = getComputedStyle(messageBox).height;
            },
            // 震动
            shock() {
                if(Date.now() - this.shockTime < 60000) {
                    toast('请勿频繁发送震动提示！');
                    return;
                }

                this.preMessage = {
                    show: true,
                    content: '',
                    otype: 'shock'
                }
                
                this.shockTime = Date.now();

                vibrate();

                this.send('', 'shock');
            },
            // 预览图片
            previewImage(urls) {
                if(this.app) {
                    plus.nativeUI.previewImage([urls]);
                }
                else {
                    this.yullangImg = urls;
                }
            },
            // 发送图片
            getImage() {
                pack().then(zipImg).then(url => {
                    this.preMessage = {show: true, content: url, otype: 'image'};
                    // 先上传到后台，后台返回保存地址，然后发给对方
                    updloadImage(url).then(result => {
                        if(!result || !result.success) {
                            this.preMessage = {show: false, content: '', otype: ''};
                            this.updateMessage({id: this.$route.params.id, content: url, err: true, otype: 'image'});
                            return;
                        }
                        this.send(result.content, 'image', url);
                    })
                })
            },
            pcgetImage() {
                this.mask = true;
                handleImage(this.$refs.inputImage.files[0], {maxW: 500}).then(pcUploader).then(result => {
                    if(!result || !result.success) {
                        alert('图片发送失败');
                        this.mask = false;
                        return;
                    }
                    const content = result.content;
                    axios.post(url.message, { content, heid: this.$route.params.id, otype: 'image' }).then(result => {
                        const { data: { success } } = result;
                        if(!success) {
                            alert('图片发送失败');
                            this.mask = false;
                            return;
                        }
                        this.updateMessage({id: this.$route.params.id, content: url.hostname + content, err: false, otype: 'image'});
                        this.mask = false;
                    });
                });
            },
            // 语音 开始录音
            startyuyin() {
                this.$refs.anzhu.style.transform = 'scale(.7)';
                this.yuyinTime = 0;
                this.showYuyinTime = true;
                clearInterval(this.yuyinTimeOnoff);
                this.yuyinTimeOnoff = setInterval(() => {
                    ++this.yuyinTime;
                }, 1000);
                startLuyin().then(p => this.luyinUrl = p);
            },
            transitionyuyin() {
                this.$refs.anzhu.style.transform = 'scale(1)';
            },
            endyuyin() {
                clearInterval(this.yuyinTimeOnoff);

                this.showYuyinTime = false;

                if(this.yuyinTime < 1) {
                    toast('说话时间太短');
                    return;
                }
                
                this.showSendYuyin = true;
                this.sendyyTime = 3;
                this.sendyyTimeOnoff = setInterval(() => {
                    --this.sendyyTime;
                    if(this.sendyyTime <= 0) {
                        this.yuyinsend();
                    }
                }, 1000);
                endLuyin();
            },
            // 取消语音发送
            quxiaoYuyinSend() {
                clearInterval(this.sendyyTimeOnoff);
                this.showSendYuyin = false;
            },
            // 发送语音
            yuyinsend() {
                this.quxiaoYuyinSend();
                if(!this.luyinUrl) return;
                let content = this.luyinUrl;
                this.preMessage = {show: true, content, otype: 'voice'};
                updloadImage(this.luyinUrl).then(result => {
                    if(!result || !result.success) {
                        this.preMessage = {show: false, content: '', otype: ''};
                        this.updateMessage({id: this.$route.params.id, content, err: true, otype: 'voice'});
                        return;
                    }
                    this.send(result.content, 'voice', content);
                });
                this.luyinUrl = '';
            },
            // 播放语音
            playYuyin(ev, f, content) {
                let oYuyin = ev.target;
                while(oYuyin && !oYuyin.classList.contains('oaudio') ) {
                    oYuyin = oYuyin.parentNode;
                }
                
                if(!oYuyin) return;

                let [aDiv, oI, num, color1, color2] = [
                    oYuyin.querySelector('.iconbox').querySelectorAll('div'),
                    oYuyin.querySelector('i'),
                    0,
                    '#A7B3BE',
                    '#627385'
                ];
                let [div1, div2, div3, huidiao] = [
                    aDiv[f == 'mi' ? 0 : 2],
                    aDiv[1],
                    aDiv[f == 'mi' ? 2 : 0],
                    () => {
                        clearInterval(this.palyDivTime);
                        div1.style.borderColor = color1;
                        div2.style.borderColor = color1;
                        div3.style.borderColor = color1;
                        oI.style.color = color1;
                    }
                ]
                oI.style.color = color2;
                clearInterval(this.palyDivTime);
                if(this.oddYuyin.oI) {
                    try {
                        this.oddYuyin.oI.style.borderColor = color1;
                        this.oddYuyin.div1.style.borderColor = color1;
                        this.oddYuyin.div2.style.borderColor = color1;
                        this.oddYuyin.div3.style.borderColor = color1;
                    } catch(e) {}
                }
                this.oddYuyin = { oI, div1, div2, div3 }

                this.palyDivTime = setInterval(() => {
                    let i = num % 4;
                    if(i == 3) {
                        div1.style.borderColor = color2;
                        div2.style.borderColor = color2;
                        div3.style.borderColor = color2;
                    }
                    else if(i == 2) {
                        div1.style.borderColor = color1;
                        div2.style.borderColor = color2;
                        div3.style.borderColor = color2;
                    }
                    else if(i == 1) {
                        div1.style.borderColor = color1;
                        div2.style.borderColor = color1;
                        div3.style.borderColor = color2;
                    }
                    else {
                        div1.style.borderColor = color1;
                        div2.style.borderColor = color1;
                        div3.style.borderColor = color1;
                    }
                    num++;
                }, 300);
                
                if(f == 'mi') {
                    AppPlayYuyin(content).then(huidiao);
                }
                else {
                    borwserPlayYuyin(content).then(huidiao);
                }
            },
            // 请求视频通话
            webRTCChat() {
                if(this.app) {
                    alert('抱歉！因为在 WebView 环境下不支持 WebRTC,所以无法实现视频通话功能！可以在PC端使用谷歌浏览器体验效果！');
                    return;
                }
                this.setRTC({
                    key: getVerify(20), 
                    sendid: this.$route.params.id, 
                    state: 1, 
                    miid: this.active.id,
                    rtcurl: url.rtcurl,
                    socketurl: url.socket
                });
            }
        },
        computed: {
            ...mapGetters(['getUserMessage', 'getUser']),
            ...mapState(['active', 'app', 'bg', 'keyboard', 'bqb', 'hostname', 'socketInfor']),
            // 消息列表
            messageList() {
                return this.getUserMessage(this.$route.params.id);
            },
            userdata() {
                return this.getUser(this.$route.params.id);
            }
        },
        filters: {
            analysisTime(value, index, messageList) {
                
                if(messageList[index -1] && value - messageList[index -1].time < 1800000) {
                    return '';
                }
                
                const time = new Date(value);
                const activeTime = new Date();
                const fullYear = time.getFullYear() === activeTime.getFullYear() ? '' : time.getFullYear()+'-';
                return `${fullYear}${buWei(time.getMonth()+1)}-${buWei(time.getDate())} ${buWei(time.getHours())}:${buWei(time.getMinutes())}`;
            },
            yuyinTime(t) {
                if(t <= 0) {
                    return '0:00'
                }
                if(t < 10)  {
                    return '0:0' + t;
                }
                if(t < 60) {
                    return '0:' + t;
                }
                var miao = t % 60;
                return Math.floor(t / 60) + ':' + (miao < 10 ? '0' + miao : miao);
            }
        },
        watch: {
            messageList(val) {
                if(!this.rmonoff) {
                    this.setListScrollTop();
                }
                else {
                    this.rmonoff = false;
                }
            },
            init(val) {
                if(val) this.setListScrollTop();
            },
            preMessage(val) {
                if(val.show) {
                    this.setListScrollTop();
                }
            },
            keyboard(val) {
                if(val) {
                    for(let k in this.editor) {
                        this.editor[k] = false;
                    } 
                }
                requestAnimationFrame(() => {
                    this.setContentHeight();
                    this.setListScrollTop();
                });
            },
            'editor.biaoqinbao'() {
                requestAnimationFrame(() => {
                    this.setContentHeight();
                    this.setListScrollTop();
                });
            },
            'editor.audio'() {
                requestAnimationFrame(() => {
                    this.setContentHeight();
                    this.setListScrollTop();
                });
            },
            yullangImg(val) {
                if(!val) return;
                requestAnimationFrame(() => {
                    var ynimg = this.$refs.ynimg;
                    var img = ynimg.querySelector('img');
                    var top = (window.innerHeight - img.height) / 2 ;
                    if(top < 0) {
                        top = 0;
                    }
                    img.style.marginTop = top + 'px';
                })
            }
        },
        data() {
            return {
                preMessage: {show: false,content: '',otype: ''},
                showRmTime: null,
                userInfor: false,
                init: false,
                sendOk: false,
                editor: {biaoqinbao: false,audio: false},
                focusTime: null,
                editorTime: null,
                rmonoff: false,
                editorHeight: 0,
                shockTime: 0,
                yullangImg: '',
                mask: false,
                showYuyinTime: false,
                showSendYuyin: false,
                yuyinTime: 0,
                yuyinTimeOnoff: null,
                sendyyTime: 3,
                sendyyTimeOnoff: null,
                luyinUrl: '',
                palyDivTime: null,
                oddYuyin: {div1: null,div2: null,div3: null,oI: null},
                b: false
            }
        },
        mounted() {
            this.setChatId(this.$route.params.id);
            this.setContentHeight();
            setTimeout(() => {
                if(this.init) return;
                this.setInit();
            }, 1000);
        },
        destroyed() {
            this.setChatId(false);
        }
    }
</script>
