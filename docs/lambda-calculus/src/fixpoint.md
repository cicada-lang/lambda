---
title: 不动点
subtitle: Fixpoint
---

# 函数的不动点与 Lambda 演算中的 Y

在数学中，如果 `(f x) = x` 那么 `x` 被称为是 `f` 的不动点。

在 Lambda 演算中，存在一个函数 `Y`，它能用来找到任何一个函数 `f` 的不动点。

```scheme
(f (Y f)) = (Y f)
```

一旦有了 `Y`，我们就能用非递归的 Lambda 表达式来实现下面的递归定义：

```scheme
f
= (wrap f)
= (wrap (wrap f))
= (wrap (wrap (wrap ...)))
```

实现方式如下：

```scheme
f
= (Y wrap)
= (wrap (Y wrap))
= (wrap (wrap (Y wrap)))
= (wrap (wrap (wrap ...)))
```

`Y` 的定义并不难：

```scheme
(define (Y f)
  ((lambda (x) (f (x x)))
   (lambda (x) (f (x x)))))
```

我们可以检验这个定义是正确的，
它确实能用来找出任意一个函数 `f` 的不动点：

```scheme
(Y f) =
(f ((lambda (x) (f (x x)))
    (lambda (x) (f (x x))))) =
(f (Y f))
```

注意，`Y` 并不是唯一一个可以用来找到任何函数不动点的函数。
另外一个类似的函数 `turing` 定义如下：


```scheme
(define (turing-half x y) (y (x x y)))
(define turing (turing-half turing-half))
```

检验如下：

```scheme
(turing f) =
(turing-half turing-half f) =
(f (turing-half turing-half f)) =
(f (turing f))
```

# 使用 Y 来实现递归函数

TODO
