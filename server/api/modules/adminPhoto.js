const { tables: { dbphoto }, static } = require('../config');

const { writeFile } = require('fs');

const { getVerify } = require('../fn');

module.exports = (req, res) => {
    let { imgData, state, id } = req.body;

    if (state === 'get') {
        req.select({ table: dbphoto }).then(result => res.json({ success: true, data: result })).catch(err => res.josn({ success: false, err }));
    }
    else if(state === 'rm') {
        if(!id) {
            res.json({success: false});
            return;
        }
        req.delete({table: dbphoto, where: `id=${id}`}).then(() => res.json({success: true})).catch(err => res.josn({ success: false, err }));
    }
    else if (imgData) {
        let name = Date.now() + getVerify(5) + '.jpg';

        writeFile(static + '/image/' + name, imgData.replace('data:image/png;base64,', ''), { encoding: 'base64' }, err => {
            if (err) {
                res.json({ success: false, err });
                return;
            }
            req.insert({ table: dbphoto, data: { url: name } }).then(() => res.json({ success: true })).catch(err => res.json({ success: false, err }));
        });
    }
    else {
        res.json({success: false});
    }

}
