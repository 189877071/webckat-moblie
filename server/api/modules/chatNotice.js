const { tables: { dbnotice } } = require('../config');

module.exports = (req, res) => {
    const { id } = req.body;

    req.select({ table: dbnotice, where: `id=${id}` }).then(results => {
        if(!results || !results.length ) {
            res.json({success: false});
            return;
        }

        res.json({ success: true, data: results[0] });
    }).catch(err => res.json({ success: false, err }))
}