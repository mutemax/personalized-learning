define(['../guard', './object', './activityDefinition'], function (guard, ObjectEntity, ActivityDefinitionEntity) {
    "use strict";

    function Activity(spec) {
        spec.objectType = 'Activity';

        ObjectEntity.call(this, spec);

        guard.throwIfNotString(spec.id, 'You should provide identity for Activity');
        guard.throwIfNotAnObject(spec.definition, 'You should provide definition for Activity');


        this.id = spec.id;
        this.definition = new ActivityDefinitionEntity(spec.definition);
    };

    return Activity;
});