---
title: Lambda 编码
subtitle: Lambda Encoding
---

# 自然数的 Church 编码

```scheme
(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step (prev base step))))
(define (iter-Nat n base step) (n base step))
```

# 自然数的 Scott 编码

```scheme
(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev)))
(define (which-Nat n base step) (n base step))
```

```scheme
(define (sub1 n)
  (which-Nat n
    zero
    (lambda (prev) prev)))
```

```scheme
(define (add-wrap add)
  (lambda (m n)
    (which-Nat m
      n
      (lambda (prev) (add1 (add prev n))))))

(define add (Y add-wrap))
```

```scheme
(define (mul-wrap mul)
  (lambda (m n)
    (which-Nat m
      zero
      (lambda (prev) (add n (mul prev n))))))

(define mul (Y mul-wrap))
```

# 自然数的 Parigot 编码

```scheme
(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev (prev base step))))
(define (rec-Nat n base step) (n base step))
```

# 编码一般的递归数据类型

TODO 以 List 为例。
