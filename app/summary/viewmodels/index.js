define(['entities/course', 'browserDetector', 'knockout', '_', 'plugins/router'],
    function (course, browserDetector, ko, _, router) {
        "use strict";

        var viewModel = {
            activate: activate,

            objectives: [],
            progress: 0,

            isClosing: ko.observable(false),
            isClosed: ko.observable(false),
            close: close
        };

        return viewModel;

        function activate() {
            viewModel.objectives = _.map(course.objectives, function (objective) {
                return { title: objective.title, score: objective.score() };
            });
            viewModel.progress = course.score();
        }

        function close() {
            if (viewModel.isClosed()) {
                return;
            }

            router.reset();

            viewModel.isClosing(true);
            course.finish().then(function () {
                viewModel.isClosing(false);
                window.close();
                if (!browserDetector.isInternetExplorer) {
                    _.delay(function () {
                        viewModel.isClosed(true);
                        window.alert('Thank you. It is now safe to close this page.');
                    }, 100);
                }
            });
        }

    }
);