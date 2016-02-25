'use strict';

// Utilities:
import assert from 'assert';

// Dependencies:
import angular from 'angular';
import ArgumentModel from '../Models/ArgumentModel';
import ASTService from '../../../Core/Services/ASTService';

class ArgumentParserService {
    constructor (
        ArgumentModel,
        astService
    ) {
        this.ArgumentModel = ArgumentModel;
        this.astService = astService;
    }

    parse (method, argument, ast) {
        try {
            argument = new this.ArgumentModel(method, argument);
            parseValue(argument, ast);

            return argument;
        } catch (e) {
            console.warn('Invalid argument:', this.astService.toJS(ast));
            return null;
        }
    }
}

function parseValue (argument, ast) {
    argument.value = ast.name || ast.value;
    assert(argument.value !== undefined);
}

export default angular.module('argumentParserService', [
    ArgumentModel.name,
    ASTService.name
])
.service('argumentParserService', ArgumentParserService);
