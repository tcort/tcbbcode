#!/usr/bin/env node

const bbcode = require('..');
const fs = require('fs');

const chunks = [];
const instream = process.argv.length === 3 && process.argv[2] !== '-' ? fs.createReadStream(process.argv[2]) : process.stdin;

instream.setEncoding('utf8');
instream.on('data', chunk => chunks.push(chunk));
instream.on('end', () => {
    const data = chunks.join('');
    const lines = data.split('\n');
    const input = lines[0].startsWith('#!') ? lines.slice(1).join('\n') : lines.join('\n');
    const output = bbcode(input);

    process.stdout.write(output);
});
