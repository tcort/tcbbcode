'use strict';

class BBCode {

    constructor() {
        this.output = '';
        this.openTags = [];
        this.captureUrl = false;
        this.url = '';
        this.params = [];

        this.allowedColors = [
            'aqua',     'black',    'blue',     'fuchsia',
            'gray',     'green',    'lime',     'maroon',
            'navy',     'olive',    'purple',   'red',
            'silver',   'teal',     'white',    'yellow',
        ];

        this.inlineTags = [
            'b',    'i',    'u',    's',
            'url',  'color','style','size',
            'img', 'spoiler',
        ];

        this.blockTags = [
            'center',   'right','left',
            'quote',    'pre',  'code',
            'h1',       'h2',   'h3',   'h4',   'h5',   'h6',
            'table',    'tr',   'th',   'td',
            'list',     'ol',   'ul',   'li',
            'youtube',
        ];
    }

    tagAllowedInContext(tag) {
        const expectParent = (tag) => (this.openTags.length > 0 && this.openTags[this.openTags.length - 1] === tag);

        // block tags cannot be inside inline tags
        if (this.blockTags.includes(tag) && (this.openTags.length > 0 && this.inlineTags.includes(this.openTags[this.openTags.length - 1]))) {
            return false;
        }

        switch (tag) {
            case 'tr': // <tr> must be a child of <table>
                return expectParent('table');
            case 'td': // <td> must be a child of <tr>
                return expectParent('tr');
            case 'th': // <th> must be a child of <tr>
                return expectParent('tr');
            case 'li': // <li> must be child of <ul> or <ol>
                return expectParent('ul') || expectParent('ol') || expectParent('list');
            default:
                return true;
        }
    }

