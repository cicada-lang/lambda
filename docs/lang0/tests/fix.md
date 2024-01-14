---
title: Fixpoint combinator
---

[ [WIKIPEDIA](https://en.wikipedia.org/wiki/Fixed-point_combinator) ]

In mathematics, `x` is `f`'s fixpoint if `(f x) = x`.

# Y

In lambda calculus, we have function `Y`,
which can find fixpoint of any function.

```lambda pseudocode
(f (Y f)) = (Y f)
```

Once we have `Y`, we can achieve the following recursive definition

```lambda pseudocode
f = (wrapper f)
```

by non-recursively lambda term.

```lambda pseudocode
f = (Y wrapper)
```

The following `Y` is one way of defining `Y`.

```lambda
(define (Y f)
  ((lambda (x) (f (x x)))
   (lambda (x) (f (x x)))))
```

We will have

```lambda pseudocode
(Y f) =
(f ((lambda (x) (f (x x)))
    (lambda (x) (f (x x))))) =
(f (Y f))
```

# turing

Another function to find fixpoint is `turing`.

```lambda
(define (turing-half x y) (y (x x y)))
(define turing (turing-half turing-half))
```

We will have

```lambda pseudocode
(turing f) =
(turing-half turing-half f) =
(f (turing-half turing-half f)) =
(f (turing f))
```
