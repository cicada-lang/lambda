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
