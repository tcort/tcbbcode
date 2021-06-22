'use strict';

const bbcode_examples = require('./bbcode_examples');

bbcode_examples.forEach(([ description, input, output ]) => {

    console.log('| *%s* | `%s` | `%s` |', description, input, output);
});
