define(['knockout', 'Q', 'plugins/http'], function (ko, Q, http) {

    return function (question) {
        this.id = question.id;
        this.title = question.title;

        this.isAnswered = ko.observable(false);
        this.isAnsweredCorrectly = ko.observable(false);

        this.learningContent = ko.observableArray([]);
        this.learningContent.load = function () {
            var that = this;
            var promises = [];
            var content = [];

            _.each(question.learningContents, function (learnignContent, index) {
                promises.push(http.get(learnignContent, { dataType: 'html' }).then(function (loadedContent) {
                    content.push({
                        index: index,
                        content: loadedContent
                    });
                }));
            });


            return Q.all(promises).then(function () {
                that(_.chain(content)
                    .sortBy(function (item) { return item.index; })
                    .map(function (item) { return item.content; })
                    .value());


            }).catch(function (reason) {
                console.error(reason);
            });
        }
    }

});