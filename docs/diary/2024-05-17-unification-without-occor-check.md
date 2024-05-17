---
title: Unification without occor check
date: 2024-05-17
---

为了更好的 definitional equivalence，
我们可以学习 prolog 处理递归 term 的方式，
即 unification without occor check。

- 将所有（包括递归定义的）函数名视作 logic variable。
- 将所有 bound variable 也视作 logic variable，
  递归过程中遇到两个 bound variable 时，
  生成相同的 fresh name 同时 bind 上去。
- 用 unification without occor-check 来判断 definitional equivalence。

```prolog
Even = lambda(N, ap(if(ap(Zero, N), True, ap(Odd, ap(Sub1, N))))),
Odd = lambda(M, ap(if(ap(Zero, M), False, ap(Even, ap(Sub1, M))))).
```
