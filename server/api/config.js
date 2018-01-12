const dirname = __dirname.replace(/\\/g, '/');

const db = require('./db.json');

const email = require('./email.json');

module.exports = {
    "db": db,
    "email": email,
    "log": {
        "size": 1048576,
        "path": dirname + '/log'
    },
    "tables": {
        "session": "chat_session",
        "dbadminUser": "chat_adminuser",
        "dbphoto": "chat_photo",
        "dbuser": "chat_user",
        "dblogin": "chat_socketloginuser",
        "dbautokey": "chat_autologin",
        "dbclass": "chat_class",
        "dbchat": "chat_record",
        "dbnotice": "chat_notice"
    },
    "static": dirname + '/static',
    "dirname": dirname,
    "origin": ["https://www.jsonhappy.com", "http://localhost:8080","https://admin.jsonhappy.com", "file://"]
}

