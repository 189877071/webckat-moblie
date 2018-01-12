/*
    state: 1 发起请求方 2 接听请求方
    
    key: 联系密钥
    miid: 当前客服端用户id
    sendid: 对方客户端用户id
    udphost: 自己socket地址
    udpport: 自己socket端口
    socketid: 自己socketid

    name: 对方的名称
    headphoto: 对方的头像

    heudphost: 对方socket地址
    heudpport: 对方socket端口
    hesocketid: 对方socketid
*/

var obj, rtcurl, peer;

window.onload = function() {
    obj = searchURL();
    rtcurl = obj.rtcurl;
    peer = null;

    io(obj.socketurl).on('message', message);
    // 显示对方的头像
    $('#headphoto').src = obj.headphoto;
    // 显示对方的名称
    $('#username').innerHTML = obj.name;
    
    $('#title').innerHTML = obj.state == 1 ? '正在呼叫…' : '正在接通…';

    obj.ice = [];

    obj.sdp = {};

    delete obj.rtcurl;

    delete obj.socketurl;

    delete obj.name;

    delete obj.headphoto;
    // 挂断
    $('#guaduan').onclick = function() {
        ajax(rtcurl, {
            sendid: obj.sendid,
            state: 'guaduan'
        }, window.parent.guaduan);
    }
    // 静音
    $('.jingyin').onclick = function() {
        this.classList.remove('active');
        $('.shengyin').classList.add('active');
        $('#heVideo').muted = true;
    }
    // 打开声音
    $('.shengyin').onclick = function() {
        this.classList.remove('active');
        $('.jingyin').classList.add('active');
        $('#heVideo').muted = false;
    }
}

// 消息推送事件函数
function message(data) {
    switch (data.controller) {
        case 'init':
            init(data);
            break;
        case 'jieting':
            jieting(data);
            break;
        case 'fanhui':
            answer(data);
    }
}

function init(data) {
    extend(obj, data.infor);
    if(obj.state == 2) {
        openCamear(connection);
        return;
    }

    ajax(rtcurl, obj);
}

function openCamear(fn) {
    var err = function (e) {
        alert('摄像头打开失败' );
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        var config = {
            video: { frameRate: { ideal: 10, max: 15 } },
            audio: true
        }
        navigator.mediaDevices.getUserMedia(config).then(fn).catch(err);
        return;
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: true }, fn, err);
        return;
    }

    alert('您的浏览器不支持视频通话');
}

function connection(stream) {
    var RTCPeerConnection     = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection || window.msRTCPeerConnection;
    var RTCSessionDescription = window.RTCSessionDescription || window.webkitRTCSessionDescription || window.mozRTCSessionDescription || window.mosRTCSessionDescription;
    var RTCIceCandidate       = window.RTCIceCandidate || window.webkitRTCIceCandidate || window.mozRTCIceCandidate || window.msRTCIceCandidate;
    var time = null;
    var mandatory = { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true } };
    var success = function(sdp) {
        obj.sdp = sdp;
        peer.setLocalDescription(sdp);
    }

    var err = function(e) {
        alert('RTC初始化失败');
    }

    peer = new RTCPeerConnection({
        "iceServers": [
            { "url": "stun:stun.l.google.com:19302" },
            { "url": "stun:118.24.15.223:3478" },
            { "url": "turn:118.24.15.223:3478", "username": "aaa123456", "credential": "aaa123456"}
        ]
    });

    peer.addEventListener('icecandidate', function (ev) {
        if(ev.candidate) {
            obj.ice.push(ev.candidate);
            clearTimeout(time);
            time = setTimeout(function() {
                obj.state == 2 ? tojietin() : offer();
            }, 300);
        }
    }, false);

    peer.addEventListener('addstream', function (ev) {
        $('.video-box').style.display = 'block';
        $('.zhengzaihujiao').style.display = 'none';

        var oHevideo = $('#heVideo');
        oHevideo.src = URL.createObjectURL(ev.stream);
        oHevideo.onloadedmetadata = function (e) {
            oHevideo.play();
            oHevideo.style.transform = oHevideo.style.webkitTransform = 'translate3d(0,'+ ((window.innerHeight - parseFloat(getComputedStyle(oHevideo).height)) / 2) +'px, 0)';
        };

        var oMyvideo = $('#myVideo');
        oMyvideo.src = URL.createObjectURL(stream);
        oMyvideo.onloadedmetadata = function (e) {
            oMyvideo.play();
            oMyvideo.muted = true;
        };

        document.body.style.background = '#000';
    }, false);

    peer.addStream(stream);
    
    if(obj.state == 2) {
        peer.createOffer(success, err, mandatory);
    }
    else {
        tonxun(obj);
        peer.createAnswer(success, err, mandatory);
    }
}

function jieting(data) {
    var o = data.infor;
    if(o.key != obj.key) return;
    var icesdp = JSON.parse(o.icesdp)
    obj.heudphost  = o.oudphost;
    obj.heudpport  = o.oudpport;
    obj.hesocketid = o.osocketid;
    obj.ice        = icesdp.ice;
    obj.sdp        = icesdp.sdp;
    openCamear(connection);
}

function tonxun(data) {
    if(!peer) return;
    peer.setRemoteDescription(new RTCSessionDescription(data.sdp));
    data.ice.forEach(function(item) {
        peer.addIceCandidate(new RTCIceCandidate(item));
    });
}

function tojietin() {
    var data = {
        state: 'jieting',
        socketid: obj.hesocketid,
        udphost: obj.heudphost,
        udpport: obj.heudpport,
        key: obj.key,
        osocketid: obj.socketid,
        oudphost: obj.udphost,
        oudpport: obj.udpport,
        icesdp: JSON.stringify({
            ice: obj.ice,
            sdp: obj.sdp
        })
    };
    ajax(rtcurl, data);
}

function offer() {
    if(obj.state != 1) return;
    var data = {
        udphost: obj.heudphost,
        udpport: obj.heudpport,
        socketid: obj.hesocketid,
        key: obj.key,
        icesdp: JSON.stringify({
            ice: obj.ice,
            sdp: obj.sdp
        }),
        state: 'fanhui'
    }
    
    ajax(rtcurl, data);
}

function answer(data) {
    var o = data.infor;
    if(o.key != obj.key) return;
    tonxun(JSON.parse(o.icesdp));
}

function $(str) {
    var element = document.querySelectorAll(str);
    return element.length > 1 ? element : element[0];
}

// 获取网址信息
function searchURL() {
    var search = decodeURI(location.search).replace(/^\?/, '');
    if (!search) return {};
    var obj = {}
    search = search.split('&');
    search.forEach(function (item) {
        var data = item.split('=');
        if (data.length == 2) {
            obj[data[0]] = data[1];
        }
    });
    return obj;
}

function extend(obj, obj1) {
    for (var key in obj1) {
        obj[key] = obj1[key];
    }
}

// 整理参数
function params(data) {
    var arr = [];
    // var oFormData = new FormData();

    for (var key in data) {
        // oFormData.append(key, data[key]);
        arr.push(key + '=' + data[key]);
    }
    return arr.join('&');
    // return oFormData;
}

function ajax(url, data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (xhr.response.success) {
            (typeof fn == 'function') && fn(xhr.response);
        }
        else {
            alert('请求失败');
        }
    }
    xhr.send(params(data));
}



