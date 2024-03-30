---
title: Explicit substitution
date: 2024-03-31
---

# Note

In a more general sense,
the idea of explicit substitution
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
The meaning of telescope should be defined by `(extend)`,
which is like the meaning of class,
but different from the meaning of substitution.

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
(lambda (y) (closure a {:x y ...s}))
```

# Reduce

```scheme
(define (reduce exp)
  (match exp
    (`(lambda (,name) ,body)
     `(lambda (,name) ,(reduce body)))
    (`(closure ,target ,target-subst)
     (substitute target (reduce target-subst)))
    (`(,target ,arg)
     (match (reduce target)
       (`(lambda (,inner-name) ,inner-body)
        (reduce `(closure ,inner-body {,inner-name ,arg})))
       (_ `(,(reduce target) ,(reduce arg)))))
    ({:name ,value ...}
     {:name (reduce ,value) ...})
    (,name (symbol? name)
     name)))

(define (substitute target subst)
  (match (reduce subst)
    ({:key ,value ...}
     (match (reduce target)
       ("name in the keys" value)
       ("name not in the keys" (reduce target))
       (`(lambda (,name) ,body)
        (let ((fresh-name (freshen-name))
          `(lambda (,fresh-name)
             ,(reduce
                (closure ,body {:name ,fresh-name :key ,value ...}))))))
       (`(,inner-target ,inner-arg)
        (reduce
         `((closure ,inner-target ,(reduce target-subst))
           (closure ,inner-arg ,(reduce target-subst)))))))
    (_ `(closure ,(reduce target) ,(reduce target-subst)))))
```

# Composition of substitutions

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

The `after` must be a pure syntax operation
which can satisfy the about equation.

## Simple example

We try to understand this problem better by viewing examples.

Normal reduction:

```scheme
((lambda (b) ((lambda (a) (a b c)) (b c))) (c c)) =>
((lambda (a) (a (c c) c)) ((c c) c)) =>
((c c c) (c c) c)
```

Reduction with closure:

```scheme
((lambda (b) ((lambda (a) (a b c)) (b c))) (c c)) =>
(closure ((lambda (a) (a b c)) (b c)) {:b (c c)}) =>
(closure (closure (a b c) {:a (b c)}) {:b (c c)})
```

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

## Curring

```scheme
(((lambda (b) (lambda (a) (a b c))) (c c)) (b c)) =>
((closure (lambda (a) (a b c)) {:b (c c)}) (b c)) =>
((lambda (a) (closure (a b c) {:b (c c)})) (b c)) =>
(closure (closure (a b c) {:b (c c)}) {:a (b c)}) =>
(closure (a (c c) c) {:a (b c)}) =>
((b c) (c c) c)

(closure (closure (a b c) {:b (c c)}) {:a (b c)}) =>
(closure (a b c) {:b (c c) :a (b c)}) =>
((b c) (c c) c)
```

## Second substitution map to the previous name

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
(((a a) c) (a a) c) ==
((a a c) (a a) c)
```

But `{:a ((a a) c)}` is a mapping where the kay occurs in the value.
this should not be understand as recursive definition of `a`.

The above double closure come from the following beta reduction:

```scheme
((lambda (b) ((lambda (a) (a b c)) (b c))) (a a)) =>
((lambda (b) (closure (a b c) {:a (b c)})) (a a)) =>
(closure (closure (a b c) {:a (b c)}) {:b (a a)})
```

Normal beta reduction:

```scheme
((lambda (b) ((lambda (a) (a b c)) (b c))) (a a)) =>
((lambda (a1) (a1 (a a) c)) ((a a) c)) =>
(((a a) c) (a a) c) ==
((a a c) (a a) c)
```

## Second substitution have the same name of the first substitution

```scheme
(closure (closure (a b c) {:a (b c)}) {:a (c c)}) =>
(closure ((b c) b c) {:a (c c)}) =>
((b c) b c)
```

The above closure comes from the following beta reduction:

```scheme
((lambda (a) ((lambda (a) (a b c)) (b c))) (c c)) =>
((lambda (a) (closure (a b c) {:a (b c)})) (c c)) =>
(closure (closure (a b c) {:a (b c)}) {:a (c c)})
```

Normal beta reduction:

```scheme
((lambda (a) ((lambda (a) (a b c)) (b c))) (c c)) =>
((lambda (a) (a b c)) (b c)) =>
((b c) b c)
```

Important note:

We can see that `(closure B ([x A]))` is just another syntax
for `(let ([x A]) B)` or `((lambda (x) B) A)`,
with `(closure)` as part of the syntax,
we are actually defining new rewrite rules on lambda calculus
beside beta reduction, which is:

```scheme
(closure (closure B ([x A])) ([y C])) =>
(closure B ([x (closure A ([y C]))] [y C]))
```

```scheme
(let ([y C]) (let ([x A]) B)) =>
(let ([x (let ([y C]) A)] [y C]) B)
```

```scheme
((lambda (y) ((lambda (x) B) A)) C) =>
((lambda (x y) B) ((lambda (y) A) C) C)
```

These new rules are more easy to see in de Bruijn notation
i.e. postfix notation, note that we use `{}` instead of `<>` for quoted program.

```scheme
{ C } [y] { A } [x] B =>
{ { C } [y] A } { C } [y] [x] B
```

# Using (let) instead of (closure)

Using `(let)` to get a more familiar syntax.

Be careful about the order,
it should be like reversed closure,
i.e. lookup should find the nearest binding.

It should not be:

```scheme
(let ([y C]) (let ([x A]) B)) =>
(let ([x (let ([y C]) A)] [y C]) B)
```

but be:

```scheme
(let ([y C]) (let ([x A]) B)) =>
(let ([y C] [x (let ([y C]) A)]) B)
```

Beside this rule, all expressions should be substited as is.
