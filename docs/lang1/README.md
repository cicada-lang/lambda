# Lang1

Lambda calculus with explicit substitution.

- The meaning of scheme's `(let)` can be viewed as explicit substitution.

```scheme
(define name body)
(define (name arg ...) body)

(lambda (name) ret)
(let ((name exp) ...) body)
```
