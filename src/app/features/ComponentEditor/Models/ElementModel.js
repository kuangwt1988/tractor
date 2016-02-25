'use strict';

// Utilities:
import changecase from 'change-case';

// Dependencies:
import angular from 'angular';
import ASTService from '../../../Core/Services/ASTService';
import ElementMethods from './ElementMethods';
import FilterModel from './FilterModel';
import StringToLiteralService from '../../../Core/Services/StringToLiteralService';

// Symbols:
const component = Symbol();
const filters = Symbol();
const sortableFilters = Symbol();

function createElementModelConstructor (
    astService,
    FilterModel,
    stringToLiteralService
) {
    return class ElementModel {
        constructor (_component) {
            this[component] = _component;
            this[filters] = [];
            this[sortableFilters] = [];

            this.name = '';
            this.methods = [
                ElementMethods.CLICK,
                ElementMethods.SEND_KEYS,
                ElementMethods.GET_TEXT,
                ElementMethods.IS_ENABLED,
                ElementMethods.IS_SELECTED,
                ElementMethods.SUBMIT,
                ElementMethods.CLEAR,
                ElementMethods.IS_DISPLAYED,
                ElementMethods.GET_OUTER_HTML,
                ElementMethods.GET_INNER_HTML
            ];
        }

        get component () {
            return this[component];
        }

        get filters () {
            return this[filters];
        }

        get selector () {
            let [filter] = this.filters;
            return filter;
        }

        get sortableFilters () {
            return this[sortableFilters];
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

        addFilter (filter = new FilterModel(this)) {
            this.filters.push(filter);
            if (this.filters.length > 1) {
                this.sortableFilters.push(filter);
            }
        }

        removeFilter (toRemove) {
            this.filters.splice(this.filters.findIndex(filter => {
                return filter === toRemove;
            }), 1);
            this.sortableFilters.splice(this.sortableFilters.findIndex(sortableFilter => {
                return sortableFilter === toRemove;
            }), 1);
        }

        getAllVariableNames () {
            return this.component.getAllVariableNames(this);
        }
    };

    function toAST () {
        let element = astService.identifier(this.variableName);
        let filters = filtersAST.call(this);

        let template = 'this.<%= element %> = <%= filters %>;';

        return astService.expression(template, { element, filters });
    }

    function filtersAST () {
        let template = '';
        let fragments = {};
        this.filters.reduce((previousFilter, filter, index) => {
            let filterTemplate = `<%= filter${index} %>`;
            if (template.length) {
                template += filterAfterFilterAST(previousFilter, filter, filterTemplate);
            } else {
                template += filterAST(filter, filterTemplate);
            }

            fragments[`filter${index}`] = filter.ast;

            return filter;
        }, {});

        return astService.expression(template, fragments);
    }

    function filterAST (filter, filterTemplate) {
        if (filter.isGroup) {
            return `element.all(${filterTemplate})`;
        } else {
            return `element(${filterTemplate})`;
        }
    }

    function filterAfterFilterAST (previousFilter, filter, filterTemplate) {
        if (previousFilter.isGroup) {
            filter.isNested = true;
            return filterAfterGroupFilter(filter, filterTemplate);
        } else {
            return filterAfterSingleFilter(filter, filterTemplate);
        }
    }

    function filterAfterGroupFilter (filter, filterTemplate) {
        let locatorLiteral = stringToLiteralService.toLiteral(filter.locator);
        if (angular.isNumber(locatorLiteral)) {
            return `.get(${filterTemplate})`;
        } else {
            return `.filter(${filterTemplate}).get(0)`;
        }
    }

    function filterAfterSingleFilter (filter, filterTemplate) {
        if (filter.isGroup) {
            return `.all(${filterTemplate})`;
        } else {
            return `.element(${filterTemplate})`;
        }
    }
}

export default angular.module('tractor.elementModel', [
    ASTService.name,
    FilterModel.name,
    StringToLiteralService.name
])
.factory('ElementModel', createElementModelConstructor);
