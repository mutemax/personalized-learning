define([], function () {
    "use strict";

    var ua = navigator.userAgent.toLowerCase();

    var browserDetector = {
        isInternetExplorer: false,
        isSupportedBrowser: null,
        isSupportedMobile: null,
        isChromeWithPageCoordsBug: null,
        isIos: null,
        isMac: null,
        isAndroid: null,

        detect: detect
    };

    return browserDetector;

    function getBrowserInfo() {
        var name = navigator.appName,
            versionInclude = ua.match(/version\/([\.\d]+)/i),
            browserInfo = ua.match(/(chrome|safari|firefox|msie)\/?\s*([\d\.]+)/i) || [];

        browserInfo = browserInfo[2] ? [browserInfo[1], browserInfo[2]] : [name, navigator.appVersion, '-?'];
        if (browserInfo.length && versionInclude != null) browserInfo[2] = versionInclude[1];

        var browser = browserInfo[0].toLowerCase();
        var version = parseInt(browserInfo[1], 10);

        return { browser: browser, version: version };
    }

    function detect() {
        var browserInfo = getBrowserInfo();
        browserDetector.isInternetExplorer = isInternetExplorer();
        browserDetector.isSupportedMobile = isSupportedMobile();
        browserDetector.isSupportedBrowser = isSupportedBrowser(browserInfo);
        browserDetector.isChromeWithPageCoordsBug = isChromeWithPageCoordsBug();
        browserDetector.isIos = isIos();
        browserDetector.isMac = isMac();
        browserDetector.isAndroid = isAndroid();
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

    function isIos() {
        return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    }

    function isMac() {
        return ua.indexOf('macintosh') != -1 || ua.indexOf('mac os') != -1;
    }

    function isAndroid() {
        return ua.indexOf('android') != -1;
    }

    function isSupportedMobile() {
        if (isIos()) {
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            if (parseInt(v[1], 10) >= 6 && ua.indexOf("opera") == -1 && ua.indexOf("opr") == -1 && ua.indexOf("firefox") == -1 && ua.indexOf("chrome") == -1 && ua.indexOf('crios') == -1) {
                return true;
            }
        }

        //Android is supported but not chrome, opera or firefox
        if (isAndroid() &&
            ua.indexOf("opera") == -1 &&
            ua.indexOf("opr") == -1 &&
            ua.indexOf("firefox") == -1 &&
            parseFloat(ua.slice(ua.indexOf("android") + 8)) > 2.2) {
            return true;
        }

        return false;
    };

    function isSupportedBrowser(browserInfo) {
        if (isIos() || isAndroid()) {
            return false;
        }

        //Mac OS only Safary
        if (isMac()) {
            if (ua.indexOf('opera') != -1 || ua.indexOf("opr") == -1 || ua.indexOf('firefox') != -1 || ua.indexOf('chrome') != -1) {
                return false;
            }
            return true;
        }
        // Opera is not supported
        if (navigator.appName.toLowerCase() == "opera" || navigator.userAgent.indexOf("OPR") != -1)
            return false;

        //Chrome 28+, Firefox 22+, Safari 5+ are supported
        var browser = browserInfo.browser;
        var version = browserInfo.version;

        if (browser == "chrome" && version >= 28 || browser == "firefox" && version >= 22)
            return true;

        // IE 11 is supported
        if (ua.indexOf('rv:11.0') != -1) {
            return true;
        }

        return false;
    };
});