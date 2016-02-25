'use strict';

// Utilities:
import changecase from 'change-case';
import path from 'path';

// Dependencies:
import angular from 'angular';
import ASTService from '../../../Core/Services/ASTService';

function createMockDataInstanceModelConstructor (
    astService
) {
    const mockData = Symbol();
    const stepDefinition = Symbol();

    return class MockDataInstanceModel {
        constructor (_mockData, _stepDefinition) {
            this[mockData] = _mockData;
            this[stepDefinition] = _stepDefinition;
        }

        get mockData () {
            return this[mockData];
        }

        get stepDefinition () {
            return this[stepDefinition];
        }

        get name () {
            return this.mockData.name;
        }

        get variableName () {
            return changecase.camel(this.mockData.name);
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
        // Sw33t hax()rz to get around the node "path" shim not working on Windows.
        let stepDefinitionPath = this.stepDefinition.path.replace(/\\/g, '/');
        let mockDataPath = this.mockData.path.replace(/\\/g, '/');
        let relativePath = path.relative(path.dirname(stepDefinitionPath), mockDataPath);
        relativePath = astService.literal(relativePath)
        let name = astService.identifier(this.variableName);

        let template = 'var <%= name %> = require(<%= relativePath %>); ';

        return astService.template(template, { name, relativePath });
    }
}

export default angular.module('tractor.mockDataInstanceModel', [
    ASTService.name
])
.factory('MockDataInstanceModel', createMockDataInstanceModelConstructor);
