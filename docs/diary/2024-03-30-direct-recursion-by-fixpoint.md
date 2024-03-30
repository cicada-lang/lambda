---
title: Direct recursion by fixpoint
date: 2024-03-30
---

想要定义一个直接递归函数：

```scheme
(define factorial
  (lambda (n)
    (if (zero? n)
      one
      (mul n (factorial (sub1 n))))))
```

我们可以先发现它是直接递归的，
然后生成一个 wrap 函数：

```scheme
(define factorial-wrap
  (lambda (factorial)
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n)))))))
```

比如我们可以在 lambda 之外，
定义 wrap-lambda 的 Exp 和 Value 来实现这一点。

当想要 readback 这样一个 Value 时，
因为没有自我引用，所以可以安全地展开 readback。

当调用这个 factorial 的时候，
实际上调用 (Y factorial-wrap)
来找到 wrap 函数的 fixpoint，即 factorial 本身。

注意，这种实现方式只适用于直接递归函数，
而若要用这种方式来实现间接递归函数就会复杂很多，
我认为不太适合这么做。
