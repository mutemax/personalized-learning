define(['entities/course',
    'entities/Objective',
    'entities/Multipleselect',
    'entities/FillInTheBlanks',
    'entities/DragAndDrop',
    'entities/Singleselect',

     'Q',
     '_',
     'plugins/http'],

     function (course, Objective, Multipleselect, FillInTheBlanks, DragAndDrop, Singleselect, Q, _, http) {
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

                 course.objectives = _.map(response.objectives, function (dobj) {
                     var objective = new Objective(dobj.id, dobj.title);

                     objective.questions = _.map(dobj.questions, function (dq) {

                         dq.type = dq.type || 0;

                         var question;
						 
                         switch (dq.type) {

                             case "multipleSelect":
                                 question = new Multipleselect(dq.id, dq.title, dq.answers);;
                                 break;
                             case "fillInTheBlank":
                                 question = new FillInTheBlanks(dq.id, dq.title, dq.answers);;
                                 break;
                             case "dragAndDropText":
                                 question = new DragAndDrop(dq.id, dq.title, dq.background, dq.dropspots);
                                 break;
                             case "singleSelectText":
                                 question = new Singleselect(dq.id, dq.title, dq.answers);;
                                 break;
                             default:
                                 throw 'Unknow question type';
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

                         return question;
                     });

                     return objective;
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