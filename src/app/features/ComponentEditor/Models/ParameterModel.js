'use strict';

// Utilities:
import changecase from 'change-case';

// Dependencies:
import angular from 'angular';
import ASTService from '../../../Core/Services/ASTService';

// Symbols:
const action = Symbol();

function createParameterModelConstructor (
    astService
) {
    return class ParameterModel {
        constructor (_action) {
            this[action] = _action;

            this.name = '';
        }

        get action () {
            return this[action];
        }

        get variableName () {
            return changecase.camel(this.name);
        }

        get meta () {
            return {
                name: this.name
            };
        }

        get ast () {
            return toAST.call(this);
        }

        getAllVariableNames () {
            let currentParameter = this;
            return this.action.parameters
            .filter((parameter) => parameter !== currentParameter)
            .map((object) => object.name);
        }
    }

    function toAST () {
        return astService.identifier(this.variableName);
    }
}

export default angular.module('tractor.parameterModel', [
    ASTService.name
])
.factory('ParameterModel', createParameterModelConstructor);
