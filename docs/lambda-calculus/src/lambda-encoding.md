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
每一个都在历史上由某个人提出：

- Scott 编码

  ```scheme
  (define zero (lambda (base step) base))
  (define (add1 prev) (lambda (base step) (step prev)))
  (define (which-Nat n base step) (n base step))
  ```

- Church 编码

  ```scheme
  (define zero (lambda (base step) base))
  (define (add1 prev) (lambda (base step) (step (prev base step))))
  (define (iter-Nat n base step) (n base step))
  ```

- Parigot 编码

  ```scheme
  (define zero (lambda (base step) base))
  (define (add1 prev) (lambda (base step) (step prev (prev base step))))
  (define (rec-Nat n base step) (n base step))
  ```

注意：

- 这三种编码方式下自然数作为 Lambda 表达式的形态各不相同，不能混用。

- 这三种编码方式有一个共同点，
  即给出编码数据构造子 `zero` 与 `add1` 的 Lambda 表达式之后，
  都会给出一个解构数据的函数 -- `which-Nat`、`iter-Nat`、`rec-Nat`，
  而编码解构数据函数的方式都是用简单的函数作用 -- `(n base step)`：

  ```scheme
  (define (which-Nat n base step) (n base step))
  (define (iter-Nat n base step) (n base step))
  (define (rec-Nat n base step) (n base step))
  ```

## Scott 编码

```scheme
(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev)))
(define (which-Nat n base step) (n base step))
```

满足如下公理：

```scheme
(which-Nat zero base step) = base
(which-Nat (add1 prev) base step) = (step prev)
```

`which-Nat` 就是对自然数做模式匹配，
然后判断分别如何对匹配到的结果做不同处理，
`base` 就是匹配到 `zero` 时的结果，
`step` 就是匹配到 `(add1 prev)` 时的结果。
我们可以用 `which-Nat` 来定义 `sub1`。

```scheme
(define (sub1 n)
  (which-Nat n
    zero
    (lambda (prev) prev)))
```

也可以用 `which-Nat` 加递归来定义 `add` 和 `mul`。
别忘了我们可以用不动点组合子 `Y` 来实现递归函数。

```scheme
(define (add-wrap add)
  (lambda (m n)
    (which-Nat m
      n
      (lambda (prev) (add1 (add prev n))))))

(define add (Y add-wrap))

(define (mul-wrap mul)
  (lambda (m n)
    (which-Nat m
      zero
      (lambda (prev) (add n (mul prev n))))))

(define mul (Y mul-wrap))
```

## Church 编码

```scheme
(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step (prev base step))))
(define (iter-Nat n base step) (n base step))
```

满足如下公理：

```scheme
(iter-Nat zero base step) = base
(iter-Nat (add1 prev) base step) = (step (iter-Nat prev base step))
```

`(iter-Nat n base step)` 的效果是以 `base` 为基础将 `step` 迭代作用 `n` 次。
此时 `step` 有一个参数，即 `iter-Nat` 递归作用于前一个数所得到的结果。
这种带有递归作用的组合子称为递归组合子。
`iter-Nat` 本身带有递归了，
用它来定义 `add` 与 `mul` 就不再需要递归了。

```scheme
(define (add m n) (iter-Nat m n add1))
(define (mul m n) (iter-Nat m zero (add n)))
```

上面两个定义中，我们都是以所定义函数的第一个参数为递归组合子的对象，
为了保持一致，我们先定义参数个数相反的 `power-of`，再定义乘方 `power`。

```scheme
(define (power-of m n) (iter-Nat m one (mul n)))
(define (power m n) (power-of n m))
```

虽然 `iter-Nat` 可以做迭代，
但是它的 `step` 拿不到迭代的次数，
它只有一个参数即让一次迭代的结果。

想要定义 `sub1` 来拿到 `(add1 prev)` 中的 `prev`，
就不能像 Scott 编码中使用 `which-Nat` 那么简单。
但是我们还是可以定义 `sub1`，
方案是讲下面这个对数对的操作迭代 `n` 次，

```
0  (0 . 0)
1  (0 . 1)
2  (1 . 2)
3  (2 . 3)
...
n  (n-1 . n)
```

```scheme
(define (shift-add1 x)
  (cons (cdr x) (add1 (cdr x))))

(define (sub1 n)
  (car (iter-Nat n (cons zero zero) shift-add1)))
```

有了 `sub1` 就可以用迭代来定义 `sub`。

```scheme
(define (sub m n) (iter-Nat n m sub1))
```

判断是否是 `zero` 的定义很简单，与 `sub1` 不同，我们不需要拿到 `prev`。

```scheme
(define (zero? n) (iter-Nat n true (lambda (x) false)))
```

有了 `zero?` 和 `sub` 就可以判断 `m` 是否小于等于 `n`。

```scheme
(define (lteq m n) (zero? (sub m n)))
```

## Parigot 编码

