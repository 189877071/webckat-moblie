
module.exports = (req, res, next) => {
    if (req.getSession('adminIsLogin')) {
        next();
        return;
    }

    res.json({ success: false, err: '请先登录' });
}