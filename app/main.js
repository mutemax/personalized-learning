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

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'dataContext', 'bootstrapper', 'Q', 'modulesInitializer', 'templateSettings', 'settingsReader', 'translation'],
    function (system, app, viewLocator, dataContext, bootstrapper, Q, modulesInitializer, templateSettings, settingsReader, translation) {
        app.title = '';
        system.debug(true);

        app.start().then(function () {
            bootstrapper.run();
            viewLocator.useConvention();

            var modules = {};

            modules['modules/localStorage_progresstracker'] = true;

            return dataContext.initialize().then(function () {
                return readPublishSettings().then(function () {
                    return readTemplateSettings().then(function (settings) {
                        return initTemplateSettings(settings).then(function () {
                            return initTranslations(settings).then(function () {

                                modulesInitializer.register(modules);
                                app.setRoot('viewmodels/shell');
                            });
                        });
                    });
                });
            })["catch"](function (e) {
                console.error(e);
            });

            function readPublishSettings() {
                return settingsReader.readPublishSettings().then(function (settings) {
                    _.each(settings.modules, function (module) {
                        modules['../includedModules/' + module.name] = true;
                    });

                    initProgressTracking(settings);
                });
            }

            function readTemplateSettings() {
                return settingsReader.readTemplateSettings();
            }

            function initTemplateSettings(settings) {
                return templateSettings.init(settings).then(function () {
                    modules['xApi/initializer'] = templateSettings.xApi;
                });
            }

            function initTranslations(settings) {
                return translation.init(settings.languages.selected, settings.languages.customTranslations);
            }

            function initProgressTracking(publishSettings) {
                if (!isLmsInitizlized()) {
                    modules['modules/progressTracker'] = true;
                }

                function isLmsInitizlized() {
                    if (publishSettings && publishSettings.modules) {
                        return _.some(publishSettings.modules, function (module) {
                            return module.name === 'lms';
                        });
                    }

                    return false;
                }
            }
        });
    });