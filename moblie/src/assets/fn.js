import config from './config'

// 解析获取到的用户数据集
function analysisUserData(aclass, users, login, userid) {

    let userlist = [];
    let active = null;

    aclass.forEach(item => {
        let [offLineUser, onLineUser] = [[], []];

        for (let i = 0; i < users.length; i++) {

            if (users[i].id === userid) {
                active = users.splice(i, 1)[0];
                i--;
                continue;
            }

            if (users[i].class !== item.id) continue;

            let [user, loginonoff] = [users.splice(i, 1)[0], false];

            for (let j = 0; j < login.length; j++) {
                if (user.id === login[j].userid) {
                    loginonoff = true;
                    break;
                }
            }

            loginonoff ? onLineUser.push(user) : offLineUser.push(user);

            i--;
        }

        userlist.push({ title: item.name, onLineUser, offLineUser, show: false, init: false, id: item.id });
    });

    return { userlist, active };
}

function buWei(num) {
    return num < 10 ? '0' + num : num;
}

function getDay(num) {
    switch (num) {
        case 0:
            return '星期天';
        case 1:
            return '星期一';
        case 2:
            return '星期二';
        case 3:
            return '星期三';
        case 4:
            return '星期四';
        case 5:
            return '星期五';
        case 6:
            return '星期六';
        default:
            return '';
    }
}

function bqbReplace(str, bqb) {
    const rep = /\{\{[^\}\}]*\}\}/gi;
    const repName = /\{\{|\}\}/g;
    let arr = str.match(rep);
    if (arr) {
        arr.forEach(item => {
            let name = item.replace(repName, '');
            for (let i = 0; i < bqb.length; i++) {
                if (bqb[i].name == name) {
                    const oImg = `<img src="${bqb[i].src}" style=""  alt="" class=biaoqingbao>`;
                    str = str.replace(item, oImg);
                    break;
                }
            }
        });
    }

    return str;
}

function vibrate() {
    if (process.env.ACTIVE === 'application') {
        plus.device.vibrate();
        let num = 0;
        let time = null;
        time = setInterval(() => {
            num++;
            if (num > 1) {
                clearInterval(time);
            }
            plus.device.vibrate();
        }, 1000);
    }
}

function toast(str) {
    if (process.env.ACTIVE === 'application') {
        plus.nativeUI.toast(str, { duration: "short" });
    }
    else {
        alert(str);
    }
}

// 截图
function screenshot(oImg, { W, H, L, T, imgW, imgH }) {
    return new Promise(reslove => {
        let oCanvas = document.createElement('canvas');
        let cxt = oCanvas.getContext('2d');
        oCanvas.width = W;
        oCanvas.height = H;
        cxt.drawImage(oImg, L, T, imgW, imgH, 0, 0, W, H);
        reslove(oCanvas.toDataURL('image/png'));
        oCanvas = cxt = null;
    });
}

// pc浏览器压缩文件
function handleImage(file, { maxW }) {
    return new Promise(reslove => {
        let [oImg, oCanvas, reader] = [
            new Image(),
            document.createElement('canvas'),
            new FileReader()
        ];

        let cxt = oCanvas.getContext('2d');

        oImg.addEventListener('load', () => {
            let [w, h] = [
                oImg.width,
                oImg.height
            ];

            if (w > maxW) {
                const bl = w / maxW;
                w = maxW;
                h = h / bl;
            }

            oCanvas.width = w;
            oCanvas.height = h;

            cxt.drawImage(oImg, 0, 0, oImg.width, oImg.height, 0, 0, w, h);

            reslove(oCanvas.toDataURL('image/png'));

            oImg = oCanvas = cxt = null;
        }, false);

        reader.onload = e => oImg.src = e.target.result;

        reader.readAsDataURL(file);
    });
}

// pc浏览器上传图片
function pcUploader(data) {
    return new Promise(reslove => {
        if (!data) return;
        var oFormData = new FormData();
        oFormData.append('daseUrl', data);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', config.url.pcuploader, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('X-Custom-Header', 'XMLHttpRequest');
        xhr.withCredentials = true;
        xhr.onload = () => reslove(xhr.response);
        xhr.onerror = () => reslove(false);
        xhr.send(oFormData);
    });
}

function getCookie(url, name) {
    if (process.env.ACTIVE != 'application') return '';

    let str = plus.navigator.getCookie(url);

    str = str.split(';');

    for (let i = 0; i < str.length; i++) {
        let arr = str[i].split('=');
        if (arr && arr[0] == name) {
            return arr[1];
        }
    }

    return '';
}

