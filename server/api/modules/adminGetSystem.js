const { db, email, tables: { dbadminUser } } = require('../config');

module.exports = (req, res) => {
    req.select({ table: dbadminUser, where: 'id=1', key: ['username', 'id'] }).then(results => res.json({ success: true, admin: results[0], db, email })).catch(err => res.json({ success: false, err }));
}