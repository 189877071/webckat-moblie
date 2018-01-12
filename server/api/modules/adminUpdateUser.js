const md5 = require('md5');

const { writeFile } = require('fs');

const { getVerify } = require('../fn');

const { tables: { dbuser }, static } = require('../config');

module.exports = (req, res) => {
    let { username, password, headphoto, email, synopsis, sex, age, name, issystem, id, uclass } = req.body;

    // 判断数据是否准确
    const dataAccuracy = () => !username ||
        username.length < 6 ||
        username.length > 16 ||
        !email ||
        !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);

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
    });

    // 跟新数据
    const update = () => {
        let data = {
            table: dbuser,
            where: `id=${id}`,
            data: {username, email, synopsis, sex, age, name, issystem, class: Number(uclass)}
        }

        password && (data.data['password'] = password);

        headphoto && (data.data['headphoto'] = headphoto);

        req.update(data).then(() => res.json({success: true})).catch(err => res.json({success: false, err}));
    }

    if(!id) {
        res.json({success: false});
        return;
    }

    // 判断数据是否正确
    if (dataAccuracy()) {
        res.json({ success: false, err: '提交数据不正确' });
        return;
    }

    issystem = issystem == 'true' ? '2' : '1';

    sex = sex == '1' ? '1' : '2';

    if (password) {
        if (password.length < 6 && password.length > 20) {
            res.json({ success: false });
            return;
        }
        password = md5(password);
    }

    headphoto ? writePhoto().then(update) : update();

}