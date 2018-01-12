
const md5 = require('md5');

const { tables: { dbadminUser } } = require('../config');

module.exports = (req, res) => {
    let { username, password } = req.body;

    if (!username) {
        res.json({ success: false });
        return;
    }

    let data = { username }

    if (password) {
        if (password.length < 6 || password.length > 20) {
            res.json({ success: false });
            return;
        }
        data.password = md5(password);
    }

    req.update({ table: dbadminUser, where: 'id=1', data }).then(() => req.rmSession('adminIsLogin').then(() => res.json({ success: true })).catch(err => res.json({ success: false, err }))).catch(err => res.json({ success: false, err }));
}