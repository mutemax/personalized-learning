define(['_', 'entities/Question'], function (_, Question) {

    var RankingText = function (id, title, type, answers) {
        var that = this,
            _protected = {
                answer: answer,
                restoreProgress: restoreProgress,
                getProgress: getProgress
            };

        Question.call(that, id, title, type, _protected);

        that.correctOrder = _.map(answers, function (item) {
            return {
                text: item.text
            };
        });

        that.rankingItems = _.shuffle(that.correctOrder);

        function answer(items) {
            var pattern = _.pluck(that.correctOrder, 'text'),
                answered = _.pluck(items, 'text');

            that.score = _.isEqual(pattern, answered) ? 100 : 0;
        }

        function restoreProgress(progress) {
            if (progress === 100) {
                that.rankingItems = that.correctOrder;
                that.score = 100;
                return;
            }
            that.rankingItems = _.map(progress, function (item) {
                return {
                    text: item
                };
            });

            that.score = 0;
        }
        function getProgress() {
            if (that.score == 100) {
                return 100;
            } else {
                return _.pluck(that.rankingItems, 'text');
            }
        }
    };

    return RankingText;

})