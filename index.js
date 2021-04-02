'use strict';

const BBCode = require('./lib/BBCode');
module.exports = (input) => new BBCode().parse(input);
