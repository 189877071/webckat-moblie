const md5 = require('md5');

const { tables: { dbuser, dblogin, dbautokey, dbclass, dbnotice, dbchat } } = require('../config');

module.exports = (req, res) => {
    let userid = null;

    // 最后输出的数据对象
    let sendData = {
        success: true,
        users: [],
        class: [],
        login: [],
        notice: [],
        unreadmessage: []
    }

    const { udphost, udpport, socketid, username, password, autokey, device, browserkey, cs, init, noticeid } = req.body;

    const errFn = err => res.json({ success: false, err: err ? err : '' });

    const send = () => {
        sendData.userid = userid;
        res.json(sendData);
    }

    // 通过用户名或者邮箱地址查询用户是否存在
    const getUserOnoff = () => new Promise(reslove => {
        let key = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(username) ? 'email' : 'username';

        req.select({ table: dbuser, where: `${key}='${username}'` }).then(results => {
            if (!results || results.length == 0) {
                errFn(1); // 用户名或邮箱不存在
                return;
            }

            if (results[0].password !== md5(password)) {
                errFn(2); // 密码不正确
                return;
            }

            userid = results[0].id;

            reslove(results[0]);
        }).catch(errFn);
    });

    // 更新用户表登录时间与登录次数
    const updateUserTable = userData => new Promise(reslove => {
        if (!userData) {
            errFn();
            return;
        }
        let data = {
            loginnum: userData.loginnum + 1,
            logindate: Date.now()
        }
        req.update({ table: dbuser, data, where: `id=${userid}` }).then(reslove).catch(errFn);
    });

    // 用户是否选择自动登录如果设置写人 自动登录信息表中
    const isAutoLogin = () => new Promise(reslove => {
        if (!autokey) {
            reslove();
            return;
        }
        req.insert({ table: dbautokey, data: { userid, autokey, otime: Date.now() } }).then(reslove).catch(errFn);
    })

    // 判断用户是否已经在其他设备上登录
    const deviceLogin = () => new Promise(reslove => {
        req.select({ table: dblogin, where: `userid=${userid}` }).then(results => reslove((!results || results.length === 0) ? null : results[0])).catch(errFn);
    })

    // 把登录用户添加到登录表
    const addLogin = data => new Promise(reslove => {
        if (!data) {
            req.insert({
                table: dblogin, data: {
                    userid,
                    socketid,
                    udphost,
                    udpport,
                    device,
                    otime: Date.now()
                }
            }).then(reslove).catch(errFn);
            return;
        }

        req.udpsend({
            data: { socketid: data.socketid, message: { controller: 'elsewhereLogin', key: browserkey ? browserkey : '' } },
            host: data.udphost,
            port: data.udpport
        }).then(() => {

            req.update({ table: dblogin, where: `id=${data.id}`, data: { socketid, udphost, udpport, device } }).then(reslove).catch(errFn);
        }).catch(errFn);
    });

    // 设置session登录成功
    const setSession = () => new Promise(reslove => req.setSession('chatLogin', { success: true, userid }).then(reslove).catch(errFn));

    // 获取到一条没有在线的用户
    const getCsUser = () => new Promise(reslove => {
        req.select({ table: dblogin }).then(results => {

            let data = { table: dbuser, limit: 1 }

            if (results && results.length > 0) {
                let arr = [];

                for (let i = 0; i < results.length; i++) {
                    arr.push(results[i].userid);
                }

                if (arr.length > 0) {
                    data.where = `id not in (${arr.join(',')})`;
                }
            }

            req.select(data).then(results => {
                if (!results || !results.length) {
                    errFn();
                    return;
                }

                userid = results[0].id;

                reslove(results[0]);

            }).catch(errFn);

        }).catch(errFn);
    });

    // 判断是否已经登录或者设置了自动登录
    const isLogin = () => new Promise(reslove => {

        if (req.getSession('chatLogin')) {
            userid = req.getSession('chatLogin').userid;
            reslove();
            return;
        }

        if (!autokey) {
            errFn();
            return;
        }

        req.select({ table: dbautokey, where: `autokey='${autokey}'` }).then(results => {
            if (!results || !results.length) {
                errFn();
                return;
            }

            userid = results[0].userid;

            req.update({ table: dbautokey, where: `id=${results[0].id}`, data: { otime: Date.now() } }).then(reslove).catch(errFn);
        }).catch(errFn);
    })

    // 获取所有分组
    const allCalss = () => new Promise(reslove => {
        req.select({ table: dbclass }).then(results => {
            if (!results || !results.length) {
                errFn();
                return;
            }

            sendData.class = results;
            reslove();
        }).catch(errFn);
    });

    // 获取所有用户
    const allUser = () => new Promise(reslove => {
        req.select({
            table: dbuser,
            key: ['id', 'username', 'email', 'headphoto', 'synopsis', 'sex', 'age', 'name', 'class', 'logindate']
        }).then(results => {
            if (!results || !results.length) {
                errFn();
                return;
            }

            sendData.users = results;
            reslove();
        }).catch(errFn);
    });

    // 获取所有在线用户
    const allLoginUser = () => new Promise(reslove => {
        req.select({ table: dblogin, where: `userid!=${userid}` }).then(results => {
            if (!results || !results.length) {
                reslove();
                return;
            }
            sendData.login = results;
            reslove();
        }).catch(errFn);
    });

    // 推送消息有人登录了
    const sendMessageLogin = () => new Promise(reslove => {
     
        sendData.login.forEach(item => {
            req.udpsend({
                data: { socketid: item.socketid, message: { controller: 'userlogin', id: userid } },
                host: item.udphost,
                port: item.udpport
            }).catch(() => { });
        });

        req.udpsend({
            data: { socketid, message: { login: true } },
            host: udphost,
            port: udpport
        }).then(reslove).catch(errFn);
    });

    // 获取公告
    const getNotice = () => new Promise(reslove => {
        const config = {table: dbnotice, limit: 10, orderBy: {id: 1}}
        if(noticeid) {
            config.where = `id>${noticeid}`
        }
        req.select(config).then(results => {
            if(results && results.length>0) {
                for(let i=0; i<results.length; i++) {
                    let data = results[i];
                    data.content = data.content.slice(0,100);
                    sendData.notice.push(data);
                }
            }
            reslove();
        }).catch(errFn);
    });

    // 获取到所有未读消息
    const getUnreadMessage = () => new Promise(reslove => {
        req.select({ table: dbchat, where:`heid=${userid} and state=0`, orderBy: {otime: 1} }).then(results => {
            if(!results || !results.length) {
                reslove();
                return;
            }
            sendData.unreadmessage = results;
            req.update({table: dbchat, where:`heid=${userid} and state=0`, data: {state: 1}}).then(reslove).catch(errFn);
        }).catch(errFn);
    })

    // 初始化访问
    if (init && device && udphost && udpport && socketid) {
        isLogin().then(deviceLogin).then(addLogin).then(setSession).then(allCalss).then(allUser).then(allLoginUser).then(sendMessageLogin).then(getNotice).then(getUnreadMessage).then(send);
        return;
    }

    // 使用测试用户登录
    if (cs && device && udphost && udpport && socketid) {
        getCsUser().then(updateUserTable).then(isAutoLogin).then(deviceLogin).then(addLogin).then(setSession).then(allCalss).then(allUser).then(allLoginUser).then(sendMessageLogin).then(getNotice).then(getUnreadMessage).then(send);
        return;
    }

    // 判断提交的信息是否完整
    if (!udphost || !udpport || !socketid || !username || !password || !device) {
        errFn(0); // 缺少提交信息
        return;
    }

    getUserOnoff().then(updateUserTable).then(isAutoLogin).then(deviceLogin).then(addLogin).then(setSession).then(allCalss).then(allUser).then(allLoginUser).then(sendMessageLogin).then(getNotice).then(getUnreadMessage).then(send);

}