---
title: Lambda calculus with explicit substitution
subtitle: lang1
---

# Note

The idea of explicit substitution
is to encode meta operations of a syntax
into the syntax itself.

# Syntax

```scheme
<exp:var> := <name>
<exp:fn> := (lambda (<name>) <exp>)
<exp:ap> := (<exp> <exp>)
<exp:closure> := (closure <exp> <exp>)
<exp:map> := {:<name> <exp> ...}
```

## (join)

```scheme
(join
  {:k1 e1}
  {:k2 e2})

{:k1 e1
 :k2 e2}
```

## (extend)

Use `(join)` and `(closure)` to implement `(extend)`.

TODO Review the idea of telescope.

```scheme
(extend
  {:k1 e1}
  {:k2 e2})

{:k1 e1
 :k2 (closure e2 {:k1 e1})}
```

## Beta reduction

```scheme
((lambda (x) a) b) =>
(closure a {:x b})
```

## Substitution under lambda

```scheme
(closure (lambda (x) a) s) =>
;; y is fresh in a and s
(lambda (y) (closure ((lambda (x) a) y) s)) =>
(lambda (y) (closure (closure a {:x y}) s))
```

# Reduce

```scheme
(define (reduce exp)
  (match exp
    (`(lambda (,name) ,body)
     `(lambda (,name) ,(reduce body)))
    (`(closure ,target ,target-subst)
     (match (reduce target-subst)
       ({:key ,value ...}
        (match (reduce target)
          ("name in the keys" value)
          ("name not in the keys" (reduce target))
          (`(lambda (,name) ,body)
           (let ((fresh-name (freshen-name))
             `(lambda (,fresh-name)
                ;; We also need rules to reduce double `closure`
                ;; to single `closure` and some kind of
                ;; composition of substitutions.
                ,(reduce
                   (closure
                     (closure .body {:name ,fresh-name})
                     {:key ,value ...}))))))
          (`(,inner-target ,inner-arg)
           (reduce
            `((closure ,inner-target ,(reduce target-subst))
              (closure ,inner-arg ,(reduce target-subst)))))))
       (_ `(closure ,(reduce target) ,(reduce target-subst)))))
    (`(,target ,arg)
     (match (reduce target)
       (`(lambda (,inner-name) ,inner-body)
        (reduce `(closure ,inner-body {,inner-name ,arg})))
       (_ `(,(reduce target) ,(reduce arg)))))
    ({:name ,value ...}
     {:name (reduce ,value) ...})
    (,name (symbol? name)
     name)))
```

# About substitution

We can not write substitution directly as a composed record
-- `{:k1 e1 :k2 e2 ...}`, we must compose substitution from key value pairs
one by one, and there might be many kind of compositions,
`{:k1 e1 :k2 e2 ...}` will represent one of the composition.

We can get the first kind of composition by solving a functional equation.
The unknown is the function `after`,
we call it `after` because `(after s t)` means
after substituting `s` substitute `t`,
and known equation is:

```scheme
(closure (closure e s) t) = (closure e (after s t))
```

Should the semantic `reduce` be part of the equation?

```scheme
(reduce (closure (closure e s) t)) = (reduce (closure e (after s t)))
```

The `after` must be a pure syntax operation
which can satisfy the about equation.

We try to understand this problem better by viewing examples:

```scheme
(closure (closure (a b c) {:a (b c)}) {:b (c c)}) =>
(closure ((b c) b c) {:b (c c)}) =>
(((c c) c) (c c) c) ==
((c c c) (c c) c)
```

How about we do the `after` composition first?

```scheme
(closure (closure (a b c) {:a (b c)}) {:b (c c)}) =>
(closure (a b c) (after {:a (b c)} {:b (c c)})) =>
(closure (a b c) {:a (closure (b c) {:b (c c)}) :b (c c)}) =>
(closure (a b c) {:a ((c c) c) :b (c c)}) =>
(((c c) c) (c c) c) =>
((c c c) (c c) c)
```

Thus if we view `{...}` as a map of independent key-value maps,
the meaning of `after` in the above case should be

```scheme
(after {:a (b c)} {:b (c c)}) =>
{:a (closure (b c) {:b (c c)}) :b (c c)}
```

How about let the second substitution map to name of the first substitution?

```scheme
(closure (closure (a b c) {:a (b c)}) {:b (a a)}) =>
(closure ((b c) b c) {:b (a a)}) =>
(((a a) c) (a a) c) ==
((a a c) (a a) c)
```

With `after` composition:

```scheme
(closure (closure (a b c) {:a (b c)}) {:b (a a)}) =>
(closure (a b c) (after {:a (b c)} {:b (a a)})) =>
(closure (a b c) {:a (closure (b c) {:b (a a)}) :b (a a)}) =>
(closure (a b c) {:a ((a a) c) :b (a a)}) =>
(((a a) c) (a a) c) =>
((a a c) (a a) c)
```

But `{:a ((a a) c)}` is a  mapping where the kay occurs in the value.
this should not be understand as recursive definition of `a`.

# Index v.s. named variables

```scheme
(λ(1[2]))[a] =>
(λ(2))[a] =>
λ(2[1,a]) =>
λ(a)
```

```scheme
(closure (lambda (x) (closure x {:x y})) {:x a}) =>
(closure (lambda (x) y) {:x a}) =>
(lambda (z) (closure (closure y {:x z}) {:x a})) =>
(lambda (z) (closure y {:x a})) =>
(lambda (z) y)
```

The results are different!
