---
title: Lambda calculus with explicit substitution
subtitle: lang1
---

# Syntax

`<exp>`:

```scm
<exp:var> := <name>
<exp:fn> := (lambda (<name>) <exp>)
<exp:ap> := (<exp> <exp>)
<exp:with> := (with <exp> <exp>)
<exp:join> := (join <exp> <exp>)
<exp:object> := (object (define <name> <exp>) ...)
```

`(join)`:

```scm
(join
  (object
    (define k1 e1))
  (object
    (define k2 e2)))

(object
  (define k1 e1)
  (define k2 e2))
```

`(extend)`:

- Use `(join)` and `(with)` to implement `(extend)`.

```scm
(extend
  (object
    (define k1 e1))
  (object
    (define k2 e2)))

(object
  (define k1 e1)
  (define k2 (with (object (define k1 e1)) e2)))
```

Beta reduction:

```scm
((lambda (x) a) b) =>
(with (object (define x b)) a)
```

Substitution under lambda:

```scm
(with s (lambda (x) a)) =>
;; y is fresh in a and s
(lambda (y) (with s ((lambda (x) a) y))) =>
(lambda (y) (with s (with (object (define x y)) a)))
```