    startTag(tag) {

        if (typeof tag !== 'string') {
            throw new Error('BBCode.startTag(tag): tag must be a string.');
        }

        let colorOrHex;
        let url;

        switch (true) {

            case /^\[b\]$/i.test(tag):
                this.output += '<span class="bbcode-b" style="font-weight: bold;">';
                break;

            case /^\[i\]$/i.test(tag):
                this.output += '<span class="bbcode-i" style="font-style: italic;">';
                break;

            case /^\[u\]$/i.test(tag):
                this.output += '<span class="bbcode-u" style="text-decoration: underline;">';
                break;

            case /^\[s\]$/i.test(tag):
                this.output += '<span class="bbcode-s" style="text-decoration: line-through;">';
                break;

            case /^\[size=[0-9]+\]$/i.test(tag):
                this.output += `<span class="bbcode-size" style="font-size: ${tag.slice(6, -1)}pt;">`;
                break;

            case /^\[style size=[0-9]+\]$/i.test(tag):
                this.output += `<span class="bbcode-size" style="font-size: ${tag.slice(12, -1)}pt;">`;
                break;

            case /^\[color=([A-Za-z]+|#[0-9a-f]{6})\]$/i.test(tag):
                colorOrHex = tag.slice(7, -1).toLowerCase();
                if (!colorOrHex.startsWith('#') && !this.allowedColors.includes(colorOrHex)) {
                    throw new Error('BBCode.startTag(tag): invalid color or hex code');
                }
                this.output += `<span class="bbcode-color" style="color: ${colorOrHex};">`;
                break;

            case /^\[style color=([A-Za-z]+|#[0-9a-f]{6})\]$/i.test(tag):
                colorOrHex = tag.slice(13, -1).toLowerCase();
                if (!colorOrHex.startsWith('#') && !this.allowedColors.includes(colorOrHex)) {
                    throw new Error('BBCode.startTag(tag): invalid color or hex code');
                }
                this.output += `<span class="bbcode-color" style="color: ${colorOrHex};">`;
                break;

            case /^\[center\]$/i.test(tag):
                this.output += '<div class="bbcode-center" style="text-align: center;">';
                break;

            case /^\[left\]$/i.test(tag):
                this.output += '<div class="bbcode-left" style="text-align: left;">';
                break;

            case /^\[right\]$/i.test(tag):
                this.output += '<div class="bbcode-right" style="text-align: right;">';
                break;

            case /^\[quote\]$/i.test(tag):
                this.output += '<blockquote class="bbcode-quote">';
                break;

            case /^\[quote=[^\]]+\]$/i.test(tag):
                this.output += '<blockquote class="bbcode-quote">';
                this.output += `<span class="bbcode-quote-name">${tag.slice(7, -1)}</span> `;
                break;

            case /^\[pre\]$/i.test(tag):
                this.output += '<pre class="bbcode-pre">';
                break;

            case /^\[code\]$/i.test(tag):
                this.output += '<div class="bbcode-code"><pre><code>';
                break;

            case /^\[code=[A-Za-z]+\]$/i.test(tag):
                this.output += `<div class="bbcode-code bbcode-code-lang-${tag.slice(6, -1).toLowerCase()}"><pre><code>`;
                break;

            case /^\[h1\]$/i.test(tag):
                this.output += '<h1 class="bbcode-h1">';
                break;

            case /^\[h2\]$/i.test(tag):
                this.output += '<h2 class="bbcode-h2">';
                break;

            case /^\[h3\]$/i.test(tag):
                this.output += '<h3 class="bbcode-h3">';
                break;

            case /^\[h4\]$/i.test(tag):
                this.output += '<h4 class="bbcode-h4">';
                break;

            case /^\[h5\]$/i.test(tag):
                this.output += '<h5 class="bbcode-h5">';
                break;

            case /^\[h6\]$/i.test(tag):
                this.output += '<h6 class="bbcode-h6">';
                break;

            case /^\[table\]$/i.test(tag):
                this.output += '<table class="bbcode-table">';
                break;

            case /^\[tr\]$/i.test(tag):
                this.output += '<tr class="bbcode-tr">';
                break;

            case /^\[td\]$/i.test(tag):
                this.output += '<td class="bbcode-td">';
                break;

            case /^\[th\]$/i.test(tag):
                this.output += '<th class="bbcode-th">';
                break;

            case /^\[list\]$/i.test(tag):
                this.output += '<ul class="bbcode-list bbcode-ul">';
                break;

            case /^\[ul\]$/i.test(tag):
                this.output += '<ul class="bbcode-list bbcode-ul">';
                break;

            case /^\[ol\]$/i.test(tag):
                this.output += '<ol class="bbcode-list bbcode-ol">';
                break;

            case /^\[li\]$/i.test(tag):
                this.output += '<li class="bbcode-li">';
                break;

            case /^\[spoiler\]$/i.test(tag):
                this.output += '<span class="bbcode-spoiler">';
                break;

            case /^\[img\]$/i.test(tag):
                this.url = '';
                this.captureUrl = true;
                this.params = [];
                break;

            case /^\[img=[1-9][0-9]*x[1-9][0-9]*\]$/i.test(tag):
                this.url = '';
                this.captureUrl = true;
                this.params = tag.slice(5, -1).toLowerCase().split('x');
                break;

            case /^\[img width=[1-9][0-9]* height=[1-9][0-9]*\]$/i.test(tag):
                this.url = '';
                this.captureUrl = true;
                this.params = tag.slice(5, -1).split(' ').map((kv) => kv.split('=')[1]);
                break;

            case /^\[youtube\]$/i.test(tag):
                this.url = '';
                this.captureUrl = true;
                break;

            case /^\[url\]$/i.test(tag):
                this.url = '';
                this.captureUrl = true;
                break;

            case /^\[url=[^\]]+\]$/i.test(tag):
                try {
                    url = new URL(tag.slice(5, -1)).toString();
                    if (/^javascript/i.test(url)) {
                        throw new Error('BBCode.startTag(tag): javascript scheme not allowed');
                    }
                    // normalize and validate URL
                    this.output += `<a class="bbcode-url" href="${url}">`;
                } catch (err) {
                    throw new Error('BBCode.startTag(tag): Invalid URL');
                }
                break;

            default:
                throw new Error('BBCode.startTag(tag): unrecognized BBCode');

        }

        const actualTag = tag.slice(1).split(/[ =\]]/)[0];
        if (!this.tagAllowedInContext(actualTag)) {
            throw new Error('BBCode.startTag(tag): tag not allowed in this context');
        }
        this.openTags.push(actualTag);

    }

    text(txt) {
        if (typeof txt !== 'string') {
            throw new Error('BBCode.text(txt): txt must be a string.');
        }

        if (this.captureUrl) {
            this.url = txt;
        } else {
            this.output += txt;
        }
    }

    endTag(tag) {

        if (typeof tag !== 'string') {
            throw new Error('BBCode.endTag(tag): tag must be a string.');
        }

        switch (true) {

            case /^\[\/b\]$/i.test(tag):
                this.output += '</span>';
                break;

            case /^\[\/i\]$/i.test(tag):
                this.output += '</span>';
                break;

            case /^\[\/u\]$/i.test(tag):
                this.output += '</span>';
                break;

            case /^\[\/s\]$/i.test(tag):
                this.output += '</span>';
                break;

            case /^\[\/size\]$/i.test(tag):
                this.output += '</span>';
                break;

            case /^\[\/style\]$/i.test(tag):
                this.output += '</span>';
                break;

            case /^\[\/color\]$/i.test(tag):
                this.output += '</span>';
                break;

            case /^\[\/center\]$/i.test(tag):
                this.output += '</div>';
                break;

            case /^\[\/left\]$/i.test(tag):
                this.output += '</div>';
                break;

            case /^\[\/right\]$/i.test(tag):
                this.output += '</div>';
                break;

            case /^\[\/quote\]$/i.test(tag):
                this.output += '</blockquote>';
                break;

            case /^\[\/pre\]$/i.test(tag):
                this.output += '</pre>';
                break;

            case /^\[\/code\]$/i.test(tag):
                this.output += '</code></pre></div>';
                break;

            case /^\[\/h1\]$/i.test(tag):
                this.output += '</h1>';
                break;

            case /^\[\/h2\]$/i.test(tag):
                this.output += '</h2>';
                break;

            case /^\[\/h3\]$/i.test(tag):
                this.output += '</h3>';
                break;

            case /^\[\/h4\]$/i.test(tag):
                this.output += '</h4>';
                break;

            case /^\[\/h5\]$/i.test(tag):
                this.output += '</h5>';
                break;

            case /^\[\/h6\]$/i.test(tag):
                this.output += '</h6>';
                break;

            case /^\[\/table\]$/i.test(tag):
                this.output += '</table>';
                break;

            case /^\[\/tr\]$/i.test(tag):
                this.output += '</tr>';
                break;

            case /^\[\/td\]$/i.test(tag):
                this.output += '</td>';
                break;

            case /^\[\/th\]$/i.test(tag):
                this.output += '</th>';
                break;

            case /^\[\/list\]$/i.test(tag):
                this.output += '</ul>';
                break;

            case /^\[\/ul\]$/i.test(tag):
                this.output += '</ul>';
                break;

            case /^\[\/ol\]$/i.test(tag):
                this.output += '</ol>';
                break;

            case /^\[\/li\]$/i.test(tag):
                this.output += '</li>';
                break;

            case /^\[\/spoiler\]$/i.test(tag):
                this.output += '</span>';
                break;

            case /^\[\/img\]$/i.test(tag):
                let params = this.params.length === 2 ? `width="${this.params[0]}" height="${this.params[1]}" ` : '';
                this.params = [];
                if (this.captureUrl) {
                    this.captureUrl = false;
                    try {
                        // normalize and validate URL
                        this.output += `<img class="bbcode-img" src="${new URL(this.url).toString()}" alt="${BBCode.basename(new URL(this.url).pathname)}" ${params}/>`;
                    } catch (err) {
                        throw new Error('Invalid URL');
                    }
                } else {
                    throw new Error('BBCode.endTag(tag): internal error');
                }
                break;

            case /^\[\/youtube\]$/i.test(tag):

                if (this.captureUrl) {
                    this.captureUrl = false;
                    if (/^[A-Za-z0-9_\-]{11}$/.test(this.url)) {
                        this.output += `<div class="bbcode-youtube"><iframe width="560" height="315" src="https://www.youtube.com/embed/${this.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
                    } else {
                        throw new Error('BBCode.endTag(tag): bad youtube_id');
                    }
                } else {
                    throw new Error('BBCode.endTag(tag): internal error');
                }
                break;

            case /^\[\/url\]$/i.test(tag):
                if (this.captureUrl) {
                    this.captureUrl = false;
                    try {
                        // normalize and validate URL
                        this.output += `<a class="bbcode-url" href="${new URL(this.url).toString()}">`;
                        this.output += this.url;
                    } catch (err) {
                        throw new Error('Invalid URL');
                    }
                }
                this.output += '</a>';
                break;

            default:
                throw new Error('BBCode.endTag(tag): unrecognized BBCode');
        }

        const expectedTag = this.openTags.pop();
        const actualTag = tag.slice(2).split(/[ =\]]/)[0];
        if (expectedTag !== actualTag) {
            throw new Error('BBCode.endTag(tag): unbalanced tags');
        }
    }

    done() {
        if (this.openTags.length !== 0) {
            throw new Error('BBCode.done(): missing closing tag(s)');
        }
        const output = this.output;
        this.output = '';
        return output;
    }

    parse(input) {

        if (typeof input !== 'string') {
            throw new Error('BBCode.parse(input): input must be a string.');
        }

        this.output = '';
        this.openTags = [];

        input = BBCode.encodeHtmlEntities(input).split('');

        let token = '';
        let in_tag = false;

        this.output += '<div class="bbcode">';

        while (input.length > 0) {

            const ch = input.shift();

            if (in_tag && ch === ']') {
                token += ch;
                in_tag = false;
                if (token[1] === '/') {
                    this.endTag(token);
                } else {
                    this.startTag(token);
                }
                token = '';
            } else if (!in_tag && ch === '[') {
                input.unshift(ch);
                in_tag = true;
                if (token.length > 0) {
                    this.text(token);
                }
                token = '';
            } else {
                token += ch;
            }

        }

        this.output += token; // append any trailing text

        this.output += '</div>';

        return this.done();

    }

    static encodeHtmlEntities(input) {
        if (typeof input !== 'string') {
            throw new Error('BBCode.encodeEntities(input): input must be a string.');
        }
        return input.replace(/[\u00A0-\u9999<>\&"']/gim, (ch) => `&#${ch.charCodeAt(0)};`);
    }

    static basename(path) {
        return `${path}`.split('/').pop();
    }

}

if (typeof module === 'object' && module !== null) {
    module.exports = BBCode;
}

