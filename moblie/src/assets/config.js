import axios from 'axios'

let bgs = [];

for (let i = 1; i < 8; i++) {
    bgs.push(`static/image/bg${i}.jpg`);
}

let hostname = 'https://api.jsonhappy.com';

export default {
    url: {
        hostname,
        rtc: '/rtc',
        rtcurl: hostname + '/rtc',
        socket: 'https://socket.jsonhappy.com',
        infor: '/chat/getinfor',
        login: '/chat/login',
        user: '/chat/users',
        exit: '/chat/exit',
        message: '/chat/message',
        notice: '/chat/notice',
        setUser: '/chat/setUserData',
        appsendimage: hostname + '/chat/message',
        uploader: hostname + '/chat/uploader',
        pcuploader: hostname + '/chat/pcuploader',
        headimg: hostname + '/image',
        rtcindexurl: '/static/rtc.html'
    },
    axios: axios.create({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true,
        baseURL: hostname
    }),
    IDBPrefix: 'webchat-',
    bg: {
        login: 'static/image/bg1.jpg',
        index: 'static/image/bg2.jpg',
        users: 'static/image/bg3.jpg',
        notice: 'static/image/bg4.jpg',
        set: 'static/image/bg5.jpg',
        setchild: 'static/image/bg6.jpg',
        chat: 'static/image/bg7.jpg',
        infor: 'static/image/bg8.jpg',
        noticecontent: 'static/image/bg9.jpg',
        search: 'static/image/bg10.jpg',
        rtc: 'static/image/rtcbg.jpg'
    }
}
