# tcbbcode

BBCode to HTML converter.

## Quick Reference

| Name | BBCode Input | HTML Output |
|------|--------|------|
| *Text* | `example` | `example` |
| *Bold* | `[b]example[/b]` | `<b>example</b>` |
| *Italic* | `[i]example[/i]` | `<i>example</i>` |
| *Underline* | `[u]example[/u]` | `<u>example</u>` |
| *Strikethrough* | `[s]example[/s]` | `<s>example</s>` |
| *Deleted* | `[del]example[/del]` | `<del>example</del>` |
| *Inserted* | `[ins]example[/ins]` | `<ins>example</ins>` |
| *Emphasised* | `[em]example[/em]` | `<em>example</em>` |
| *Subscript* | `H[sub]2[/sub]O` | `H<sub>2</sub>O` |
| *Superscript* | `pi*r[sup]2[/sup]` | `pi*r<sup>2</sup>` |
| *Size* | `[size=12]example[/size]` | `<span style="font-size: 12pt;">example</span>` |
| *Size* | `[style size=12]example[/style]` | `<span style="font-size: 12pt;">example</span>` |
| *Color* | `[color=red]example[/color]` | `<span style="color: red;">example</span>` |
| *Color* | `[color=#FF0000]example[/color]` | `<span style="color: #ff0000;">example</span>` |
| *Color* | `[style color=red]example[/style]` | `<span style="color: red;">example</span>` |
| *Color* | `[style color=#ff0000]example[/style]` | `<span style="color: #ff0000;">example</span>` |
| *Background Color* | `[bgcolor=red]example[/bgcolor]` | `<span style="background: red;">example</span>` |
| *Background Color* | `[bgcolor=#ff0000]example[/bgcolor]` | `<span style="background: #ff0000;">example</span>` |
| *Center* | `[center]example[/center]` | `<div style="text-align: center;">example</div>` |
| *Left* | `[left]example[/left]` | `<div style="text-align: left;">example</div>` |
| *Right* | `[right]example[/right]` | `<div style="text-align: right;">example</div>` |
| *Justify* | `[justify]example[/justify]` | `<div style="text-align: justify;">example</div>` |
| *Quote* | `[quote]example[/quote]` | `<blockquote>example</blockquote>` |
| *Preformatted Text* | `[pre]example[/pre]` | `<pre>example</pre>` |
| *Code* | `[code]example[/code]` | `<div><pre><code>example</code></pre></div>` |
| *Code* | `[code=JavaScript]example[/code]` | `<div class="bbcode-code-lang-javascript"><pre><code>example</code></pre></div>` |
| *Heading 1* | `[h1]Heading 1 Text[/h1]` | `<h1>Heading 1 Text</h1>` |
| *Heading 2* | `[h2]Heading 2 Text[/h2]` | `<h2>Heading 2 Text</h2>` |
| *Heading 3* | `[h3]Heading 3 Text[/h3]` | `<h3>Heading 3 Text</h3>` |
| *Heading 4* | `[h4]Heading 4 Text[/h4]` | `<h4>Heading 4 Text</h4>` |
| *Heading 5* | `[h5]Heading 5 Text[/h5]` | `<h5>Heading 5 Text</h5>` |
| *Heading 6* | `[h6]Heading 6 Text[/h6]` | `<h6>Heading 6 Text</h6>` |
| *Table* | `[table][tr][th]example[/th][/tr][tr][td]example[/td][/tr][/table]` | `<table><tr><th>example</th></tr><tr><td>example</td></tr></table>` |
| *list* | `[list][li]example[/li][/list]` | `<ul><li>example</li></ul>` |
| *list* | `[ul][li]example[/li][/ul]` | `<ul><li>example</li></ul>` |
| *list* | `[ol][li]example[/li][/ol]` | `<ol><li>example</li></ol>` |
| *Link* | `[url]https://example.com/[/url]` | `<a href="https://example.com/">https://example.com/</a>` |
| *Link* | `[url=https://example.com/]example[/url]` | `<a href="https://example.com/">example</a>` |
| *Image* | `[img]http://i.imgur.com/FXSBf8c.jpg[/img]` | `<img src="http://i.imgur.com/FXSBf8c.jpg" alt="FXSBf8c.jpg" />` |
| *Image* | `[img=202x304]http://i.imgur.com/FXSBf8c.jpg[/img]` | `<img src="http://i.imgur.com/FXSBf8c.jpg" alt="FXSBf8c.jpg" width="202" height="304" />` |
| *Image* | `[img width=202 height=304]http://i.imgur.com/FXSBf8c.jpg[/img]` | `<img src="http://i.imgur.com/FXSBf8c.jpg" alt="FXSBf8c.jpg" width="202" height="304" />` |
| *Youtube* | `[youtube]dQw4w9WgXcQ[/youtube]` | `<div><iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>` |
| *Horizontal Rule* | `[hr]` | `<hr/>` |
| *Non-breaking Space* | `[nbsp]` | `&nbsp;` |
| *Note* | `[note]example[/note]` | `<!-- example -->` |

### Notes for End Users

- Valid color Names: aqua, black, blue, fuchsia, gray, green, lime, maroon, navy, olive, purple, red, silver, teal, white, and yellow

#### Usage Example

```
const bbcode = require('tcbbcode');

try {
    const output = bbcode(input);
    // ... do something with the output
} catch (err) {
    // ... do something with the error
}
```
