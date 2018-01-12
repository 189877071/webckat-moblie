function start(arr, str) {
    arr.forEach(item => {
        (function fn() {
            let p = fork(str);
            p.send(item);
            p.on('exit', fn);
        })();
    })
}

const { fork, exec } = require('child_process');

const { http, socket } = require('./config');

start(http, `${__dirname}/api/start.js`);

start(socket, `${__dirname}/socket/start.js`);