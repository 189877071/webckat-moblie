const { tables: { dblogin } } = require('../config');

module.exports = (req, res) => {
    const { miid, sendid, key, socketid, udphost, udpport, state, icesdp } = req.body;
    
    const errSend = e => res.json({ success: false, err: e ? e : '' });

    const send = obj => req.udpsend(obj).then(() => res.json({ success: true })).catch(e => errSend(e));

    const getSendUser = () => new Promise(reslove => {
        req.select({ table: dblogin, where: `userid=${sendid}` }).then(data => {
            if (!data.length) {
                errSend(1); // 用户不在线
                return;
            }
            
            reslove(data[0]);
        }).catch(e => errSend(e));
    });

    const qingqiu = () => {
        if (!miid || !sendid || !key || !socketid || !udphost || !udpport) {
            errSend();
            return;
        }

        getSendUser().then(data => {
            const obj = { 
                data: { 
                    socketid: data.socketid, 
                    message: { controller: 'rtcchat', infor: { key, id: miid, socketid, udphost, udpport } }
                }, 
                host: data.udphost, 
                port: data.udpport 
            };
            send(obj);
        });
    }

    const jujue = () => {
        if (!sendid) {
            errSend();
            return;
        }
        
        getSendUser().then(data => {
            const { socketid, udphost, udpport } = data;

            const obj = { 
                data: { socketid, message: { controller: state } }, 
                host: udphost, 
                port: udpport 
            };

            send(obj);
        });
    }

    const jieting = () => {
        const { oudphost, oudpport, osocketid } = req.body;
        
        if (!socketid || !udphost || !udpport || !key || !oudphost || !oudpport || !osocketid || !icesdp) {
            errSend();
            return;
        }
        
        const obj = {
            data: { socketid, message: { controller: 'jieting', infor: { oudphost, oudpport, osocketid, key, icesdp } } },
            host: udphost,
            port: udpport
        }

        send(obj);
    }

    const fanhui = () => {
        if (!key || !socketid || !udphost || !udpport || !icesdp) {
            errSend();
            return;
        }

        const obj = { 
            data: { socketid, message: { controller: 'fanhui', infor: { key, icesdp } } }, 
            host: udphost, 
            port: udpport 
        };

        send(obj);
    }

    switch (state) {
        case 'jujue':
            jujue();
            break;
        case 'jieting':
            jieting();
            break;
        case 'fanhui':
            fanhui();
            break;
        case 'guaduan':
            jujue();
            break;
        default:
            qingqiu();
            break;
    }
}