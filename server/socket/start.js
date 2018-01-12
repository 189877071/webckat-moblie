const socket = require('socket.io');

const dgram = require('dgram');

const udp = dgram.createSocket('udp4');

let io = null;

udp.on('message', (msg, rinfo) => {
    try {
        const data = JSON.parse(msg.toString());

        if (io.sockets.sockets[data.socketid]) {

            io.sockets.sockets[data.socketid].emit('message', data.message);

            io.sockets.sockets[data.socketid].rinfo = rinfo;
        }
    }
    catch (e) { }
});

process.on('message', ({ socketport, udpport, udphost }) => {

    udp.bind(udpport, udphost);

    io = socket(socketport);

    // 把挂载到socket上的信息 发送给用户
    io.on('connection', socket => {

        socket.emit('message', { controller: 'init', infor: { udphost, udpport, socketid: socket.id } });

        socket.on('disconnect', () => {
            if (!socket.rinfo) return;

            const message = new Buffer(JSON.stringify({ controller: 'exit', socketid: socket.id }));

            udp.send(message, 0, message.length, socket.rinfo.port, socket.rinfo.address);
        });
    });

})