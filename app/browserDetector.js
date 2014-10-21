define([], function () {
    "use strict";

    var ua = navigator.userAgent.toLowerCase();

    var browserDetector = {
        isInternetExplorer: false,
        isSupportedMobile: null,
        isSupportedBrowser: null,
        isMobileDevice: null,
        isChromeWithPageCoordsBug: null,

        detect: detect
    };

    return browserDetector;

    function detect() {
        browserDetector.isInternetExplorer = isInternetExplorer();
        browserDetector.isMobileDevice = isMobileDevice();
        browserDetector.isSupportedMobile = isSupportedMobile();
        browserDetector.isSupportedBrowser = isSupportedBrowser();
        browserDetector.isChromeWithPageCoordsBug = isChromeWithPageCoordsBug();
    }

    function isChromeWithPageCoordsBug() {
        if (ua.match(/(chrome)\/?\s*([\d\.]+)/i)) {
            return window.navigator.appVersion.match(/Chrome\/(.*?) /)[1] == "38.0.2125.102";
        }
        return false;
    }

    function isInternetExplorer() {
        return ua.indexOf("MSIE ") > 0 || !!ua.match(/.*rv\:11\./);
    }

    function isMobileDevice() {
        return ua.indexOf("ipod") !== -1 || ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1 || ua.indexOf("android") !== -1;
    }

    function isSupportedMobile() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            if (parseInt(v[1], 10) >= 6) {
                return true;
            }
        }

        //Android is supported but not chrome, opera or firefox
        return ua.indexOf("android") !== -1 && ua.indexOf("opera") === -1 && ua.indexOf("firefox") === -1;
    }

    function isSupportedBrowser() {
        // Opera is not supported
        if (navigator.appName.toLowerCase() == "opera" || navigator.userAgent.indexOf("OPR") != -1) {
            return false;
        }

        //IE 9+, Chrome 28+, Firefox 22+, Safari 5+ are supported
        var N = navigator.appName, tem,
            M = ua.match(/(chrome|safari|firefox|msie)\/?\s*([\d\.]+)/i) || [];

        M = M[2] ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) !== null) {
            M[2] = tem[1];
        }

        var browser = M[0].toLowerCase();
        var version = parseInt(M[1], 10);

        if (browser == "chrome" && version >= 28 ||
            browser == "msie" && version >= 9 ||
            browser == "firefox" && version >= 22 ||
            browser == "safari" && version >= 533) {
            return true;
        }

        // IE 11 is supported
        if (ua.indexOf('rv:11.0') != -1) {
            return true;
        }

        return false;
    }

});