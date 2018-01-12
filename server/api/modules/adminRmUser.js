const { tables: { dbuser } } = require('../config');

module.exports = (req, res) => {
    const { id } = req.body;

    req.delete({ table: dbuser, where: `id=${id}` }).then(() => res.json({ success: true })).catch(err => res.json({ success: false, err }));
}