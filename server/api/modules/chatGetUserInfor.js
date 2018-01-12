const { tables: { dbuser } } = require('../config');

module.exports = (req, res) => {
    const { userid } = req.getSession('chatLogin');

    req.select({
        table: dbuser,
        where: `id=${userid}`,
        key: ['id', 'username', 'headphoto', 'email', 'synopsis', 'sex', 'age', 'logindate', 'name']
    }).then(results => {
        if (!results && !results.length) {
            res.json({ success: false, err: '用户不存在' });
            return;
        }
        res.json({ success: true, data: results[0] });
    }).catch(err => res.json({ success: false, err }));
}