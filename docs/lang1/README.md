# Lang1

Interpreter of lambda calculus with explicit substitution.

- The meaning of scheme's `(let)` can be viewed as explicit substitution.

```scheme
(define name body)
(define (name arg ...) body)
(import name ... "./file.scm")

(lambda (name) ret)
(let ([name exp] ...) body)
```
