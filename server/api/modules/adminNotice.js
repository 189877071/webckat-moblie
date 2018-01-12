const { tables: { dbnotice, dblogin } } = require('../config');

const rexp = /<[^>]*>|\\/g;

module.exports = (req, res) => {

    const errSend = err => res.json({ success: false, err: err ? err : '' });

    const send = () => res.json({success: true})

    let { state, title, content, id } = req.body;

    title && (title = title.replace(rexp, ''));

    content && (content = content.replace(rexp, ''));

    // 发送通知
    const sendNotice = data => new Promise(reslove => {
        req.select({table: dblogin, key: ['socketid', 'udphost', 'udpport']}).then(results => {
            if(results && results.length) {
                for(let i=0; i<results.length; i++) {
                    req.udpsend({
                        data: { 
                            socketid: results[i].socketid, 
                            message: { controller: 'newnotice', title, content: content.slice(0,100), id: data.insertId }
                        },
                        host: results[i].udphost, 
                        port: results[i].udpport
                    }).catch(()=>{});
                }
            }
            
            reslove();
        }).catch(errSend);
    })

    // 添加公告
    const add = () => new Promise(reslove => {
        if(!title || !content || title.length > 60) {
            errSend();
            return;
        }
        req.insert({ table: dbnotice, data: { title, content, otime: Date.now() } }).then(reslove).catch(err => errSend(err));
    })

    // 删除公告
    const rm = () => new Promise(reslove => {
        if(!id) {
            errSend();
            return;
        }
        req.delete({table: dbnotice, where: `id=${id}`}).then(reslove).catch(err => errSend(err));
    })

    // 获取数据
    const all = () => new Promise(reslove => req.select({table: dbnotice, key: ['id', 'title', 'otime'], orderBy: {otime: 1}}).then(reslove).catch(err => errSend(err)));

    // 获取一条数据
    const one = () => new Promise(reslove => {
        if(!id) {
            errSend();
            return;
        }
        req.select({table: dbnotice, where: `id=${id}`}).then(results => {
            if(!results || !results.length) {
                errSend();
                return;
            }
            reslove(results[0])
        }).catch(err => errSend(err));
    })

    if (state === 'all') {
        all().then(results => res.json({success: true, data: results}));
    }
    else if(state === 'one') {
        one().then(results => res.json({success: true, data: results}));
    }
    else if(state === 'add') {
        add().then(sendNotice).then(send);
    }
    else if(state === 'rm') {
        rm().then(send);
    }
    else {
        errSend('请传递指定参数');
    }
}