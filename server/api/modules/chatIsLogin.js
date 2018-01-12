
module.exports = (req, res, next) => {
    if (req.getSession('chatLogin')) {
        next();
        return;
    }
    
    res.json({ success: false, err: '请先登录' });
}