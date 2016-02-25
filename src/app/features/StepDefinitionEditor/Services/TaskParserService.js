'use strict';

// Utilities:
import assert from 'assert';

// Dependencies:
import angular from 'angular';
import ASTService from '../../../Core/Services/ASTService';
import TaskModel from '../Models/TaskModel';

class TaskParserService {
    constructor (
        astService,
        TaskModel
    ) {
        this.astService = astService;
        this.TaskModel = TaskModel;
    }

    parse (step, ast) {
        try {
            this.parseNextTask(step, ast);

            let parsers = [parseFirstTask, parseSubsequentTask];
            let taskCallExpression = parseTaskCallExpression.call(this, ast, parsers);

            try {
                return parseTask.call(this, step, taskCallExpression);
            } catch (e) {}

            throw new Error();
        } catch (e) {
            console.warn('Invalid task:', this.astService.toJS(ast));
            return null;
        }
    }

    parseNextTask (step, ast) {
        try {
            assert(ast.callee.object.callee);
            this.parse(step, ast.callee.object);
        } catch (e) {}
    }
}

function parseTaskCallExpression (ast, parsers) {
    let taskCallExpression = null;
    parsers.filter(parser => {
        try {
            taskCallExpression = parser.call(this, ast);
        } catch (e) { }
    });
    if (!taskCallExpression) {
        throw new Error();
    }
    return taskCallExpression;
}

function parseFirstTask (ast) {
    assert(ast.callee.object.name && ast.callee.property.name);
    return ast;
}

function parseSubsequentTask (ast) {
    let [thenFunctionExpression] = ast.arguments;
    let [taskReturnStatement] = thenFunctionExpression.body.body;
    let { argument } = taskReturnStatement;
    assert(argument.callee.object.name && argument.callee.property.name);
    return argument;
}

function parseTask (step, taskCallExpression) {
    let task = new this.TaskModel(step);
    task.component = task.step.stepDefinition.componentInstances.find(componentInstance => {
        return taskCallExpression.callee.object.name === componentInstance.variableName;
    });
    assert(task.component);
    task.action = task.component.component.actions.find(action => {
        return taskCallExpression.callee.property.name === action.variableName;
    });
    assert(task.action);
    taskCallExpression.arguments.forEach((argument, index) => {
        task.arguments[index].value = argument.value;
    });
    task.step.tasks.push(task);
    return true;
}

export default angular.module('tractor.taskParserService', [
    ASTService.name,
    TaskModel.name
])
.service('taskParserService', TaskParserService);
