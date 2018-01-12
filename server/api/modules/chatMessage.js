const { tables: { dbchat, dblogin }, static } = require('../config');

const { writeFile, exists, mkdir } = require('fs');

const { getVerify } = require('../fn');

module.exports = (req, res) => {
    const { userid } = req.getSession('chatLogin');

    const errFn = err => res.json({ success: false, err: err ? err : '' });

    let { content, otype, heid } = req.body;

    let [heData, dirName] = [null, ''];

    // 获取到对方的登录信息
    const heLoginData = () => new Promise(reslove => {
        req.select({table: dblogin, where: `userid=${heid}`}).then(results => {
            if(results && results.length) {
                heData = results[0];
            }
            reslove();
        }).catch(errFn);
    });

    // 储存消息
    const storage = () => new Promise(reslove => {

        if(['message', 'voice', 'shock', 'image'].indexOf(otype) === -1) {
            errFn();
            return;
        }

        const data = { userid, heid, otype, content: content ? content : '', state: heData ? 1 : 0, otime: Date.now()};

        req.insert({table: dbchat, data}).then(reslove).catch(errFn);
    });

    // 发送消息
    const sendMessage = () => new Promise(reslove => {
        if(!heData) {
            reslove();
            return;
        }

        const message = { controller: 'message', otype, sendid: userid, content: content ? content : ''};

        req.udpsend({
            data: { socketid: heData.socketid, message },
            host: heData.udphost,
            port: heData.udpport
        }).then(reslove).catch(() => {
            heData = null;
            reslove();
        });
    });

    if(!userid || !heid) {
        errFn();
        return;
    }

    heLoginData().then(sendMessage).then(storage).then(() => res.json({success: true}));
}