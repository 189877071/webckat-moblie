const md5 = require('md5');
const { tables: { dbadminUser } } = require('../config');

module.exports = (req, res, next) => {
    const { password, username } = req.body;

    req.select({ table: dbadminUser, where: `username='${username}'` }).then(resutls => {

        if (!resutls.length) {
            res.json({ success: false, err: 1 }); // 用户名不正确
            return;
        }

        if (resutls[0].password !== md5(password)) {
            res.json({ success: false, err: 2 }); // 密码不正确
            return;
        }
        
        req.setSession('adminIsLogin', true).then(() => res.json({ success: true })).catch(err => res.json({ success: false, err }));

    }).catch(err => res.json({ success: false, err }));

}