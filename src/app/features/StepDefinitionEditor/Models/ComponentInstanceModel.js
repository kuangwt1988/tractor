'use strict';

// Utilities:
import changecase from 'change-case';
import path from 'path';

// Dependencies:
import angular from 'angular';
import ASTService from '../../../Core/Services/ASTService';

function createComponentInstanceModelConstructor (
    astService
) {
    const component = Symbol();
    const stepDefinition = Symbol();

    return class ComponentInstanceModel {
        constructor (_component, _stepDefinition) {
            this[component] = _component;
            this[stepDefinition] = _stepDefinition;
        }

        get component () {
            return this[component];
        }

        get stepDefinition () {
            return this[stepDefinition];
        }

        get name () {
            return this.component.name;
        }

        get variableName () {
            return changecase.camel(this.component.name);
        }

        get meta () {
            return {
                name: this.name
            };
        }

        get ast () {
            return toAST.call(this);
        }
    }

    function toAST () {
        let template = 'var <%= constructor %> = require(<%= relativePath %>), ';
        template += '<%= name %> = new <%= constructor %>(); ';

        // Sw33t hax()rz to get around the node "path" shim not working on Windows.
        let stepDefinitionPath = this.stepDefinition.path.replace(/^[A-Z]:\\/, '').replace(/\\/g, '/');
        let componentPath = this.component.path.replace(/^[A-Z]:\\/, '').replace(/\\/g, '/');
        let relativePath = path.relative(path.dirname(stepDefinitionPath), componentPath);
        relativePath = astService.literal(relativePath);

        let constructor = astService.identifier(this.component.variableName);
        let name = astService.identifier(this.variableName);

        return astService.template(template, { constructor, relativePath, name });
    }
}

export default angular.module('tractor.componentInstanceModel', [
    ASTService.name
])
.factory('ComponentInstanceModel', createComponentInstanceModelConstructor);
