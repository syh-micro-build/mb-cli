"use strict";

const typescriptConfig = require("../lib/cli");
const assert = require("assert").strict;

assert.strictEqual(typescriptConfig(), "Hello from typescriptConfig");
console.info("typescriptConfig tests passed");
