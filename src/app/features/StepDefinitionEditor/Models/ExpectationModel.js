'use strict';

// Dependencies:
import angular from 'angular';
import ArgumentModel from '../../ComponentEditor/Models/ArgumentModel';
import ASTService from '../../../Core/Services/ASTService';
import StringToLiteralService from '../../../Core/Services/StringToLiteralService';

function createExpectationModelConstructor (
    ArgumentModel,
    astService,
    stringToLiteralService
) {
    const action = Symbol();
    const args = Symbol();
    const component = Symbol();
    const step = Symbol();

    return class ExpectationModel {
        constructor (_step) {
            this[step] = _step;

            let [componentInstance] = this.step.stepDefinition.componentInstances;
            this.component = componentInstance;

            this.conditions = ['equal', 'contain'];
            let [condition] = this.conditions;
            this.condition = condition;

            this.value = '';
        }

        get step () {
            return this[step];
        }

        get component () {
            return this[component];
        }
        set component (newComponent) {
            this[component] = newComponent;
            let [action] = this.component.component.actions
            this.action = action;
        }

        get action () {
            return this[action];
        }
        set action (newAction) {
            this[action] = newAction;
            this[args] = parseArguments.call(this);
        }

        get arguments () {
            return this[args];
        }

        get ast () {
            return toAST.call(this);
        }
    }

    function toAST () {
        let expectationArguments = this.arguments.map(argument => argument.ast);
        let expectedResult = astService.literal(stringToLiteralService.toLiteral(this.value));

        let action = astService.identifier(this.action.variableName);
        let component = astService.identifier(this.component.variableName);
        let condition = astService.identifier(this.condition);

        let template = 'expect(<%= component %>.<%= action %>(%= expectationArguments %)).to.eventually.<%= condition %>(<%= expectedResult %>); ';

        return astService.template(template, { action, component, condition, expectationArguments, expectedResult }).expression;
    }

    function parseArguments () {
        return this.action.parameters.map(parameter => {
            return new ArgumentModel(null, {
                name: parameter.name
            });
        });
    }
}

export default angular.module('tractor.expectationModel', [
    ArgumentModel.name,
    ASTService.name,
    StringToLiteralService.name
])
.factory('ExpectationModel', createExpectationModelConstructor);
