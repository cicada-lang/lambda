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
<exp:with> := (with <exp> <exp>)
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

Use `(join)` and `(with)` to implement `(extend)`.

TODO Review the idea of telescope.

```scheme
(extend
  {:k1 e1}
  {:k2 e2})

{:k1 e1
 :k2 (with {:k1 e1} e2)}
```

## Beta reduction

```scheme
((lambda (x) a) b) =>
(with {:x b} a)
```

## Substitution under lambda

```scheme
(with s (lambda (x) a)) =>
;; y is fresh in a and s
(lambda (y) (with s ((lambda (x) a) y))) =>
(lambda (y) (with s (with {:x y} a)))
```

# Reduce

MAYBE Change `(with)` to `(closure)` -- for natural postfix composition.

```scheme
(define (reduce exp)
  (match exp
    (`(lambda (,name) ,body)
     `(lambda (,name) ,(reduce body)))
    (`(with ,target-subst ,target)
     (match (reduce target-subst)
       ({:key ,value ...}
        (match (reduce target)
          ("name in the keys" value)
          ("name not in the keys" (reduce target))
          (`(lambda (,name) ,body)
           (let ((fresh-name (freshen-name))
             `(lambda (,fresh-name)
                ;; We also need rules to reduce double `with`
                ;; to single `with` and some kind of
                ;; composition of substitutions.
                ,(reduce
                   (with {:key ,value ...}
                     (with {:name ,fresh-name} ,body)))))))
          (`(,inner-target ,inner-arg)
           (reduce
            `((with ,(reduce target-subst) ,inner-target)
              (with ,(reduce target-subst) ,inner-arg))))))
       (_ `(with ,(reduce target-subst) ,(reduce target)))))
    (`(,target ,arg)
     (match (reduce target)
       (`(lambda (,inner-name) ,inner-body)
        (reduce `(with {,inner-name ,arg} ,inner-body)))
       (_ `(,(reduce target) ,(reduce arg)))))
    ({:name ,value ...}
     {:name (reduce ,value) ...})
    (,name (symbol? name)
     name)))
```
