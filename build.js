({
    name: "main",
    baseUrl: 'app',
    mainConfigFile: 'app/main.js',
    include: [
		'jquery',
		'text',
		'Q',
		'knockout',
		'bootstrapper',
		'browserDetector',
		'controller',
		'courseSettingsModule',
		'customBindings',
		'dataContext',
		'eventManager',
		'loader',
        'imagePreview',
		'xApi/viewmodels/login',
		'xApi/verbs',
		'xApi/utils/dateTimeConverter',
		'xApi/utils/base64',
		'xApi/statementsQueueHandler',
		'xApi/statementsQueue',
		'xApi/requestsTransport/xDomainRequestTransport',
		'xApi/requestsTransport/requestSender',
		'xApi/requestsTransport/corsRequestTransport',
		'xApi/initializer',
		'xApi/guard',
		'xApi/errorHandling/errorDialog',
		'xApi/entities/verb',
		'xApi/entities/statement',
		'xApi/entities/score',
		'xApi/entities/result',
		'xApi/entities/object',
		'xApi/entities/contextActivities',
		'xApi/entities/context',
		'xApi/entities/actor',
		'xApi/entities/activityDefinition',
		'xApi/entities/activity',
		'xApi/configuration/settings',
		'xApi/activityProvider',
		'viewmodels/shell',
		'text!xApi/views/login.html',
		'text!xApi/errorHandling/errorDialog.html',
		'text!views/shell.html',
		'text!views/notSupportedBrowser.html',
		'text!views/Multipleselect.html',
		'text!views/Singleselect.html',
		'text!views/FillInTheBlanks.html',
		'text!views/DragAndDrop.html',
        'text!views/SingleselectImage.html',
		'text!views/404.html',
		'text!summary/views/index.html',
		'text!studying/views/studyadvice.html',
		'text!studying/views/readings.html',
		'text!studying/views/index.html',
		'text!preassessment/views/index.html',
		'text!introduction/views/index.html',
		'summary/viewmodels/index',
		'studying/viewmodels/studyadvice',
		'studying/viewmodels/readings',
		'studying/viewmodels/index',
		'preassessment/viewmodels/index',
		'introduction/viewmodels/index',
		'entities/Objective',
		'entities/Multipleselect',
        'viewmodels/Multipleselect',
		'entities/course',
        'viewmodels/Singleselect',
        'viewmodels/FillInTheBlanks',
        'viewmodels/factory',
        'viewmodels/DragAndDrop',
        'viewmodels/SingleselectImage',
        'entities/Singleselect',
        'entities/FillInTheBlanks',
        'entities/DragAndDrop',
        'entities/SingleselectImage'
    ]
})