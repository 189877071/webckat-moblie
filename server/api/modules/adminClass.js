
const { tables: { dbclass, dbuser } } = require('../config');

module.exports = (req, res) => {
    let classList = [];
    const { state, name, id } = req.body;

    const errFn = err => res.json({ success: false, err: err ? err : '' });

    const successFn = () => res.json({ success: true });

    // 添加
    const add = () => new Promise(reslove => {
        if (!name) {
            errFn();
            return;
        }
        req.insert({ table: dbclass, data: { name: name } }).then(reslove).catch(errFn);
    });

    // 修改
    const update = () => new Promise(reslove => {
        if (!id || !name) {
            errFn();
            return;
        }
        req.update({ table: dbclass, where: `id=${id}`, data: { name: name } }).then(reslove).catch(errFn);
    })

    // 删除
    const remove = () => new Promise(reslove => {
        if (!id) {
            errFn();
            return;
        }
        req.select({ table: dbuser, where: `class=${id}` }).then(results => {
            if (results && results.length) {
                errFn(1); // 有该分类的用户不能删除
                return;
            }
            req.delete({ table: dbclass, where: `id=${id}` }).then(reslove).catch(errFn);
        }).catch(errFn);
    });

    // 输出
    const select = () => new Promise(reslove => req.select({ table: dbclass, orderBy: {id: -1} }).then(reslove).catch(errFn));

    switch (state) {
        case 'add':
            add().then(successFn);
            break;
        case 'update':
            update().then(successFn);
            break;
        case 'rm':
            remove().then(successFn);
            break;
        default:
            select().then(results => res.json({success: true, data: results}));
    }
}