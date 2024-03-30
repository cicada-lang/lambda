---
title: Explicit substitution
date: 2024-03-31
---

从更一般的角度看，
explicit substitution 的主旨在于
将部分原本来属于 meta 理论中的 operation 的
直接编码在语法中。

# 语法

```scheme
<exp:var> := <name>
<exp:fn> := (lambda (<name> ...) <exp>)
<exp:ap> := (<exp> <exp> ...)
<exp:let> := (let ([<name> <exp>] ...) <exp>)
```

# (let) 的语义

带有 substitution 的 scheme 中的 `(let)`
是一个简单的 name 到 exp 的映射，
substitution 中的每一个 binding 有自己独立的 scope，
binding 的顺序不重要。

substitution 之间的复合的效果是：

```scheme
(substitute (substitution-compose s t) exp)
= (substitute s (substitute t exp))
```

通过解函数方程，可以获得如下定义：

```scheme
(define (substitution-compose s t)
  (substitution-merge s
    (substitution-map t
      (lambda (exp) (substitute s exp)))))
```

其中 `substitution-merge` 过程中
后一个参数中的 binding 会覆盖前一个参数中的 binding。

`substitution-compose` 会在 reduce 嵌套的 `(let)` 时用到：

```scheme
(let ([x a])
  (let ([y b])
    c))
=>
(let ([x a]
      [y (let ([x a])
           b)])
  c)
```

我们知道 `(let ([x a]) b)` 只是 `((lambda (x) b) a)` 的语法糖，
因此当我们把 `(let)` 当作语法的一部分，并定义相关的转写规则时，
我们其实是在给 lambda calculus 增加新的转写规则。

```scheme
((lambda (x)
   ((lambda (y) c)
    b))
 a)
=>
((lambda (x y) c)
 a
 ((lambda (x) b) a))
```

在一般的 lambda 演算的语法下，这些转写规则是很难看出来的。
在引入 `(let)` 后会自然很多。

在 de Bruijn notation 中，交换 binding 也有类似的语法规则：

- 我们用 `{}` 而不是 `<>` 来表示 quoted program。

```
{ a } [x]
{ b } [y]
c
=>
{ { a } [x] b } [y]
{ a } [x]
c
```

## let 语义与 telescope 的区别

注意，这与同样是 name 到 exp 的映射的 telescope 不同，
后者的语义为 scheme 中的 `(let*)`，
scope 与 binding 顺序相关，后面的可以依赖前面的。

`(let*)` 或 `(let-rec)` 的语义可以用来实现 class。

# Beta reduction

```scheme
((lambda (x) a) b) => (let ([x b]) a)
```

# Substitution under lambda

```scheme
(let ([x b])
  (lambda (y) a))
=> ;; z is fresh in a and b
(lambda (z)
  (let ([x b])
    (let ([y z])
      a)))
=>
(lambda (z)
  (let ([x b]
        [y z])
    a))
```

# 简单例子

Normal reduction:

```scheme
((lambda (b) ((lambda (a) (a b c)) (b c))) (c c)) =>
((lambda (a) (a (c c) c)) ((c c) c)) =>
((c c c) (c c) c)
```

Reduction with closure:

```scheme
((lambda (b) ((lambda (a) (a b c)) (b c))) (c c)) =>
(let ([b (c c)]) ((lambda (a) (a b c)) (b c))) =>
(let ([b (c c)]) (let ([a (b c)]) (a b c)))
(let ([b (c c)]) ((b c) b c)) =>
(((c c) c) (c c) c) ==
((c c c) (c c) c)
```

先做 `substitution-compose`：

```scheme
(let ([b (c c)]) (let ([a (b c)]) (a b c))) =>
(let ([b (c c)] [a (let ([b (c c)]) (b c))]) (a b c)) =>
(let ([b (c c)] [a ((c c) c)]) (a b c)) =>
(((c c) c) (c c) c) =>
((c c c) (c c) c)
```

# 带有 Curring 的例子

```scheme
(((lambda (b) (lambda (a) (a b c))) (c c)) (b c)) =>
((let ([b (c c)]) (lambda (a) (a b c))) (b c)) =>
((lambda (a) (let ([b (c c)]) (a b c))) (b c)) =>
(let ([a (b c)]) (let ([b (c c)]) (a b c))) =>
(let ([a (b c)]) (a (c c) c)) =>
((b c) (c c) c)

(let ([a (b c)]) (let ([b (c c)]) (a b c))) =>
(let ([b (c c)] [a (b c)]) (a b c)) =>
((b c) (c c) c)
```

# 后一个 (let) 依赖前一个 (let) 中的名字

```scheme
(let ([b (a a)]) (let ([a (b c)]) (a b c))) =>
(let ([b (a a)]) ((b c) b c)) =>
(((a a) c) (a a) c) ==
((a a c) (a a) c)
```

先做 `substitution-compose`：

```scheme
(let ([b (a a)]) (let ([a (b c)]) (a b c))) =>
(let ([b (a a)] [a (let ([b (a a)]) (b c))]) (a b c)) =>
(let ([b (a a)] [a ((a a) c)]) (a b c)) =>
(((a a) c) (a a) c) ==
((a a c) (a a) c)
```

注意，上面的 binding `[a ((a a) c)]` 不代表 `a` 是递归定义的，
只是 `(let)` 的语义只是简单的 key value may 加替换。

上面的 `(let)` 是下面的 lambda term 的语法糖：

```scheme
((lambda (b) ((lambda (a) (a b c)) (b c))) (a a)) =>
((lambda (b) (let ([a (b c)]) (a b c))) (a a)) =>
(let ([b (a a)]) (let ([a (b c)]) (a b c)))
```

正常的 beta reduction：

```scheme
((lambda (b) ((lambda (a) (a b c)) (b c))) (a a)) =>
((lambda (a1) (a1 (a a) c)) ((a a) c)) =>
(((a a) c) (a a) c) ==
((a a c) (a a) c)
```

# 后一个 (let) 与前一个 (let) 中的名字相同

```scheme
(let ([a (c c)]) (let ([a (b c)]) (a b c))) =>
(let ([a (c c)]) ((b c) b c)) =>
((b c) b c)
```

上面的 `(let)` 是下面的 lambda term 的语法糖：

```scheme
((lambda (a) ((lambda (a) (a b c)) (b c))) (c c)) =>
((lambda (a) (let ([a (b c)]) (a b c))) (c c)) =>
(let ([a (c c)]) (let ([a (b c)]) (a b c)))
```

正常的 beta reduction：

```scheme
((lambda (a) ((lambda (a) (a b c)) (b c))) (c c)) =>
((lambda (a) (a b c)) (b c)) =>
((b c) b c)
```
