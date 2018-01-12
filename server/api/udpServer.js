const dgram = require('dgram');

const client = dgram.createSocket('udp4');

const { tables: { dblogin } } = require('./config');

const { insert, select, update, deleted, sql } = require('./db');

const udpsend = ({ data, host, port }) => new Promise((reslove, reject) => {
    try {
        const message = new Buffer(JSON.stringify(data));
        client.send(message, 0, message.length, port, host, err => err ? reject(err) : reslove());
    }
    catch (e) {
        reject(e);
    }
});

const exit = (msg, rinfo) => {
    try {
        const data = JSON.parse(msg.toString());

        if (data.controller === 'exit') {
            userExit(data.socketid);
        }
    }
    catch (e) { }

    // 用户离线操作
    function userExit(socketid) {

        if (!socketid) return;

        let userid = null;

        // 先判断socketid是否存在
        const isLogin = () => new Promise(reslove => {
            select({ table: dblogin, where: `socketid='${socketid}'` }).then(results => {
                if (!results || !results.length) return;
                userid = results[0].userid;
                reslove();
            }).catch(() => { });
        });

        // 删除用户登录数据
        const rmLogin = () => new Promise(reslove => deleted({table: dblogin, where: `socketid='${socketid}'`}).then(reslove).catch(() => {}));

        // 获取到所有在线用户不包括当前用户
        const allLogin = () => new Promise(reslove => {
            select({ table: dblogin }).then(results => {
                if (!results || !results.length) return;
                reslove(results);
            }).catch(() => { });
        });

        // 推送消息
        const sendMessage = users => {
       
            if (!users || !Array.isArray(users) || !userid) return;

            users.forEach(item => {
                udpsend({
                    data: { socketid: item.socketid, message: { controller: 'userexit', id: userid } },
                    host: item.udphost,
                    port: item.udpport
                }).catch(() => { });
            });
        }

        isLogin().then(rmLogin).then(allLogin).then(sendMessage);
    }
}

client.on('message', exit);

exports.udpsend = udpsend;
exports.udpexit = exit;
