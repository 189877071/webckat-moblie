const multiparty = require('multiparty');

const { exec } = require('child_process');

const { exists, mkdir, rename, unlink } = require('fs');

const { static } = require('../config');

const { getVerify, getPostfix } = require('../fn');

module.exports = (req, res) => {
    
    const session = req.getSession('session_id');

    const { session_id } = req.body;

    const errSend = err => res.json({ success: false, err: err ? err : '' });
    
    if(session != session_id) {
        res.send();
        return;
    }

    const T = new Date();
    
    const dirName = `/uploader/${T.getFullYear()}-${T.getMonth()+1}-${T.getDate()}/`;
    
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

    const baochunFile = () => new Promise(reslove => {
        const form = new multiparty.Form({ uploadDir: static + dirName });
        form.parse(req, (err, fields, files) => {
            if(err) {
                errSend();
                return;
            }

            var filePostfix = getPostfix(files['file'][0].path);

            var name = dirName + Date.now() + '-' + getVerify(8);

            var snewFile = static + name + filePostfix;

            rename(files['file'][0].path, snewFile, err => {
                if(err) {
                    errSend();
                    return;
                }

                if(filePostfix === '.amr') {
                    var ffmpeg = exec(`"ffmpeg" -i ${snewFile} ${static + name}.mp3`);

                    ffmpeg.once('exit', () => unlink(snewFile, () => res.send({success: true, content: name + '.mp3'})));

                    return;
                }

                res.send({success: true, content: name + filePostfix});
            });
            
        });
    });

    uploadDir().then(baochunFile);
}