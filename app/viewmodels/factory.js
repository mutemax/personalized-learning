define(['entities/Multipleselect',
    'entities/FillInTheBlanks',
    'entities/DragAndDrop',
    'entities/Singleselect',
    'entities/SingleselectImage',
    'entities/TextMatching',

    './Multipleselect',
    './FillInTheBlanks',
    './DragAndDrop',
    './Singleselect',
    './SingleselectImage',
    './TextMatching'
], function (Multipleselect, FillInTheBlanks, DragAndDrop, Singleselect, SingleselectImage, TextMatching, MultipleselectViewModel, FillInTheBlanksViewModel, DragAndDropViewModel, SingleselectViewModel, SingleselectImageViewModel, TextMatchingViewModel) {

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

            if (question instanceof TextMatching) {
                return new TextMatchingViewModel(question);
            }

            throw 'Unknown question type';
        }
    }

})