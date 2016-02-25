/* global beforeEach:true, describe:true, it:true */
'use strict';

// Angular:
import angular from 'angular';
import 'angular-mocks';

// Utilities:
import chai from 'chai';

// Test setup:
const expect = chai.expect;

// Testing:
import './ASTService';
let astService;

describe('ASTService.js:', () => {
    beforeEach(() => {
        angular.mock.module('tractor.astService');

        angular.mock.inject((_astService_) => {
            astService = _astService_;
        });
    });

    describe('ASTervice.expressionStatement:', () => {
        it('should create a new `expressionStatement` object:', () => {
            let expression = {};

            let expressionStatement = astService.expressionStatement(expression);

            expect(expressionStatement.type).to.equal('ExpressionStatement');
            expect(expressionStatement.expression).to.equal(expression);
        });
    });

    describe('ASTService.identifier:', () => {
        it('should create a new `identifier` object:', () => {
            let name = {};

            let identifier = astService.identifier(name);

            expect(identifier.type).to.equal('Identifier');
            expect(identifier.name).to.equal(name);
        });
    });

    describe('ASTService.literal:', () => {
        it('should create a new `literal` object:', () => {
            let value = {};

            let literal = astService.literal(value);

            expect(literal.type).to.equal('Literal');
            expect(literal.value).to.equal(value);
        });

        it('should have the `raw` value if the literal is a RegExp:', () => {
            let value = /RegExp/;

            let literal = astService.literal(value);

            expect(literal.raw).to.equal('/RegExp/');
        });
    });
});
