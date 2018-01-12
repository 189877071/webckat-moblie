import Vue from 'vue'

import Vuex from 'vuex'

import config from "../assets/config";

import dataBase from '../assets/dataBase';

import fn from '../assets/fn'

// 数据库名称: IDBPrefix + state.active.username
const { getAllMessage, getAllNotice, putMessage, removeMessage, putNotice, removeNotice } = dataBase;

const { axios, url, IDBPrefix, bg } = config;

Vue.use(Vuex);

function recMessage(state, { sendid, content, otype }) {

    const data = { time: Date.now(), content: fn.bqbReplace(content, state.bqb), launch: 'he', err: false, otype };

    const key = state.chatId == sendid ? 'read' : 'unread';

    for (let i = 0; i < state.message.length; i++) {
        if (state.message[i].id != sendid) continue;
        state.message[i][key].push(data);
        putMessage(IDBPrefix + state.active.username, state.message[i]);
        return;
    }

    let newMessage = { id: sendid, read: [], unread: [] };

    newMessage[key].push(data);

    state.message.push(newMessage);

    putMessage(IDBPrefix + state.active.username, newMessage);
}

let bqb = [];

for (let i = 1; i < 64; i++) {
    bqb.push({ src: 'static/image/biaoqing/' + i + '.png', name: 'image' + i });
}

