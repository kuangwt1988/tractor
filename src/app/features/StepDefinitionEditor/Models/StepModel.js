'use strict';

// Dependencies:
import angular from 'angular';
import ASTService from '../../../Core/Services/ASTService';
import ExpectationModel from './ExpectationModel';
import MockModel from './MockModel';
import TaskModel from './TaskModel';

function createStepModelConstructor (
    astService,
    ExpectationModel,
    TaskModel,
    MockModel
) {
    const expectations = Symbol();
    const mocks = Symbol();
    const stepDefinition = Symbol();
    const tasks = Symbol();

    return class StepModel {
        constructor (_stepDefinition) {
            this[expectations] = [];
            this[mocks] = [];
            this[stepDefinition] = _stepDefinition;
            this[tasks] = [];

            this.stepTypes = ['Given', 'When', 'Then', 'And', 'But'];
        }

        get expectations () {
            return this[expectations];
        }

        get mocks () {
            return this[mocks];
        }

        get stepDefinition () {
            return this[stepDefinition];
        }

        get tasks () {
            return this[tasks];
        }

        addExpectation () {
            this.expectations.push(new ExpectationModel(this));
        }

        removeExpectation (toRemove) {
            this.expectations.splice(this.expectations.findIndex(expectation => {
                return expectation === toRemove;
            }), 1);
        }

        addTask () {
            this.tasks.push(new TaskModel(this));
        }

        removeTask (toRemove) {
            this.tasks.splice(this.tasks.findIndex(task => {
                return task === toRemove;
            }), 1);
        }

        addMock () {
            this.mocks.push(new MockModel(this));
        }

        removeMock (toRemove) {
            this.mocks.splice(this.mocks.findIndex(mock => {
                return mock === toRemove;
            }), 1);
        }

        get ast () {
            return toAST.call(this);
        }
    }

    function toAST () {
        let expectations = this.expectations.map(expectation => expectation.ast);
        let mocks = this.mocks.map(mock => mock.ast);
        let tasks = this.tasks.map(task => task.ast);

        let template = 'this.<%= type %>(<%= regex %>, function (done) { ';
        if (mocks.length) {
            template += '%= mocks %; ';
            template += 'done();';
        } else if (tasks.length) {
            template += 'var tasks = <%= tasks[0] %>';
            tasks.slice(1).forEach((taskAST, index) => {
                template += `.then(function () { return <%= tasks[${index + 1}] %>; })`;
            });
            template += ';';
            template += 'Promise.resolve(tasks).then(done).catch(done.fail);';
        } else if (expectations.length) {
            template += 'Promise.all([%= expectations %]).spread(function () { done(); }).catch(done.fail);';
        } else {
            template += 'done.pending();';
        }
        template += '});';

        let type = astService.identifier(this.type);
        let regex = astService.literal(this.regex);
        return astService.template(template, { type, regex, mocks, tasks, expectations });
    }
}

export default angular.module('tractor.stepModel', [
    ASTService.name,
    ExpectationModel.name,
    MockModel.name,
    TaskModel.name
])
.factory('StepModel', createStepModelConstructor);
