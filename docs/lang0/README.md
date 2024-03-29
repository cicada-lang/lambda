# Lang0

Lambda calculus.

- Implement call-by-need lazy evaluation.
- A name must be defined before used, thus no mutual recursion.
- Allow non-mutual recursive by `(fixpoint)`.

```scheme
(define name body)
(define (name arg ...) body)
(import "./file.scm")
(assert-equal exp ...)
(assert-not-equal exp ...)

(lambda (name) ret)
(fixpoint name body)
```
