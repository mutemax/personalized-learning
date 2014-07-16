define([], function () {
    "use strict";

    var verbs = {};

    verbs.started = {
        id: "http://adlnet.gov/expapi/verbs/launched",
        display: { "en-US": "started" }
    };

    verbs.stopped = {
        id: "http://adlnet.gov/expapi/verbs/exited",
        display: { "en-US": "stopped" }
    };

    verbs.passed = {
        id: "http://adlnet.gov/expapi/verbs/passed",
        display: { "en-US": "passed" }
    };

    verbs.failed = {
        id: "http://adlnet.gov/expapi/verbs/failed",
        display: { "en-US": "failed" }
    };

    verbs.experienced = {
        id: "http://adlnet.gov/expapi/verbs/experienced",
        display: { "en-US": "experienced" }
    };

    verbs.answered = {
        id: "http://adlnet.gov/expapi/verbs/answered",
        display: { "en-US": "answered" }
    };

    verbs.mastered = {
        id: "http://adlnet.gov/expapi/verbs/mastered",
        display: { "en-US": "mastered" }
    };

    return verbs;
});