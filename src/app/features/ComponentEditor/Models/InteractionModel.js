'use strict';

// Dependencies:
import angular from 'angular';
import ASTService from '../../../Core/Services/ASTService';
import MethodModel from './MethodModel';

// Symbols:
const action = Symbol();
const element = Symbol();
const method = Symbol();
const methodInstance = Symbol();

function createInteractionModelConstructor (
    astService,
    MethodModel
) {
    return class InteractionModel {
        constructor (_action) {
            this[action] = _action;
        }

        get action () {
            return this[action];
        }

        get element () {
            return this[element];
        }

        set element (newElement) {
            this[element] = newElement;
            let [method] = this.element.methods
            this.method = method;
        }

        get method () {
            return this[method];
        }

        set method (newMethod) {
            this[method] = newMethod;
            this[methodInstance] = new MethodModel(this, this.method);
        }

        get methodInstance () {
            return this[methodInstance];
        }

        get arguments () {
            return this.methodInstance.arguments;
        }

        get ast () {
            return toAST.call(this);
        }
    }

    function toAST () {
        let template = '<%= interaction %>';
        if (this.methodInstance.returns !== 'promise') {
            template = `new Promise(function (resolve) { resolve(${template}); });`;
        }

        let interaction = interactionAST.call(this);
        return astService.expression(template, { interaction });
    }

    function interactionAST () {
        let template = '<%= element %>';
        if (this.element.variableName !== 'browser') {
            template = `self.${template}`;
        }
        template += '.<%= method %>(%= argumentValues %);';

        let element = astService.identifier(this.element.variableName);
        let method = astService.identifier(this.methodInstance.name);
        let argumentValues = this.methodInstance.arguments.map(argument => argument.ast);

        return astService.expression(template, { element, method, argumentValues });
    }
}

export default angular.module('tractor.interactionModel', [
    ASTService.name,
    MethodModel.name
])
.factory('InteractionModel', createInteractionModelConstructor);
