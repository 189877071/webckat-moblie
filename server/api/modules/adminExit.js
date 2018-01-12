module.exports = (req, res) => {
    req.rmSession('adminIsLogin')
        .then(() => res.json({ success: true }))
        .catch(err => res.json({ success: false, err }));
}