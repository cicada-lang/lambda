---
title: Lambda calculus with explicit substitution
subtitle: lang1
---

# Syntax

```scm
<exp:var> := <name>
<exp:fn> := (lambda (<name>) <exp>)
<exp:ap> := (<exp> <exp>)
<exp:with> := (with <exp> <exp>)
<exp:map> := {:<name> <exp> ...}
```
# evaluate

```scm
(define (evaluate exp)
  (match exp
    ((lambda ) )))
```

## (join)

```scm
(join
  {:k1 e1}
  {:k2 e2})

{:k1 e1
 :k2 e2}
```

## (extend)

Use `(join)` and `(with)` to implement `(extend)`.

```scm
(extend
  {:k1 e1}
  {:k2 e2})

{:k1 e1
 :k2 (with {:k1 e1} e2)}
```

## Beta reduction

```scm
((lambda (x) a) b) =>
(with {:x b} a)
```

## Substitution under lambda

```scm
(with s (lambda (x) a)) =>
;; y is fresh in a and s
(lambda (y) (with s ((lambda (x) a) y))) =>
(lambda (y) (with s (with {:x y} a)))
```
