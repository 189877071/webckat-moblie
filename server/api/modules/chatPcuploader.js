const { exists, mkdir, writeFile } = require('fs');

const { static } = require('../config');

const { getVerify } = require('../fn');

module.exports = (req, res) => {
    const { daseUrl } = req.body;
    
    const errSend = err => res.json({ success: false, err: err ? err : '' });

    const T = new Date();
    
    const dirName = `/uploader/${T.getFullYear()}-${T.getMonth()+1}-${T.getDate()}/`;

    // 判断文件夹是否存在 如果不存在就创建一个
    const uploadDir = () => new Promise(reslove => exists(static + dirName, bool => {
        if(bool) {
            reslove();
            return;
        }
        mkdir(static + dirName, (err) => {
            if(err) {
                errSend();
                return;
            }
            reslove();
        })
    }));

    // 保存文件
    const baochunFile = () => new Promise(reslove => {

        const name = Date.now() + '-' + getVerify(8) + '.png';

        writeFile(static + dirName + name, daseUrl.replace('data:image/png;base64,', ''), { encoding: 'base64' }, err => {
            if (err) {
                errSend();
                return;
            }

            res.send({success: true, content: dirName + name});
        });
    });

    uploadDir().then(baochunFile);
}