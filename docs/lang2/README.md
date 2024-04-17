# Lang2

Interpreter of lambda calculus with explicit substitution.

- The meaning of scheme's `(let)` can be viewed as explicit substitution.
  But the `let` here is like scheme's `(let*)`,
  and we use `where` as syntax for explicit substitution instead.

```cicada
let name = body
function name(arg, ...) body
import "./file.scm"
compute exp

f(a)
f(a, b)
(name) => ret
exp where {
  name = exp
  name = exp
}
{
  let name = exp
  return body
}
```
