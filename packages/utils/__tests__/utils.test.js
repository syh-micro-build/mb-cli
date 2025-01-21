"use strict";

const cliUtils = require("../lib");
const assert = require("assert").strict;

assert.strictEqual(cliUtils(), "Hello from cliUtils");
console.info("cliUtils tests passed");
