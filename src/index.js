import meta from 'object-metadata'

function normal (template, ...expressions) {
  return template.reduce((accumulator, part, i) => {
    return accumulator + expressions[i - 1] + part
  })
}

const metaMonadRegex = /\n\s*meta:\s*$/

function documentation(...args){
  let documentation = normal(...args)
  if(metaMonadRegex.test(documentation)){
    return data => meta({
      documentation: documentation.replace(metaMonadRegex,''),
      ...data
    })
  } else {
    return meta({ documentation })
  }
}

export const get = documentation`
  Get the documentation attached to the given object
`(
  function get(obj){
    return meta.get(obj).documentation
  }
)

documentation.get = get


export default documentation`
  es6 template string tag that expands into meta({ docstring }).
  If terminated with "meta:" on an othewise empty line,
  will instead return a function for accepting more metadata.

  meta: `({
  examples: [{
    input: ['docstring'],
    output: (f = _=>_) => meta({ documentation: 'docustring' })(f)
  }, {
    input: ['docstring\n\n  meta:'],
    output: (o = {meta: 'data'}) => (f = _=>_) => meta({ documentation: 'docstring', ...o })(f)
  }]
})(
  documentation
)
