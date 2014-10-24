define(['entities/Multipleselect',
    'entities/FillInTheBlanks',
    'entities/DragAndDrop',
    'entities/Singleselect',
    'entities/SingleselectImage',
    'entities/TextMatching',
    'entities/Statement',
    'entities/Hotspot',

    './Multipleselect',
    './FillInTheBlanks',
    './DragAndDrop',
    './Singleselect',
    './SingleselectImage',
    './TextMatching',
    './Statement',
    './Hotspot'
], function (Multipleselect, FillInTheBlanks, DragAndDrop, Singleselect, SingleselectImage, TextMatching, Statement, Hotspot, MultipleselectViewModel, FillInTheBlanksViewModel, DragAndDropViewModel, SingleselectViewModel, SingleselectImageViewModel, TextMatchingViewModel, StatementViewModel, HotspotViewModel) {

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

            if (question instanceof Statement) {
                return new StatementViewModel(question);
            }

            if (question instanceof Hotspot) {
                return new HotspotViewModel(question);
            }

            throw 'Unknown question type';
        }
    }

})