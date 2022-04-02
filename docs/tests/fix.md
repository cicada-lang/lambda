---
title: Fixpoint combinator
---

[ [WIKIPEDIA](https://en.wikipedia.org/wiki/Fixed-point_combinator) ]

In mathematics, `x` is `f`'s fixpoint if `(f x) = x`.

# fix

In lambda calculus, we have function `fix`,
which can find fixpoint of any function.

```lambda pseudocode
(f (fix f)) = (fix f)
```

Once we have `fix`, we can achieve the following recursive definition

```lambda pseudocode
f = (wrapper f)
```

by non-recursively lambda term.

```lambda pseudocode
f = (fix wrapper)
```

The following `fix` is one way of defining `fix`.

```lambda
(define (fix f)
  ((lambda (x) (f (x x)))
   (lambda (x) (f (x x)))))
```

We will have

```lambda pseudocode
(fix f) =
(f ((lambda (x) (f (x x)))
    (lambda (x) (f (x x))))) =
(f (fix f))
```

# turing-half

Another way of defining `fix`.

```lambda
(define (turing-half x y) (y (x x y)))
(define turing-fix (turing-half turing-half))
```

We will have

```lambda pseudocode
(turing-fix f) =
(turing-half turing-half f) =
(f (turing-half turing-half f)) =
(f (turing-fix f))
```
