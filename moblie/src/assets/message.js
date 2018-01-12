import router from '../router'

import store from '../store'

import config from './config'

const { url, axios } = config;

const controller = {
    // 初始化信息
    init(data) {
        store.dispatch('init', data.infor);
    },
    // 在其他地方登录需要当前用户退出
    elsewhereLogin(data) {
        alert('账户在其他地方登录,你被迫退出');
        store.dispatch('elsewhereLogin');
    },
    // 有人登录了
    userlogin(data) {
        store.commit('userlogin', data.id);
    },
    // 有人退出了
    userexit(data) {
        store.commit('userexit', data.id);
    },
    // 消息
    message(data) {
        store.dispatch('messagePro', data);
    },
    // 新公告
    newnotice(data) {
        store.dispatch('addUnReadNotice', data);
    },
    rtcchat(data) {
        store.dispatch('resRTC', data.infor);
    },
    jujue(data) {
        alert('对方拒绝了你的请求');
        store.commit('setRTC', null);
    },
    guaduan(data) {
        store.commit('setRTC', null);
    }
}

export default function (data) {
    controller[data.controller] && controller[data.controller](data);
}