// 打开图库
function pack() {
    return new Promise(reslove => {
        if (process.env.ACTIVE != 'application') return;
        plus.gallery.pick(reslove);
    });
}

// 压缩图片
function zipImg(url) {
    return new Promise(reslove => {
        if (!url) return;
        plus.io.requestFileSystem(plus.io.PUBLIC_DOWNLOADS, function (fs) {
            var oImg = new Image();
            oImg.onload = () => {
                var data = {
                    src: url,
                    dst: fs.root.fullPath + getRandomName() + getPostfix(url),
                    overwrite: true
                };

                if (oImg.width > 500) {
                    data.width = 500;
                }

                plus.zip.compressImage(data, ev => reslove(ev.target));
            }
            oImg.src = url;
        });
    });
}

// 获取一个随机不重复名称
function getRandomName() {
    return Date.now() + '' + parseInt(Math.random() * 10000);
}

// 获取文件后缀名
function getPostfix(file) {
    return file.slice(file.lastIndexOf('.'), file.length);
}

// 上传图片
function updloadImage(file) {
    return new Promise(reslove => {
        if (!file) return;
        var tesk = plus.uploader.createUpload(config.url.uploader, { method: 'POST', blocksize: 2097152 }, (t, status) => reslove((status != 200) ? false : JSON.parse(t.responseText)));
        tesk.addFile(file, { key: 'file' });
        tesk.addData('session_id', getCookie(config.url.hostname, 'session_id'));
        tesk.start();
    })
}

// 图片预加载
function loadImage(src) {
    var oImg = new Image();
    oImg.onload = () => {
        var aImg = document.images;

        for (var i = 0; i < aImg.length; i++) {
            if (aImg[i].dataset.src == src) {
                aImg[i].src = config.url.hostname + src;
                aImg[i].dataset.src = '';
            }
        }
        oImg = null;
        aImg = null;
    }
    oImg.src = config.url.hostname + src;
}

// 开始录音
let r = null;
function startLuyin() {
    return new Promise(reslove => {
        if (process.env.ACTIVE != 'application') return;
        r = plus.audio.getRecorder();
        r.record({ filename: '_downloads/audio/' }, function (p) {
            reslove(p);
        });
    });
}
// 取消录音
function endLuyin() {
    if (!r) return;
    r.stop();
}

// 播放语音App原生
let p = null;
function AppPlayYuyin(path) {
    return new Promise(reslove => {
        if (process.env.ACTIVE != 'application') return;
        if (p) p.stop();
        p = plus.audio.createPlayer(path);
        p.play(reslove, () => toast('语音播放失败'));
    });
}

// 播放语音 浏览器
function borwserPlayYuyin(path) {
    return new Promise(reslove => {
        const oAudio = document.querySelector('#oAudio');
        oAudio.src = config.url.hostname + path;
        oAudio.onerror = e => {
            alert('语音无法播放');
        }
        oAudio.onpause = reslove;
        oAudio.play();
    });
}

function edUrl(url, params) {
    if (Object.prototype.toString.call(params) == '[object Object]') {
        var arr = [];
        for (let key in params) {
            arr.push(`${key}=${params[key]}`);
        }
        url += '?' + arr.join('&').trim();
    }
    return url;
}

// 打开浏览器
function openBrowesr(url, data) {
    if (process.env.ACTIVE != 'application') return;
    var u = edUrl(url, data);
    plus.runtime.openURL(u, () => plus.runtime.openURL(u, () => toast('浏览器打开失败')), 'com.tencent.mtt');
}

// 获取随机数
function getVerify(num, type) {
    const str = type ? '1234567890' : 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKMNOPQRSTUVWXYZ0123456789';
    let verify = '';
    for (var i = 0; i < num; i++) {
        verify += str[Math.floor(Math.random() * str.length)];
    }
    return verify;
}

export default {
    analysisUserData,
    buWei,
    getDay,
    bqbReplace,
    vibrate,
    toast,
    handleImage,
    getCookie,
    pack,
    zipImg,
    updloadImage,
    loadImage,
    pcUploader,
    startLuyin,
    endLuyin,
    AppPlayYuyin,
    borwserPlayYuyin,
    openBrowesr,
    getVerify,
    edUrl,
    screenshot
}