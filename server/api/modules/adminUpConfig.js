
const { writeFile } = require('fs');

const { dirname } = require('../config');

module.exports = (req, res) => {
    // 设置数据库信息
    const setDB = () => {
        const { connectionLimit, database, host, password, user } = req.body;
        const db = { connectionLimit, database, host, password, user };
        writeFile(dirname + '/db.json', JSON.stringify(db), err => res.json({ success: err ? false : true }));
    }

    const setEmail = () => {
        const { host, pass, port, user } = req.body;
        const db = { host, pass, port, user };
        writeFile(dirname + '/email.json', JSON.stringify(db), err => res.json({ success: err ? false : true }));
    }

    if (req.body.state === 'db') {
        setDB();
    }
    else if (req.body.state === 'email') {
        setEmail();
    }
    else {
        res.json({ success: false });
    }

}