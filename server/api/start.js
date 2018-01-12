const express = require('express');

const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');

const multiparty = require("connect-multiparty");

const { insert, select, update, deleted, sql } = require('./db');

const email = require('./email');

const { static, origin } = require('./config');

const { udpsend, udpexit } = require('./udpServer');

const log = require('./log');

const session = require('./modules/session');

const adminIsLogin = require('./modules/adminIsLogin');

const chatIsLogin = require('./modules/chatIsLogin');

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(static));

app.use((req, res, next) => {
    req.insert = insert;
    req.select = select;
    req.update = update;
    req.delete = deleted;
    req.sql = sql;
    req.udpsend = udpsend;
    req.udpexit = udpexit;
    req.emailsend = email;
    req.log = err => log({ ip: req.ip, date: new Date(), url: req.hostname + req.originalUrl, browser: req.headers[`user-agent`], err });

    if (origin.indexOf(req.headers.origin) !== -1) {
        res.set({
            'Access-Control-Allow-Origin': req.headers.origin,
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'X-Custom-Header'
        });
    }
    next();
});

app.post('*', (req, res, next) => {
  
    for (let key in req.body) {
        if (/^\{.|\s\}$/.test(key)) {
            
            try {
                let data = JSON.parse(key);
                for (let k in data) {
                    req.body[k] = data[k];
                }
                delete req.body[key];
            }
            catch (e) { }
        }
    }
    next();
});

app.post('/rtc', require('./modules/rtc'));

app.use(session);

app.post('/dome', require('./modules/demo'));

app.get('/admin/init', require('./modules/adminInit'));

app.post('/admin/login', require('./modules/adminLogin'));

app.post('/admin/*', adminIsLogin);

app.get('/admin/*', adminIsLogin);

app.post('/admin/cjheadphoto', multiparty(), require('./modules/adminPhoto'));

app.post('/admin/adduserto', multiparty(), require('./modules/adminAddUser'));

app.post('/admin/users', require('./modules/adminUsers'));

app.post('/admin/rmuser', require('./modules/adminRmUser'));

app.post('/admin/updateuser', multiparty(), require('./modules/adminUpdateUser'));

app.post('/admin/uploginuser', require('./modules/adminUpPass'));

app.post('/admin/getsystemdata', require('./modules/adminGetSystem'));

app.post('/admin/upconfig', require('./modules/adminUpConfig'));

app.post('/admin/exit', require('./modules/adminExit'));

app.post('/admin/class', require('./modules/adminClass'));

app.post('/admin/notice', require('./modules/adminNotice'));

app.post('/chat/login', require('./modules/chatLogin'));

app.post('/chat/uploader', require('./modules/chatUploader'));

app.post('/chat/*', chatIsLogin);

app.get('/chat/*', chatIsLogin);

app.post('/chat/pcuploader', multiparty(), require('./modules/chatPcuploader'));

app.post('/chat/getinfor', require('./modules/chatGetUserInfor'));

app.post('/chat/users', require('./modules/chatUsers'));

app.post('/chat/exit', require('./modules/chatExit'));

app.post('/chat/message', multiparty(), require('./modules/chatMessage'));

app.post('/chat/notice', require('./modules/chatNotice'));

app.post('/chat/setUserData', require('./modules/chatSetUserData'));

app.post("*", (req, res) => res.status(404).json({ err: '您访问的页面不存在' }));

app.get("*", (req, res) => res.status(404).json({ err: '您访问的页面不存在' }));

process.on('message', ({ port }) => app.listen(port));