'use strict';

// Utilities:
import assert from 'assert';

// Dependencies:
import angular from 'angular';
import ActionModel from '../Models/ActionModel';
import ASTService from '../../../Core/Services/ASTService';
import InteractionParserService from './InteractionParserService';
import ParameterParserService from './ParameterParserService';

class ActionParserService {
    constructor (
        ActionModel,
        astService,
        interactionParserService,
        parameterParserService
    ) {
        this.ActionModel = ActionModel;
        this.astService = astService;
        this.interactionParserService = interactionParserService;
        this.parameterParserService = parameterParserService;
    }

    parse (component, ast, meta) {
        try {
            let action = new this.ActionModel(component);

            let { params } = ast.expression.right;
            parseParameters.call(this, action, params, meta);

            let statements = ast.expression.right.body.body;
            let parsers = [parseSelfThis, parseInteraction];
            tryParse.call(this, action, statements, parsers);

            return action;
        } catch (e) {
            console.warn('Invalid action:', this.astService.toJS(ast));
            return null;
        }
    }
}

function parseParameters (action, params, meta) {
    params.forEach(() => {
        let parameter = this.parameterParserService.parse(action);
        assert(parameter);
        parameter.name = meta.parameters[action.parameters.length].name;
        action.addParameter(parameter);
    });
}

function tryParse (action, statements, parsers) {
    statements.forEach(statement => {
        let parsed = parsers.some(parser => {
            try {
                return parser.call(this, action, statement);
            } catch (e) {}
        });
        if (!parsed) {
            throw new Error();
        }
    });
}

function parseSelfThis (action, statement) {
    let [selfVariableDeclarator] = statement.declarations;
    assert(selfVariableDeclarator.id.name === 'self');
    assert(selfVariableDeclarator.init.type === 'ThisExpression');
    return true;
}

function parseInteraction (action, statement) {
    this.interactionParserService.parse(action, statement);
    return true;
}

export default angular.module('tractor.actionParserService', [
    ActionModel.name,
    ASTService.name,
    InteractionParserService.name,
    ParameterParserService.name
])
.service('actionParserService', ActionParserService);
