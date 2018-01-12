const { tables: { dblogin } } = require('../config');

module.exports = (req, res) => {

    const { state, socketid } = req.body;

    if (state === 1) {
        req.rmSession('chatLogin').then(() => res.json({ success: true }));
    }
    else if(state === 2 && socketid) {
        // 退出推送
        req.udpexit(new Buffer(JSON.stringify({ controller: 'exit', socketid: socketid })));
        req.delete({ table: dblogin, where: `socketid='${socketid}'` }).then(results => {
            req.rmSession('chatLogin').then(() => res.json({ success: true }));
        })
    }
    else {
        res.json({ success: false });
    }

}