# Documeta
### Native, js documentation library leveraging [object-metadata](https://github.com/micimize/object-metadata)

Note: this is currently a barebonese expirement. If you're looking for robust documentation tooling, I'd recommend [documentation.js](http://documentation.js.org/).

### Usage:
```javascript
import doc from 'documeta'

doc.get(doc)
/* =>
  es6 template string tag that expands into meta({ docstring }).
  If terminated with "meta:" on an othewise empty line,
  will instead return a function for accepting more metadata.
*/

const arrayify = doc`
  wraps defined non-array elements in an array,
  always returns an array.

  meta: `({
  examples: [
    {input: ['foo'], output: ['foo']},
    {input: 'foo', output: ['foo']},
    {input: undefined, output: []}
  ]
})(
  function arrayify(val){
    return Array.isArray(val) ? val : (val !== undefined ? [val] : [])
  }
)
doc.get(arrayify)
/* =>
  wraps defined non-array elements in an array,
  always returns an array.
*/
```

