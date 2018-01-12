const { tables: { dbuser } } = require('../config');

const { getVerify } = require('../fn');

const md5 = require('md5');

module.exports = (req, res) => {

    const { userid } = req.getSession('chatLogin');

    const errSend = err => res.json({success: false, err: err ? err : ''});

    const send = () => res.json({success: true});

    if(!userid) {
        errSend();
        return;
    }

    const { state, sex, emailverify, email, name, password, age, synopsis, headphoto } = req.body;

    // 修改性别
    if(state === 'sex' && sex !== undefined) {
        data = {sex}
    }
    else if(state === 'email' && email !== undefined) {
        
        req.select({table: dbuser, where: `email='${email}'`}).then(results => {
            if(results && results.length) {
                errSend(1);
                return;
            }
            
            const verify = getVerify(6, true);

            req.setSession('emailverify', {email, verify, time: Date.now()}).then(() => {
                req.emailsend({
                    email, 
                    user: 'webchat.com', 
                    title: '修改邮箱', 
                    content: `<h1>${verify}</h1>`
                }).then(send).catch(errSend);
            })

        }).catch(errSend);

        return;
    }
    else if(state === 'emailverify' && emailverify !== undefined) {
        const { email, verify, time } = req.getSession('emailverify');
        // 验证码不正确
        if(verify !== emailverify) {
            errSend(1);
            return;
        }
        // 超时
        if(Date.now() - time > 300000) {
            errSend(2);
            return;
        }
        
        data = { email }
    }
    else if(state === 'name' && name ) {
        data = {name}
    }
    else if(state === 'password' && password && password.length >= 6 && password.length <= 20) {
        data = { password: md5(password) }
    }
    else if(state === 'age' && age && age > 0 && age < 121) {
        data = { age }
    }
    else if(state === 'synopsis' && synopsis && synopsis.length <= 50) {
        data = { synopsis }
    }
    else if(state === 'headphoto' && headphoto) {
        data = { headphoto }
    }
    else {
        errSend();
        return;
    }
    req.update({table: dbuser, where: `id=${userid}`, data}).then(send).catch(errSend);
}