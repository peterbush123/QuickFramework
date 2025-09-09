/** 获取网页参数中的数据 */
window.GetHtmlQueryVariable = (key) => {
    //有缓存直接返回
    if (window['__tempUrlData']) {
        if (key) return window['__tempUrlData'][key];
        return window['__tempUrlData'];
    }
    //缓存URL数据
    var url = new URL(window.location.href);
    var obj = {};
    url.searchParams.forEach((v, key) => {
        obj[key] = v;
    });
    window['__tempUrlData'] = obj;
    //
    if (obj['CC_DEBUG'] || obj['openLog']) {

    } else {
        // 清空url参数 , 使用 history.replaceState() 更新URL，但不触发页面刷新
        url.search = "";
        history.replaceState(null, "", url.toString());
    }
    //
    if (key) return obj[key];
    return obj;
}

/** 当前语言 */
window.language = window.GetHtmlQueryVariable("language");

//
var bgDiv = document.getElementById('gavinPlay');
let logoUrl = `url(./preload/logo.png)`;
bgDiv.style.backgroundImage = logoUrl;
bgDiv.style.display = "none";
delete window["LOGONAME"];

/** 隐藏Html加载条 */
window.HideLoading = function () {
    var preDiv = document.getElementById('preloading');
    preDiv.style.display = "none";
    //点点动画
    var txt = document.getElementById("animationElement");
    txt.style.display = "none";
    clearInterval(window.txtTimer);
}

/** 隐藏Html加载条 */
window.ShowLoading = function () {
    // return
    //点点动画
    const animationElement = document.getElementById('animationElement');
    let dots = 0;

    function animateDots() {
        // 清空元素内容
        animationElement.textContent = 'Loading';
        // 添加适量的点号
        for (let i = 0; i < dots; i++) {
            animationElement.textContent += '.';
        }
        // 增加点号数量，如果超过3个则重置为0
        dots = (dots + 1) % 4;
    }

    // 使用定时器每500毫秒更新一次动画
    window.txtTimer = setInterval(animateDots, 500);
}

window.ShowLoading();