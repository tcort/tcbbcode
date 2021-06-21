#!/usr/bin/env jest

'use strict';

const tcbbcode = require('..');

if (process.env.NODE_ENV === 'test') {
    describe('tcbbcode', function () {
        test.each([

            // handles empty input
            ['','',''],

            // handles input with no tags
            ['Text', 'example','example'],

            // renders each tag properly
            ['Bold', '[b]example[/b]','<span class="bbcode-b" style="font-weight: bold;">example</span>'],
            ['Italic', '[i]example[/i]','<span class="bbcode-i" style="font-style: italic;">example</span>'],
            ['Underline', '[u]example[/u]','<span class="bbcode-u" style="text-decoration: underline;">example</span>'],
            ['Strikethrough', '[s]example[/s]','<span class="bbcode-s" style="text-decoration: line-through;">example</span>'],
            ['Size', '[size=12]example[/size]','<span class="bbcode-size" style="font-size: 12pt;">example</span>'],
            ['Size', '[style size=12]example[/style]','<span class="bbcode-size" style="font-size: 12pt;">example</span>'],
            ['Color', '[color=red]example[/color]','<span class="bbcode-color" style="color: red;">example</span>'],
            ['Color', '[color=#FF0000]example[/color]','<span class="bbcode-color" style="color: #ff0000;">example</span>'],
            ['Color', '[style color=red]example[/style]','<span class="bbcode-color" style="color: red;">example</span>'],
            ['Color', '[style color=#ff0000]example[/style]','<span class="bbcode-color" style="color: #ff0000;">example</span>'],
            ['Center', '[center]example[/center]','<div class="bbcode-center" style="text-align: center;">example</div>'],
            ['Left', '[left]example[/left]','<div class="bbcode-left" style="text-align: left;">example</div>'],
            ['Right', '[right]example[/right]','<div class="bbcode-right" style="text-align: right;">example</div>'],
            ['Quote', '[quote]example[/quote]','<blockquote class="bbcode-quote">example</blockquote>'],
            ['Quote', '[quote=Alice]example[/quote]','<blockquote class="bbcode-quote"><span class="bbcode-quote-name">Alice</span> example</blockquote>'],
            ['Preformatted Text','[pre]example[/pre]', '<pre class="bbcode-pre">example</pre>'],
            ['Code','[code]example[/code]', '<div class="bbcode-code"><pre><code>example</code></pre></div>'],
            ['Code','[code=JavaScript]example[/code]', '<div class="bbcode-code bbcode-code-lang-javascript"><pre><code>example</code></pre></div>'],
            ['Heading 1', '[h1]Heading 1 Text[/h1]', '<h1 class="bbcode-h1">Heading 1 Text</h1>'],
            ['Heading 2', '[h2]Heading 2 Text[/h2]', '<h2 class="bbcode-h2">Heading 2 Text</h2>'],
            ['Heading 3', '[h3]Heading 3 Text[/h3]', '<h3 class="bbcode-h3">Heading 3 Text</h3>'],
            ['Heading 4', '[h4]Heading 4 Text[/h4]', '<h4 class="bbcode-h4">Heading 4 Text</h4>'],
            ['Heading 5', '[h5]Heading 5 Text[/h5]', '<h5 class="bbcode-h5">Heading 5 Text</h5>'],
            ['Heading 6', '[h6]Heading 6 Text[/h6]', '<h6 class="bbcode-h6">Heading 6 Text</h6>'],
            ['Table','[table][tr][th]example[/th][/tr][tr][td]example[/td][/tr][/table]', '<table class="bbcode-table"><tr class="bbcode-tr"><th class="bbcode-th">example</th></tr><tr class="bbcode-tr"><td class="bbcode-td">example</td></tr></table>'],
            ['list', '[list][li]example[/li][/list]', '<ul class="bbcode-list bbcode-ul"><li class="bbcode-li">example</li></ul>'],
            ['list', '[ul][li]example[/li][/ul]', '<ul class="bbcode-list bbcode-ul"><li class="bbcode-li">example</li></ul>'],
            ['list', '[ol][li]example[/li][/ol]', '<ol class="bbcode-list bbcode-ol"><li class="bbcode-li">example</li></ol>'],
            ['Spoiler', '[spoiler]example[/spoiler]', '<span class="bbcode-spoiler">example</span>'],
            ['Link','[url]https://example.com/[/url]', '<a class="bbcode-url" href="https://example.com/">https://example.com/</a>'],
            ['Link','[url=https://example.com/]example[/url]', '<a class="bbcode-url" href="https://example.com/">example</a>'],
            ['Image','[img]https://example.com/example/example.png[/img]', '<img class="bbcode-img" src="https://example.com/example/example.png" alt="example.png" />'],
            ['Image','[img=640x480]https://example.com/example/example.png[/img]', '<img class="bbcode-img" src="https://example.com/example/example.png" alt="example.png" width="640" height="480" />'],
            ['Image','[img width=640 height=480]https://example.com/example/example.png[/img]', '<img class="bbcode-img" src="https://example.com/example/example.png" alt="example.png" width="640" height="480" />'],
            ['Youtube','[youtube]dQw4w9WgXcQ[/youtube]', '<div class="bbcode-youtube"><iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'],

        ])('| *%s* | `%s` | `%s` |', (description, bbcode, expected) => {
            expect(tcbbcode(bbcode)).toBe(`<div class="bbcode">${expected}</div>`);
        });

        test.each([
            '[b]example',
            '[b]example[/i]',
            '[b][i] asdf [/b][/i]',
            '[li][b]example[/b][/li]',
            '[list][b][li]example[/li][/b][/list]',
            '[color=skyblue]example[/color]',
            '[table][td][tr]example[/tr][/td][/table]',
            '[url=javascript:alert(\'example\')]example[/url]',
        ])('%s throws', (bbcode) => {
            expect(() => tcbbcode(bbcode)).toThrow();
        });
    });
}

