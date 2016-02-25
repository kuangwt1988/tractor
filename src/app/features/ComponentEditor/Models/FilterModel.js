'use strict';

// Utilities:
import dedent from 'dedent';

// Dependencies:
import angular from 'angular';
import ASTService from '../../../Core/Services/ASTService';
import StringToLiteralService from '../../../Core/Services/StringToLiteralService';

// Symbols:
const element = Symbol();
const types = Symbol();

function createFilterModelConstructor (
    astService,
    stringToLiteralService
) {
    return class FilterModel {
        constructor (_element) {
            this[element] = _element;
            this[types] = ['model', 'binding', 'text', 'css', 'options', 'repeater'];

            this.locator = '';
            let [type] = this.types
            this.type = type;
        }

        get element () {
            return this[element];
        }

        get types () {
            return this[types];
        }

        get isGroup () {
            return this.type === 'options' || this.type === 'repeater';
        }

        get isText () {
            return this.type === 'text';
        }

        get ast () {
            return toAST.call(this);
        }
    }

    function toAST () {
        if (this.isNested) {
            return toNestedAST.call(this);
        } else {
            return toSingleAST.call(this);
        }
    }

    function toNestedAST () {
        let locator = astService.literal(this.locator);

        let number = stringToLiteralService.toLiteral(locator.value);
        if (angular.isNumber(number)) {
            return astService.literal(number);
        } else {
            let template = dedent(`
                (function (element) {
                    return element.getText().then(function (text) {
                        return text.indexOf(<%= locator %>) !== -1;
                    });
                });
            `);
            return astService.expression(template, { locator });
        }
    }

    function toSingleAST () {
        let locator = astService.literal(this.locator);
        let type = astService.identifier(this.type);

        let template = '';
        if (this.isText) {
            template += `by.cssContainingText('*', <%= locator %>)`;
            return astService.expression(template, { locator });
        } else {
            template += 'by.<%= type %>(<%= locator %>)';
            return astService.expression(template, { type, locator });
        }
    }
}

export default angular.module('tractor.filterModel', [
    ASTService.name,
    StringToLiteralService.name
])
.factory('FilterModel', createFilterModelConstructor);
