define(['entities/Multipleselect',
    'entities/FillInTheBlanks',
    'entities/DragAndDrop',
    'entities/Multiplechoice',

    './Multipleselect',
    './FillInTheBlanks',
    './DragAndDrop',
    './Multiplechoice'
], function (Multipleselect, FillInTheBlanks, DragAndDrop, Multiplechoice, MultipleselectViewModel, FillInTheBlanksViewModel, DragAndDropViewModel, MultiplechoiceViewModel) {

    return {
        createQuestionViewModel: function (question) {
            if (question instanceof Multipleselect) {
                return new MultipleselectViewModel(question);
            }

            if (question instanceof FillInTheBlanks) {
                return new FillInTheBlanksViewModel(question);
            }

            if (question instanceof DragAndDrop) {
                return new DragAndDropViewModel(question);
            }

            if (question instanceof Multiplechoice) {
                return new MultiplechoiceViewModel(question);
            }

            throw 'Unknown question type';
        }
    }

})