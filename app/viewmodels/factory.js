define(['entities/Multipleselect',
    'entities/FillInTheBlanks',
    'entities/DragAndDrop',
    'entities/Singleselect',
    'entities/SingleselectImage',

    './Multipleselect',
    './FillInTheBlanks',
    './DragAndDrop',
    './Singleselect',
    './SingleselectImage'
], function (Multipleselect, FillInTheBlanks, DragAndDrop, Singleselect, SingleselectImage, MultipleselectViewModel, FillInTheBlanksViewModel, DragAndDropViewModel, SingleselectViewModel, SingleselectImageViewModel) {

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

            if (question instanceof SingleselectImage) {
                return new SingleselectImageViewModel(question);
            }

            throw 'Unknown question type';
        }
    }

})