"use strict";

const cliServer = require("..");
const assert = require("assert").strict;

assert.strictEqual(cliServer(), "Hello from cliServer");
console.info("cliServer tests passed");
