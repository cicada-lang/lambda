# Lang0

Interpreter of lambda calculus.

- Implement call-by-need lazy evaluation.
- Support direct and indirect recursion.

```scheme
(define name body)
(define (name arg ...) body)
(import name ... "./file.scm")
(assert-equal exp ...)
(assert-not-equal exp ...)

(lambda (name) ret)
(let ([name exp] ...) body)
```