export default new Vuex.Store({
    state: {
        appshow: true,
        hostname: url.hostname,
        keyboard: false,
        bg: bg,
        app: (process.env.ACTIVE === 'application') ? true : false,
        init: false,
        isLogin: true,
        users: [],
        socketInfor: null,
        active: {},
        chatId: false,
        message: [],
        audio: localStorage.getItem('audio'),
        notice: { read: [], unread: [] },
        headphoto: false,
        RTC: null,
        bqb // 表情包
    },
    getters: {
        getUserMessage: state => id => {
            for (let i = 0; i < state.message.length; i++) {
                if (state.message[i].id == id) return state.message[i].read;
            }
            return [];
        },
        getUser: state => id => {
            if (!id) return {};
            for (let i = 0; i < state.users.length; i++) {

                for (let j = 0; j < state.users[i].onLineUser.length; j++) {
                    if (state.users[i].onLineUser[j].id == id) return { ...state.users[i].onLineUser[j], login: true };
                }

                for (let j = 0; j < state.users[i].offLineUser.length; j++) {
                    if (state.users[i].offLineUser[j].id == id) return state.users[i].offLineUser[j];
                }
            }

            return {};
        },
        getClass: state => id => {
            for (let i = 0; i < state.users.length; i++) {
                if (state.users[i].id == id) {
                    return state.users[i].title;
                }
            }

            return '';
        },
        getSearch: state => text => {
            let arr = { off: [], on: [] };
            if (!text) return arr;
            state.users.forEach(item => {
                item.onLineUser.forEach(item => {
                    if ((item.name && item.name.search(text) !== -1) || item.username.search(text) !== -1) {
                        arr.on.push(item);
                    }
                });

                item.offLineUser.forEach(item => {
                    if ((item.name && item.name.search(text) !== -1) || item.username.search(text) !== -1) {
                        arr.off.push(item);
                    }
                });
            });

            return arr;
        },
        getUnreadMessage: state => {
            let num = 0;
            state.message.forEach(item => {
                num += item.unread.length;
            });

            return num;
        }
    },
    mutations: {
        setAppShow(state, bool) {
            state.appshow = bool;
        },
        showHeadPhoto(state, bool) {
            state.headphoto = bool;
        },
        setKeyboard(state, booler) {
            state.keyboard = booler;
        },
        setBg(state, { key, dataUrl }) {
            state.bg[key] = dataUrl;
        },
        setInit(state, bool) {
            state.init = bool;
        },
        setSocketInfor(state, infor) {
            state.socketInfor = infor;
        },
        setLogin(state, bool) {
            state.isLogin = bool;
        },
        setUsers(state, { users, active, unread }) {
            state.users = users;
            state.active = active;
            state.notice.unread = unread; // 未读的公告
        },
        // 设置声音
        setAudio(state) {
            state.audio = (state.audio == 1 ? 2 : 1);
            localStorage.setItem('audio', state.audio);
        },
        userShow(state, index) {
            !state.users[index].init && (state.users[index].init = true);
            state.users[index] && (state.users[index].show = !state.users[index].show);
        },
        // 用户登录
        userlogin(state, id) {
            if (!id) return;
            for (let i = 0; i < state.users.length; i++) {
                for (let j = 0; j < state.users[i].offLineUser.length; j++) {
                    if (state.users[i].offLineUser[j].id === id) {
                        state.users[i].onLineUser.unshift({ ...state.users[i].offLineUser.splice(j, 1)[0] });
                        return;
                    }
                }
            }
        },
        // 用户退出
        userexit(state, id) {
            if (!id) return;
            for (let i = 0; i < state.users.length; i++) {
                for (let j = 0; j < state.users[i].onLineUser.length; j++) {
                    if (state.users[i].onLineUser[j].id === id) {
                        state.users[i].offLineUser.unshift({ ...state.users[i].onLineUser.splice(j, 1)[0] });
                        return;
                    }
                }
            }
        },
        // 初始化消息数据
        setMessage(state, data) {
            if (!data) return;
            state.message = data;
        },
        // 初始化公告数据
        setNotice(state, data) {
            state.notice.read = data;
        },
        // 处理公告信息
        readNotice(state) {
            if (!state.notice.unread.length) return;
            localStorage.setItem('noticeid', state.notice.unread[0].id);
            let unread = state.notice.unread.reverse();
            state.notice.read = state.notice.read.concat(unread);
            state.notice.unread = [];
            unread.forEach(item => putNotice(item));
        },
        // 添加未读公告
        addUnRead(state, { title, content, id }) {
            const otime = Date.now();
            state.notice.unread.push({ title, content, id, otime });
        },
        // 删除公告
        removeNotice(state, id) {
            const len = state.notice.read.length;
            for (let i = 0; i < len; i++) {
                if (state.notice.read[i].id == id) {
                    state.notice.read.splice(i, 1);
                    break;
                }
            }
            removeNotice(id);
        },
        // 跟新消息数据
        updateMessage(state, { id, content, err, otype }) {

            const data = { time: Date.now(), content: fn.bqbReplace(content, state.bqb), launch: 'mi', err: err ? true : false, otype };

            for (let i = 0; i < state.message.length; i++) {
                if (state.message[i].id != id) continue;
                state.message[i].read.push(data);
                putMessage(IDBPrefix + state.active.username, state.message[i]);
                return;
            }

            const newMessage = { id, read: [data], unread: [] };
            state.message.push(newMessage);
            putMessage(IDBPrefix + state.active.username, newMessage);
        },
        // 删除一条消息消息
        rmMessage(state, { id, index }) {
            for (let i = 0; i < state.message.length; i++) {
                if (state.message[i].id != id) continue;
                state.message[i].read.splice(index, 1);
                putMessage(IDBPrefix + state.active.username, state.message[i]);
                return;
            }
        },
        // 删除一个用户的所有消息
        rmUserMessage(state, id) {
            for (let i = 0; i < state.message.length; i++) {
                if (state.message[i].id == id) {
                    state.message.splice(i, 1);
                    removeMessage(IDBPrefix + state.active.username, id);
                    return;
                }
            }
        },
        // 设置当前聊天窗口id 把未读的信息转变成已读信息
        setChatId(state, id) {
            state.chatId = id;
            for (let i = 0; i < state.message.length; i++) {
                if (state.message[i].id != id) continue;

                state.message[i].read = state.message[i].read.concat(state.message[i].unread);

                state.message[i].unread = [];

                putMessage(IDBPrefix + state.active.username, state.message[i]);

                break;
            }
        },
        // 接收消息
        recMessage,
        // 设置性别
        setSex(state, sex) {
            const active = { ...state.active }
            active.sex = sex;
            state.active = active;
            axios.post(url.setUser, { state: 'sex', sex }).then(result => {
                const { success } = result.data;
                if (!success) {
                    state.app ? plus.nativeUI.toast('修改失败', { duration: "long" }) : alert('修改失败');
                }
            })
        },
        // 设置用户信息
        setActive(state, { key, val }) {
            const active = { ...state.active }
            if (active[key] === undefined) return;
            active[key] = val;
            state.active = active;
        },
        // 显示视频通话拒绝/接听界面
        setRTC(state, data) {
            state.RTC = data;
        }
    },
    actions: {
        init({ commit, state, dispatch }, infor) {
            if (!infor) return;

            // 第一次启动默认开启声音提示
            if (!localStorage.getItem('audio')) commit('setAudio');

            // 如果 从这里登录成功则表示
            commit('setSocketInfor', infor);

            const noticeid = localStorage.getItem('noticeid') ? localStorage.getItem('noticeid') : '';

            const params = {
                ...infor,
                init: true,
                autokey: localStorage.getItem('autoLoginKey') ? localStorage.getItem('autoLoginKey') : '',
                noticeid,
                device: 'moblie'
            }

            axios.post(url.login, params).then(results => {

                const { data } = results;

                commit('setLogin', data.success);

                commit('setInit', true);

                if (!data.success) return;

                dispatch('newSetUsers', data)
            });
        },
        // 在其他地方登录需要当前用户退出
        elsewhereLogin({ commit }) {
            axios.post(url.exit, { state: 1 }).then(results => {
                const { data: { success } } = results;
                if (!success) return;
                commit('setLogin', false);
            })
        },
        newSetUsers({ commit, state }, data) {
            const { class: aclass, users, login, userid, notice, unreadmessage } = data;
            const rep = /^\/uploader/;

            for (let i = 0; i < users.length; i++) {
                if (rep.test(users[i].headphoto)) {
                    users[i].headphoto = url.hostname + users[i].headphoto;
                }
                else {
                    users[i].headphoto = url.headimg + '/' + users[i].headphoto;
                }
            }

            const { userlist, active } = fn.analysisUserData(aclass, users, login, userid);

            // 获取聊天数据
            getAllMessage(IDBPrefix + active.username).then(data => {
                commit('setMessage', data);
                // 添加留言信息
                unreadmessage.forEach(item => {
                    commit('recMessage', { sendid: item.userid, content: item.content, otype: item.otype });
                });
            });

            // 获取公告
            getAllNotice().then(data => commit('setNotice', data));

            commit('setUsers', { users: userlist, active, unread: notice });
        },
        addUnReadNotice({ commit, state }, data) {
            // 标记未读公告
            commit('addUnRead', data);

            // 如果当前状态在后台则推送该公告
            if (state.app && !state.appshow) { 
                const hash = '/notice/noticeContent/' + data.id;
                plus.push.createMessage(data.title, hash, { title: 'WEBCHAT公告' });
            }

            // 如果当前状态正在浏览公告则标记已读
            if (location.hash.search('notice') != -1) {
                commit('readNotice');
                return;
            }

            if(state.audio == 1 && state.appshow) document.querySelector('#noticeAudio').play();
        },
        messagePro({ commit, state, getters }, data) {
            if (data.otype === 'shock') {
                fn.vibrate();
            }
            // data = content controller otype sendid; 
            // 如果当前状态在后台时推送该消息
            if (state.app && !state.appshow) {
                const userdata = getters.getUser(data.sendid);
                const name = userdata.name ? userdata.name : userdata.username;
                const hash = '/index/chat/' + data.sendid;
                plus.push.createMessage(`给你发送了一条信息`, hash, { title: name });
            }

            if(state.audio == 1 && state.appshow && data.sendid != state.chatId ) document.querySelector('#messageAudio').play();

            commit('recMessage', data);
        },
        resRTC({ commit, state, getters }, data) {
            if(state.app || state.RTC) {
                axios.post(url.rtc, {state: 'jujue', sendid: data.id});
                return;
            }
            const obj = {
                key: data.key,
                sendid: data.id,
                miid: state.active.id,
                rtcurl: url.rtcurl,
                socketurl: url.socket,
                hesocketid: data.socketid,
                heudphost: data.udphost,
                heudpport: data.udpport,
                state: 2,
            }

            commit('setRTC', obj);
        }
    }
})
