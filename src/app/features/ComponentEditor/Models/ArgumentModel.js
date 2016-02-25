'use strict';

// Dependencies:
import angular from 'angular';
import ASTService from '../../../Core/Services/ASTService';
import StringToLiteralService from '../../../Core/Services/StringToLiteralService';

// Symbols;
const argument = Symbol();
const method = Symbol();

function createArgumentModelConstructor (
    astService,
    stringToLiteralService
) {
    return class ArgumentModel {
        constructor (_method, _argument) {
            this[argument] = _argument;
            this[method] = _method;

            this.value = '';
        }

        get method () {
            return this[method] || null;
        }

        get name () {
            return this[argument] ? this[argument].name : false;
        }

        get description () {
            return this[argument] ? this[argument].description : false;
        }

        get type () {
            return this[argument] ? this[argument].type : false;
        }

        get required () {
            return this[argument] ? this[argument].required : false;
        }

        get ast () {
            return toAST.call(this);
        }
    }

    function toAST () {
        let literal = stringToLiteralService.toLiteral(this.value);
        let parameter = findParameter.call(this);
        let result = findResult.call(this);

        if (!angular.isUndefined(literal) && literal !== this.value) {
            return astService.literal(literal);
        } else if (parameter) {
            return astService.identifier(parameter.variableName);
        } else if (result) {
            return astService.identifier(this.value);
        } else if (this.value) {
            return astService.literal(this.value);
        } else {
            return astService.literal(null);
        }
    }

    function findParameter () {
        return this.method && this.method.interaction.action.parameters.find(parameter => {
            return parameter.name === this.value;
        });
    }

    function findResult () {
        return this.method && this.method.interaction.action.interactions.find(interaction => {
            let returns = interaction.method[interaction.method.returns];
            return returns ? returns.name === this.value : false;
        });
    }
}

export default angular.module('tractor.argumentModel', [
    ASTService.name,
    StringToLiteralService.name
])
.factory('ArgumentModel', createArgumentModelConstructor);
