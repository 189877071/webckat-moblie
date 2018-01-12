
const { tables: { dbuser } } = require('../config');

module.exports = (req, res) => {
    // page 从0开始
    let { page, num, search, id } = req.body;

    if(id) {
        let data = {
            table: dbuser,
            key: ['id', 'username', 'email', 'sex', 'age', 'logindate', 'name', 'issystem', 'headphoto', 'synopsis', 'class'],
            where: `id=${id}`
        }

        req.select(data).then(resutls => res.json({ success: true, user: resutls && resutls.length ? resutls[0] : {} })).catch(err => res.json({ success: false, err }));
        return;
    }

    let len = 0;

    !page && (page = 0);

    !num && (num = 20);
    
    // 获取用户列表长度
    const getLen = () => new Promise(reslove => {
        req.sql(`select count(*) as len from ${dbuser}`)
            .then(data => {
                len = data && data.length ? data[0].len : 0;
           
                reslove();
            })
            .catch(err => res.json({ success: false, err }));
    });

    // 获取用户
    const getUsers = () => {
        let data = {
            table: dbuser,
            orderBy: { logindate: 1 },
            key: ['id', 'username', 'email', 'sex', 'age', 'logindate', 'name', 'issystem', 'class'],
            limit: [page * num, num]
        }

        search && (data['where'] = `username like '${search}' and name like '${search}'`);

        req.select(data).then(resutls => res.json({ success: true, count: len, users: resutls })).catch(err => res.json({ success: false, err }));
    }   

    getLen().then(getUsers);
}
