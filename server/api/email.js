const nodemailer = require("nodemailer");

const { email:  { host, port, user, pass } } = require('./config');

// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport({
    host, // 主机
    secureConnection: true, // 使用 SSL
    port,                   // SMTP 端口
    tls: { rejectUnauthorized: false },
    auth: {
        user, // 账号
        pass  // 密码
    }
});

module.exports =  ({email, user, title, content}) => new Promise((resolve, reject) => {
    // 设置邮件内容
    const mailOptions = {
        from: user + " <postmaster@jsonhappy.com>", // 发件地址
        to: email,      // 收件列表
        subject: title, // 标题
        html: content   // html 内容
    };
    
    // 发送邮件
    smtpTransport.sendMail(mailOptions, function (error, response) {
        error ? reject() : resolve();
        smtpTransport.close();
    });
})

