define(['entities/course', 'knockout', '_', 'windowOperations'],
    function (course, ko, _, windowOperations) {
        "use strict";

        var self = {
            isCourseFinished: false
        }

        var viewModel = {
            activate: activate,

            sections: [],
            progress: 0,

            isClosing: ko.observable(false),
            isClosed: ko.observable(false),
            close: close
        };

        return viewModel;

        function activate() {
            viewModel.sections = _.map(course.sections, function (section) {
                return { title: section.title, score: section.score() };
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
                windowOperations.close(function() { viewModel.isClosed(true); });
            } else {
                setTimeout(close, 100);
            }
        }
    }
);