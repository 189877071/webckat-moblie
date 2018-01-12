module.exports = (req, res) => {
    const adminIsLogin = req.getSession('adminIsLogin');
    res.json({ success: adminIsLogin ? true : false });
}