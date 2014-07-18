define(['entities/Multipleselect',
    'entities/FillInTheBlanks',
    'entities/DragAndDrop',
    'entities/Singleselect',

    './Multipleselect',
    './FillInTheBlanks',
    './DragAndDrop',
    './Singleselect'
], function (Multipleselect, FillInTheBlanks, DragAndDrop, Singleselect, MultipleselectViewModel, FillInTheBlanksViewModel, DragAndDropViewModel, SingleselectViewModel) {

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

            if (question instanceof Singleselect) {
                return new SingleselectViewModel(question);
            }

            throw 'Unknown question type';
        }
    }

})