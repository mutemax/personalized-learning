requirejs.config({
    paths: {
        'text': '../js/require/text',
        'durandal': '../js/durandal',
        'plugins': '../js/durandal/plugins',
        'transitions': '../js/durandal/transitions',
    },
    urlArgs: 'v=' + Math.random()
});

define('knockout', function () { return window.ko; });
define('jquery', function () { return window.jQuery; });
define('Q', function () { return window.Q; });
define('_', function () { return window._; });

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'dataContext', 'courseSettingsModule', 'bootstrapper', 'browserDetector', 'Q', 'modulesInitializer', 'publishSettingsModule'],
    function (system, app, viewLocator, dataContext, courseSettingsModule, boostrapper, browserDetector, Q, modulesInitializer, publishSettingsModule) {
        app.title = '';

        app.start().then(function () {
            var startupModules = [];
            var rootView = 'viewmodels/shell';
            var modules = [];

            browserDetector.detect();

            if (!browserDetector.isSupportedMobile && !browserDetector.isSupportedBrowser) {
                rootView = browserDetector.isMobileDevice ? 'viewmodels/notSupportedMobileBrowser' : 'viewmodels/notSupportedBrowser';
            } else {
                startupModules.push(dataContext.initialize());
                startupModules.push(courseSettingsModule.initialize());
                startupModules.push(publishSettingsModule.initialize());
            }

            return Q.all(startupModules).then(function () {
                _.each(publishSettingsModule.publishSettings.modules, function (module) {
                    modules[module.name] = true;
                });
                modulesInitializer.register(modules);

                viewLocator.useConvention();
                app.setRoot(rootView);
            });
        });
    });