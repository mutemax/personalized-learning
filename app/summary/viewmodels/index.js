define(['entities/course', 'browserDetector', 'knockout', '_'],
    function (course, browserDetector, ko, _, router) {
        "use strict";

        var self = {
            isCourseFinished: false
        }

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

            course.finish().then(function () {
                self.isCourseFinished = true;
            });
        }

        function close() {
            if (viewModel.isClosed()) {
                return;
            }

            viewModel.isClosing(true);

            if (self.isCourseFinished) {
                viewModel.isClosing(false);
                window.close();
                if (!browserDetector.isInternetExplorer) {
                    _.delay(function() {
                        viewModel.isClosed(true);
                        window.alert('Thank you. It is now safe to close this page.');
                    }, 100);
                }
            } else {
                setTimeout(close, 100);
            }
        }
    }
);