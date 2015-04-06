requirejs.config({
    paths: {
        'text': '../js/require/text',
        'durandal': '../js/durandal',
        'plugins': '../js/durandal/plugins',
        'transitions': '../js/durandal/transitions'
    },
    urlArgs: 'v=' + Math.random()
});

define('knockout', function () { return window.ko; });
define('jquery', function () { return window.jQuery; });
define('Q', function () { return window.Q; });
define('_', function () { return window._; });

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'dataContext', 'courseSettingsModule', 'bootstrapper', 'browserDetector', 'Q', 'modulesInitializer', 'publishSettingsModule'],
    function (system, app, viewLocator, dataContext, courseSettingsModule, bootstrapper, browserDetector, Q, modulesInitializer, publishSettingsModule) {
        app.title = '';

        app.configurePlugins({
            widget: true
        });

        app.start().then(function () {
            var startupModules = [];
            var rootView = 'viewmodels/shell';
            var modules = [];

            bootstrapper.run();

            browserDetector.detect();

            if (!browserDetector.isSupportedMobile && !browserDetector.isSupportedBrowser) {
                $('html').css('height', '100%');

                rootView = 'viewmodels/notSupportedBrowser';
                var $body = $('body');

                if (browserDetector.isIos || browserDetector.isAndroid) {
                    $body.addClass('mobile');
                    browserDetector.isIos ? $body.addClass('ios') : $body.addClass('android');
                } else {
                    browserDetector.isMac ? $body.addClass('mac') : $body.addClass('windows');
                }
            } else {
                startupModules.push(dataContext.initialize());
                startupModules.push(courseSettingsModule.initialize());
                startupModules.push(publishSettingsModule.initialize());
            }

            return Q.all(startupModules).then(function () {
                _.each(publishSettingsModule.publishSettings.modules, function (module) {
<<<<<<< HEAD
                    modules['../includedModules/' + module.name] = true;
=======
					modules['../includedModules/' + module.name] = true;
>>>>>>> upstream/master
                });
                modulesInitializer.register(modules);

                viewLocator.useConvention();
                app.setRoot(rootView);
            });
        });
    });