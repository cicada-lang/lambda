---
title: the right way to handle recursion
date: 2025-06-21
---

当初之所以实现这个练习项目，
是因为看了 "the little typer" 之后，
想要用 untyped lambda 演算来了练习 normalization。

"the little typer" 实现 normalization 的方式是 NbE，
这种方式不支持递归函数，
或者任何其他递归定义的东西。

因此，这里的笔记有很多在讨论如何处理递归函数。

其实，正确的处理递归函数之间的结构性等价关系的方法，
在 roberto amadio 和 luca cardelli 的 1993 年论文中
-- "subtyping recursive types"。
