#!/usr/bin/env jest

'use strict';

const tcbbcode = require('..');
const bbcode_examples = require('./bbcode_examples');

if (process.env.NODE_ENV === 'test') {
    describe('tcbbcode', function () {
        test.each(bbcode_examples.concat([
            // handles empty input
            ['','',''],
        ]))('| *%s* | `%s` | `%s` |', (description, bbcode, expected) => expect(tcbbcode(bbcode)).toBe(expected));

        test.each([
            '[b]example',
            '[b]example[/i]',
            '[b][i] asdf [/b][/i]',
            '[li][b]example[/b][/li]',
            '[list][b][li]example[/li][/b][/list]',
            '[color=skyblue]example[/color]',
            '[table][td][tr]example[/tr][/td][/table]',
            '[url=javascript:alert(\'example\')]example[/url]',
        ])('%s throws', bbcode => expect(() => tcbbcode(bbcode)).toThrow());
    });
}

