
const { tables: { dbuser, dbclass, dblogin } } = require('../config');

module.exports = (req, res) => {
    const errFn = err => res.json({ success: false, err: err ? err : '' });

    const { userid } = req.getSession('chatLogin');
    
    if(!userid) {
        errFn();
        return;
    }
    
    let send = {
        success: true,
        users: [],
        class: [],
        login: []
    }

    // 获取所有分组
    const allCalss = () => new Promise(reslove => {
        req.select({ table: dbclass }).then(results => {
            if (!results || !results.length) {
                errFn();
                return;
            }

            send.class = results;
            reslove();
        }).catch(errFn);
    });

    // 获取所有用户
    const allUser = () => new Promise(reslove => {
        req.select({
            table: dbuser,
            key: ['id', 'username', 'email', 'headphoto', 'synopsis', 'sex', 'age', 'name', 'class', 'logindate'],
            where: `id!=${userid}`
        }).then(results => {
            if (!results || !results.length) {
                errFn();
                return;
            }

            send.users = results;
            reslove();
        }).catch(errFn);
    });

    // 获取所有在线用户
    const allLoginUser = () => new Promise(reslove => {
        req.select({ table: dblogin, key: ['userid', 'device'] }).then(results => {

        }).catch(errFn);
    });

    allCalss().then(allUser).then(() => res.json(send));
}