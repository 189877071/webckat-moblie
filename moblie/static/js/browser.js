(function() {
    var u = navigator.userAgent;
    var browser = {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1,   //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };

    if(browser.trident) {
        // ie浏览器 不容许访问
        location.href = '/static/ie.html';
        return;
    }

    if(!browser.mobile) {
        // 不是移动端 先添加 认证
        localStorage.setItem('is-pc-browser', true);
        return;
    }

    // 如果 有认证,表示是 按f12后 的pc端浏览器
    if(localStorage.getItem('is-pc-browser')) return;

    // 是移动端
    // 判断是不是android 系统
    if(browser.android) {
        // 是android版本的系统 显示 app 二维码
        location.href = '/static/android.html';
        return;
    }

    // 是 ios 系统 不让访问
    location.href = '/static/ios.html';
})();