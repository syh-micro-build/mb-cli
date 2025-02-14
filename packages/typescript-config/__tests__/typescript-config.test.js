"use strict";

const typescriptConfig = require("..");
const assert = require("assert").strict;

assert.strictEqual(typescriptConfig(), "Hello from typescriptConfig");
console.info("typescriptConfig tests passed");
