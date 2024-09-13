'use strict';

const markdownlintConfig = require('..');
const assert = require('assert').strict;

assert.strictEqual(markdownlintConfig(), 'Hello from markdownlintConfig');
console.info('markdownlintConfig tests passed');
