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
f =
(wrap f) =
(wrap (wrap f)) =
(wrap (wrap (wrap ...)))
```

实现方式如下：

```scheme
f =
(Y wrap) =
(wrap (Y wrap)) =
(wrap (wrap (Y wrap))) =
(wrap (wrap (wrap ...)))
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

以计算阶乘的递归函数 `factorial` 为例，
如果直接用自我引用来实现递归，可以定义如下：

```scheme
(define (factorial n)
  (if (zero? n)
    one
    (mul n (factorial (sub1 n)))))
```

在不使用自我引用的限制下，
我们可以先定义形成无穷嵌套所需要的 `wrap` 函数：

```scheme
f =
(wrap f) =
(wrap (wrap f)) =
(wrap (wrap (wrap ...)))
```

具体对 `factorial` 而言，我们可以定义 `factorial-wrap`：

```scheme
(define factorial-wrap
  (lambda (factorial)
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n)))))))
```

注意 `factorial-wrap` 的定义中并没有自我引用，
`factorial` 是作为一个约束变元出现的。

展开有限次嵌套试试，以三层 `factorial-wrap` 为例：

```scheme
(factorial-wrap
 (factorial-wrap
  (factorial-wrap
   ...)))
```

展开之后的函数可以计算 `factorial` 的前三个结果：

```scheme
(lambda (n)
  (if (zero? n)
    one
    (mul
     n
     ((lambda (n)
        (if (zero? n)
          one
          (mul
           n
           ((lambda (n)
              (if (zero? n)
                one
                (mul
                 n
                 (,,,
                  (sub1 n)))))
            (sub1 n)))))
      (sub1 n)))))
```

因此当无穷展开时，就可以计算 `factorial` 的所有结果。

我们已经知道，用 `Y` 作用于 `factorial-wrap` 就可以形成无穷展开，
因此 `factorial` 可以定义如下：

```scheme
(define factorial (Y factorial-wrap))
```

除了 `Y` 之外，
`turing` 也可以用来形成无穷展开，
因此下面的定义也是可以的：

```scheme
(define factorial (turing factorial-wrap))
```

注意，不动点的技巧，并不是实现递归函数的唯一方式。
例如下面这种把 `factorial` 拆成两半的技巧，
也可以实现递归函数：

```scheme
(define (factorial-half self n)
  (if (zero? n)
    one
    (mul n (self self (sub1 n)))))

(define factorial (factorial-half factorial-half))
```

和 `factorial-wrap` 类似，
`factorial-half` 的定义并不带有自我引用，
但是把它作用于它自身时，实际上会得到递归的效果：

```scheme
(factorial-half factorial-half) =
(lambda (n)
  (if (zero? n)
    one
    (mul n (factorial-half factorial-half (sub1 n)))))
```

注意，这里的两个实现递归函数的技巧，
都只能用来实现直接递归函数，
而不能用来实现间接递归函数。

比如，由相互递归函数定义的 `even?` 与 `odd?`：

```scheme
(define (even? n)
  (if (zero? n) true
      (odd? (sub1 n))))

(define (odd? n)
  (if (zero? n) false
      (even? (sub1 n))))
```

可以扩展上面两个技巧，来实现相互递归函数，
但是与直接递归函数相比，使用起来已经很不方便了。

其实在实际的语言实现中，
递归就是递归，没必要避免自我引用，
只要在处理表达式的时候注意不要陷入死循环就行了。
