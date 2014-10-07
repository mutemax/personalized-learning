define(['entities/course',
    'entities/Objective',
    'entities/Multipleselect',
    'entities/FillInTheBlanks',
    'entities/DragAndDrop',
    'entities/Singleselect',
    'entities/SingleselectImage',
    'entities/TextMatching',
    'entities/Statement',

     'Q',
     '_',
     'plugins/http'],

     function (course, Objective, Multipleselect, FillInTheBlanks, DragAndDrop, Singleselect, SingleselectImage, TextMatching, Statement, Q, _, http) {
         "use strict";

         return {
             initialize: initialize
         };

         function initialize() {
             var dfd = Q.defer();

             $.ajax({
                 url: 'content/data.js?v=' + Math.random(),
                 contentType: 'application/json',
                 dataType: 'json'
             }).done(function (response) {

                 var promises = [];

                 course.id = response.id;
                 course.title = response.title;

                 _.each(response.objectives, function (dobj) {
                     var objective = new Objective(dobj.id, dobj.title);

                     _.each(dobj.questions, function (dq) {
                         var question;

                         switch (dq.type) {
                             case "multipleSelect":
                                 question = new Multipleselect(dq.id, dq.title, dq.answers);
                                 break;
                             case "fillInTheBlank":
                                 var answers = [];
                                 _.each(dq.answerGroups, function (group) {
                                     _.each(group.answers, function (answer) {
                                         if (answer.isCorrect) {
                                             answers.push({
                                                 id: answer.id,
                                                 groupId: group.id,
                                                 text: answer.text
                                             });
                                         }
                                     });
                                 });
                                 question = new FillInTheBlanks(dq.id, dq.title, answers);
                                 break;
                             case "dragAndDropText":
                                 question = new DragAndDrop(dq.id, dq.title, dq.background, dq.dropspots);
                                 break;
                             case "singleSelectText":
                                 question = new Singleselect(dq.id, dq.title, dq.answers);
                                 break;
                             case "singleSelectImage":
                                 question = new SingleselectImage(dq.id, dq.title, dq.answers, dq.correctAnswerId);
                                 break;
                             case "textMatching":
                                 question = new TextMatching(dq.id, dq.title, dq.answers, dq.correctAnswerId);
                                 break;
                             case "statement":
                                 question = new Statement(dq.id, dq.title, dq.answers);
                                 break;
                             default:
                                 return undefined;
                         }

                         if (dq.hasContent) {
                             promises.push(http.get('content/' + dobj.id + '/' + dq.id + '/content.html?v=' + Math.random(), { dataType: 'html' }).then(function (content) {
                                 question.content = content;
                             }));
                         }

                         if (dq.hasCorrectFeedback) {
                             question.correctFeedback = 'content/' + dobj.id + '/' + dq.id + '/correctFeedback.html?v=' + Math.random();
                         }

                         if (dq.hasIncorrectFeedback) {
                             question.incorrectFeedback = 'content/' + dobj.id + '/' + dq.id + '/incorrectFeedback.html?v=' + Math.random();
                         }

                         question.learningContents = _.map(dq.learningContents, function (item) {
                             return 'content/' + dobj.id + '/' + dq.id + '/' + item.id + '.html?v=' + Math.random();
                         });

                         objective.questions.push(question);
                     });

                     if (objective.questions && objective.questions.length) {
                         course.objectives.push(objective);
                     }
                 });

                 if (response.hasIntroductionContent) {
                     promises.push(http.get('content/content.html?v=' + Math.random(), { dataType: 'html' }).then(function (content) {
                         course.content = content;
                     }));
                 }

                 Q.allSettled(promises).then(function () {
                     dfd.resolve();
                 }).catch(function (reason) {
                     dfd.reject(reason);
                 });

             });

             return dfd.promise;
         }

     });