const tsconfig = require('./base.json');

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: require('jest-module-name-mapper')(tsconfig)
};
