Use unified JSON ADT -- change property names so that there are not preserved property names

```
ambr 'family' '"@type"'

ambr '.kind' '["@kind"]'
ambr 'kind:' '"@kind":'

// in `framework/`

ambr '["@kind"]' '.kind'
ambr '"@kind":' 'kind:'
```

[maybe] use unified JSON ADT -- change `CamelCase` to `camelCase`

fix import local file from repl

rename `parse/` to `syntax/`

tsconfig -- "importsNotUsedAsValues": "error"

top level `evaluate/`
top level `check/`
top level `infer/`
top level `readback/`

fix command line watch

note about readback of recursive function
