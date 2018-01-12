
const md5 = require('md5');

const { writeFile } = require('fs');

const { getVerify } = require('../fn');

const { tables: { dbuser, dbphoto }, static } = require('../config');

module.exports = (req, res) => {
    
    let { username, password, headphoto, email, synopsis, sex, age, name, issystem, uclass } = req.body;

    let [resdate, logindate] = [0, 0];

    // 判断数据是否准确
    const dataAccuracy = () => !username ||
        username.length < 6 ||
        username.length > 16 ||
        !password ||
        password.length < 6 ||
        password.length > 20 ||
        !email ||
        !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);

    // 获取一个随机头像
    const getPhotos = () => new Promise(reslove => req.select({ table: dbphoto }).then(results => {
        if (!results || !results.length) {
            res.json({ success: false, err: '获取头像数据失败' });
            return;
        }

        headphoto = results[Math.floor(Math.random() * results.length)].url;
        reslove();
    }).catch(err => res.json({ success: false, err: 'getPhotos' + err })));

    // 插入数据
    const inster = () => new Promise(reslove => req.insert({ table: dbuser, data: { username, password, headphoto, email, synopsis, sex, age, name, issystem, resdate, logindate, class: uclass ? Number(uclass) : 1 } }).then(() => res.json({ success: true })).catch(err => res.json({ success: false, err: 'inster' + err })));

    // 储存图片
    const writePhoto = () => new Promise(reslove => {
        let name = Date.now() + getVerify(5) + '.jpg';
        writeFile(`${static}/image/${name}`, headphoto.replace('data:image/png;base64,', ''), { encoding: 'base64' }, err => {
            if (err) {
                res.json({ success: false, err });
                return;
            }
            headphoto = name;
            reslove();
        })
    })

    // 判断数据是否正确
    if (dataAccuracy()) {
        res.json({ success: false, err: '提交数据不正确' });
        return;
    }

    resdate = logindate = Date.now();

    issystem = issystem == 'true' ? '2' : '1';

    sex = sex == '1' ? '1' : '2';

    password = md5(password);

    headphoto ? writePhoto().then(inster) : getPhotos().then(inster);
}