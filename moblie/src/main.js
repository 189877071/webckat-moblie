import './assets/fastClick'
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './components/App.vue'
import dataBase from './assets/dataBase'
import config from './assets/config'
import message from './assets/message'
import { back } from './assets/common'

function deviceready() {
    document.documentElement.style.fontSize = window.innerWidth / 10 + 'px';

    // 预加载背景图片
    for(let key in  config.bg) {
        let oImg = new Image();
        oImg.src = config.bg[key];
    }

    io(config.url.socket).on('message', message);
    
    new Vue({
        el: '#app',
        router,
        store,
        template: `<App />`,
        components: { App }
    });
}

// process.env.ACTIVE === 'application' 为 app端
// process.env.ACTIVE === 'browser' 为 浏览器端
if(process.env.ACTIVE === 'application') {
    document.addEventListener('plusready', () => {
        deviceready();
        plus.key.addEventListener('backbutton', back, false);
        let h = window.innerHeight;
        window.addEventListener('resize', () => {
            store.commit('setKeyboard', window.innerHeight < h);
            h = window.innerHeight;
        }, false);

        // 切换到前台
        document.addEventListener("resume", () => store.commit('setAppShow', true), false);
        // 切换到后台
        document.addEventListener("pause", () => store.commit('setAppShow', false), false);
        // 点击消息通知
        plus.push.addEventListener("click", function(msg) {
            console.log(msg.payload)
            //清空掉所有消息
            plus.push.clear();
            // 转跳到消息页面
            location.hash = msg.payload;
        }, false);
    }, false);

}
else {
    window.addEventListener('resize', () => document.documentElement.style.fontSize = window.innerWidth / 10 + 'px');
    window.onload = deviceready;
    window.guaduan = function() {
        store.commit('setRTC', null);
    }
}


