'use strict';

// Utilities:
import changecase from 'change-case';
import dedent from 'dedent';

// Dependencies:
import angular from 'angular';
import ActionModel from './ActionModel';
import ASTService from '../../../Core/Services/ASTService';
import BrowserModel from './BrowserModel';
import ElementModel from './ElementModel';

// Symbols:
const actions = Symbol();
const browser = Symbol();
const domElements = Symbol();
const elements = Symbol();
const options = Symbol();

function createComponentModelConstructor (
    astService,
    BrowserModel,
    ElementModel,
    ActionModel
) {
    return class ComponentModel {
        constructor (_options = {}) {
            this[actions] = [];
            this[browser] = new BrowserModel();
            this[domElements] = [];
            this[elements] = [this[browser]];
            this[options] = _options;

            this.name = '';
        }

        get isSaved () {
            return !!this[options].isSaved;
        }

        get path () {
            return this[options].path;
        }

        get actions () {
            return this[actions];
        }

        get browser () {
            return this[browser];
        }

        get domElements () {
            return this[domElements];
        }

        get elements () {
            return this[elements];
        }

        get variableName () {
            return changecase.pascal(this.name);
        }

        get meta () {
            return JSON.stringify({
                name: this.name,
                elements: this.domElements.map(element => element.meta),
                actions: this.actions.map(action => action.meta)
            });
        }

        get ast () {
            return toAST.call(this);
        }

        get data () {
            return this.ast;
        }

        addElement () {
            let element = new ElementModel(this);
            element.addFilter();
            this.elements.push(element);
            this.domElements.push(element);
        }

        removeElement (toRemove) {
            this.elements.splice(this.elements.findIndex(element => {
                return element === toRemove;
            }), 1);
            this.domElements.splice(this.domElements.findIndex(domElement => {
                return domElement === toRemove;
            }), 1);
        }

        addAction () {
            let action = new ActionModel(this);
            this.actions.push(action);
            action.addInteraction();
        }

        removeAction (toRemove) {
            this.actions.splice(this.actions.findIndex(action => {
                return action === toRemove;
            }), 1);
        }

        getAllVariableNames (currentObject = this) {
            let objects = [this].concat(this.elements).concat(this.actions);
            return objects.filter(object => object !== currentObject)
            .map(object => object.name);
        }
    }

    function toAST () {
        let component = astService.identifier(this.variableName);
        let elements = this.domElements.map(element => astService.expressionStatement(element.ast));
        let actions = this.actions.map(action => astService.expressionStatement(action.ast));

        let template = dedent(`
            module.exports = (function () {
                var <%= component %> = function <%= component %> () {
                    %= elements %;
                };
                %= actions %;
                return <%= component %>
            })();
        `);

        return astService.file(astService.expression(template, {
            component,
            elements,
            actions
        }), this.meta);
    }
}

export default angular.module('tractor.componentModel', [
    ActionModel.name,
    ASTService.name,
    BrowserModel.name,
    ElementModel.name
])
.factory('ComponentModel', createComponentModelConstructor);
