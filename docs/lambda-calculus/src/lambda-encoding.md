---
title: Lambda 编码
subtitle: Lambda Encoding
---

# 尝试只使用 Lambda 表达式来编程

一般的程序语言除了 Lambda 表达式之外，
还可以使用别的数据类型以及相关的处理函数来编程。
如果没有这些数据类型，可以用 Lambda 表达式来编码它们。

比如对布尔值的编码如下：

```scheme
(define (true t f) t)
(define (false t f) f)

(define (if p t f) (p t f))

(define (and x y) (if x y false))
(define (or x y) (if x true y))
(define (not x) (if x false true))
```

我们可以检验如下等式成立：

```scheme
(and true false) = false
(or true false) = true
(not true) = false
(not (not true)) = true
```

想要编码链表处理中的 `cons` 的，
可以先把 `cons` 的两个参数保存在一个 Lambda 中，
把这个 Lambda 作用于不同的函数，就可以取出来保存的 `car` 和 `cdr`。


```scheme
(define (cons car cdr) (lambda (f) (f car cdr)))
(define (car pair) (pair (lambda (car cdr) car)))
(define (cdr pair) (pair (lambda (car cdr) cdr)))
```

也就是说考虑一个数据类型的编码的时候，
要符合这个数据类型的处理函数所需要的公理。

对 `cons` 来说，公理是：

```scheme
(car (cons a d)) = a
(cdr (cons a d)) = d
```

对于链表处理中的 `null` 来说，公理是与 `null?` 有关，
即，我们要能把它和 `cons` 所返回的值区分开。

```scheme
(null? null) = true
(null? (cons a d)) = false
```

```scheme
(define (null f) true)
(define (null? pair) (pair (lambda (car cdr) false)))
```

# 如何编码任何数据类型？

上面关于布尔值和链表处理的 Lambda 编码，感觉很精妙。
看起来要非常聪明的人才能想出这些编码。
如果不是在互联网上看到过类似有人给出过这些编码，
我自己是很难马上想出来这些编码方案的。

可是对于其他的数据类型怎么办呢？
上面两种简单的数据类型都需要精妙的编码了，
难道每次想使用一个新的数据类型就要去想新的编码方案？

其实对于任意的递归定义的数据类型，
都有一套固定的编码方案可以用来实现这个数据类型的处理函数。

我们以自然数的编码为例，首先列举三种编码方式，
然后总结出任意数据类型的编码方式。

对自然数的三种编码方式如下，
每一个都在历史上由某个人提出。

**Church 编码**：

```scheme
(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step (prev base step))))
(define (iter-Nat n base step) (n base step))
```

满足如下公理：

```scheme
(iter-Nat zero base step) = zero
(iter-Nat (add1 prev) base step) = (step (prev base step))
```

**Scott 编码**：

```scheme
(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev)))
(define (which-Nat n base step) (n base step))
```

满足如下公理：

```scheme
(which-Nat zero base step) = zero
(which-Nat (add1 prev) base step) = (step prev)
```

**Parigot 编码**：

```scheme
(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev (prev base step))))
(define (rec-Nat n base step) (n base step))
```

满足如下公理：

```scheme
(rec-Nat zero base step) = zero
(rec-Nat (add1 prev) base step) = (step prev (prev base step))
```

# 编码一般的递归数据类型

TODO 以 List 为例。
