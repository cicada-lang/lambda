---
title: Syntax for De Bruijn notation
date: 2024-01-15
---

Terms:

```scheme
variable -- 1, 2, 3
application -- (a b)
abstraction -- (dummy a) or (lambda (x) a)
substitution -- (subst a substitution)
```

Maybe we should just use `(let)` to write `(subst a substitution)`

```
(let [(variable expression)
      (variable expression)
      ...]
  body)
```

Substitutions:

```scheme
id -- ()
add1 -- (map-value add1 s)
index-cons -- (index-cons a s)
           == [(1 a) ((add1 i) (s i))]
           == (post-compose (cons 1 a) (map-index add1 s))
composition -- (post-compose s t)
            // first apply s, then apply t.
```

In finite case,
a substitution is an associaton list
-- `[(variable expression) ...]`,
and `(post-compose s t)` becomes `(append s t)`.

A substitution is of type `Var -> Term`,
two substitution can not be composed directly,
to compose substitutions we need to
recursively apply a substitutions to the returned term.
