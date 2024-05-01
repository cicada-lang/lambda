# lang0

[lang0] docs/lambda-encoding -- 每种自然数编码适合用来实现的函数
[lang0] docs/lambda-encoding -- 尝试总结规律
[lang0] docs/lambda-encoding -- 以 List 和 Binary-Tree 为例，给出一般的编码
[lang0] docs/lambda-encoding -- 也许，以 Exp 为例，给出一般的编码
[lang0] docs/self-type

# lang1

[lang1] fix `freshen` -- be like lang0 with `usedNames`

[lang1] 支持直接递归函数与相互递归函数，不能判断等价的地方就不判断。

[lang1] 支持 `(assert-equal)` 与 `(assert-not-equal)`

[lang1] definitional equivalence -- 学习 prolog 处理递归 term unification without occor check 的方式。

- 将所有（包括递归定义的）函数名视作 logic variable。
- 将所有 bound variable 也视作 logic variable，
  递归过程中遇到两个 bound variable 时，
  生成相同的 fresh name 同时 bind 上去。
- 用 unification without occor-check 来判断 definitional equivalence。

```prolog
Even = lambda(N, ap(if(ap(Zero, N), True, ap(Odd, ap(Sub1, N))))),
Odd = lambda(M, ap(if(ap(Zero, M), False, ap(Even, ap(Sub1, M))))).
```
