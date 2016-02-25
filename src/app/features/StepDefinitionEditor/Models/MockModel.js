'use strict';

// Dependencies:
import angular from 'angular';
import ASTService from '../../../Core/Services/ASTService';

function createMockModelConstructor (
    astService
) {
    const step = Symbol();

    return class MockModel {
        constructor (_step) {
            this[step] = _step;

            this.actions = ['GET', 'POST', 'DELETE', 'PUT', 'HEAD', 'PATCH'];
            let [action] = this.actions;
            this.action = action;

            let [mockDataInstance] = this.step.stepDefinition.mockDataInstances;
            this.data = mockDataInstance;

            this.passThrough = false;
            this.url = '';
        }

        get step () {
            return this[step];
        }

        get ast () {
            return toAST.call(this);
        }
    }

    function toAST () {
        let data = {
            url: astService.literal(new RegExp(this.url))
        };
        let template = `httpBackend.when${this.action}(%= url %)`;
        if (this.passThrough) {
            template += '.passThrough(); ';
        } else {
            template += '.respond(%= dataName %); ';
            data.dataName = astService.identifier(this.data.variableName);
        }

        return astService.template(template, data);
    }
}

export default angular.module('tractor.mockModel', [
    ASTService.name
])
.factory('MockModel', createMockModelConstructor);
