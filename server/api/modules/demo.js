module.exports = (req, res) => {
    console.log(req.cookies);
    console.log(req.headers.origin);
    if(!req.cookies.demo) {
        res.cookie('demo', '1234');
        res.json({success: 'ok', text: '设置cookie'});
    }
    else {
        res.json({success: 'ok', text: req.cookies.demo});
    }
}