```scheme
(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev (prev base step))))
(define (rec-Nat n base step) (n base step))
```

满足如下公理：

```scheme
(rec-Nat zero base step) = base
(rec-Nat (add1 prev) base step) = (step prev (rec-Nat prev base step))
```

对自然数来说 `rec-Nat` 是一个完整的递归组合子，
`(rec-Nat n base step)` 的效果是以 `base` 为基础步骤，
将 `step` 递归作用 `n` 次，
此时 `step` 有两个参数，
一个是当前的递归层数 `prev`，
一个是 `rec-Nat` 递归作用于前一个数所得到的结果，
这种作为递归作用结果的参数通常被命名为 `almost`。

使用 `rec-Nat` 我们可以用与之前 `iter-Nat` 类似的方式定义 `add` 和 `mul`。

```scheme
(define (add m n)
  (rec-Nat m
    n
    (lambda (prev almost) (add1 almost))))

(define (mul m n)
  (rec-Nat m
    zero
    (lambda (prev almost) (add n almost))))
```

也可以用与之前 `which-Nat` 类似的方式定义 `sub1`。

```scheme
(define (sub1 n)
  (rec-Nat n
    zero
    (lambda (prev almost) prev)))
```

还可以直接给出 `factorial` 的递归定义，
这是 `which-Nat` 和 `iter-Nat` 都不能直接做到的。

- `which-Nat` 可以用 `Y` 的技巧做到；
- `iter-Nat` 可以用增加参数将递归转化为迭代的技巧做到。

```scheme
(define (factorial n)
  (rec-Nat n
    one
    (lambda (prev almost) (mul (add1 prev) almost))))
```

# 编码一般的递归数据类型

从上面的最简单数据类型 -- 自然数的例子中，
我们已经能总结出来一般的递归数据类型应该如何编码了。

假设我们有 `datatype` 语法关键词能够用来定义数据类型，
那么自然数 `Nat` 可以定义如下：

```scheme
(datatype Nat
  [zero Nat]
  [add1 ([prev Nat]) Nat])
```

回顾 Parigot 编码。

```scheme
(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev (prev base step))))
(define (rec-Nat n base step) (n base step))
```

假设我们有用于模式匹配的语法关键词 `match`，
并且能够定义递归函数，
那么我们可以直接定义 `rec-Nat`。

```scheme
(define (rec-Nat n base step)
  (match n
    [zero base]
    [(add1 prev) (step prev (rec-Nat prev base step))]))
```

我们把这个过程反过来，看看能不能推出 `List` 的 Lambda 编码。

首先用 `datatype` 定义 `List`：

```scheme
(datatype (List E)
  [nil (List E)]
  [:: ([head E] [tail (List E)]) (List E)])
```

然后用 `match` 定义 `rec-List`：

```scheme
(define (rec-List target nil-case ::-case)
  (match target
    [nil nil-case]
    [(:: head tail)
     (::-case head tail
      (rec-List tail nil-case ::-case))]))
```

最后给出 `List` 的 Lambda 编码：

```scheme
(define nil
  (lambda (nil-case ::-case)
    nil-case))

(define (:: head tail)
  (lambda (nil-case ::-case)
    (::-case head tail
      (tail nil-case ::-case))))

(define (rec-List target nil-case ::-case)
  (target nil-case ::-case))
```

成功！可以定义一些列表处理函数了：

```scheme
(define (length l)
  (rec-List l
    zero
    (lambda (head target almost)
      (add1 almost))))

(define (append left right)
  (rec-List left
    right
    (lambda (head target almost)
      (:: head almost))))
```

方法总结如下：

- 原来代表数据构造子的 Lambda 表达式就是先接收参数，
  然后返回一个以所有的 cases 为参数，并在其中做选择的函数；

- 其中每个 case 都要以这个 case 下解构出来的所有数据为参数，
  并且还要给每个递归位置加上一个多出来的 almost 参数；

- 之后数据解构子就可以用简单的函数作用来编码了。

当然最稳妥的方法还是像上面的过程一样，
先用伪关键词 `datatype` 来定义数据构造子，
再用伪关键词 `match` 来定义数据解构子，
然后再转写成 Lambda 编码。

# 用 Lambda 编码实现 Lambda 演算的解释器

下面我们用 Lambda 编码，
外加 De Bruijn index，
来实现一个 Lambda 演算的解释器。

我们重复上面对 `List` 所做的过程，
首先假装用 `datatype` 定义 `Exp`：

```scheme
(datatype Exp
  [var ([index Nat]) Exp]
  [ap ([target Exp] [arg Exp]) Exp]
  [fn ([ret Exp]) Exp])
```

然后假装用 `match` 来定义 `rec-Exp`：

```scheme
TODO
```

`Exp` 的 Lambda 编码：

```scheme
TODO
```

解释器作为 `Exp` 处理函数：

```scheme
TODO
```
