'use strict';

const encodeLintCli = require('..');
const assert = require('assert').strict;

assert.strictEqual(encodeLintCli(), 'Hello from encodeLintCli');
console.info('encodeLintCli tests passed');
