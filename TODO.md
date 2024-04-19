# lang0

[lang0] docs/lambda-encoding
[lang0] docs/self-type

# lang1

> 不带 Value 的解释器，也许是 cicada 成功的关键，我必须认真探索它。
> Dance with expressions.

[lang1] fix `freshen` -- be like lang0 with `usedNames`

> 支持直接递归函数与相互递归函数，不能判断等价的地方就不判断。

# lang1 later

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

# lang2

> lang1 + datatype
> - using `<typector>/<datactor>` as syntax.

[lang2] 常识翻译一些 cicada 的 JS 风格代码。

# pie

pie with explicit substitution.

- 当 everything is expression 时，
  inference rule 的表达会有什么变化？

  - 好像是所有论文中的 inference rule 都只会用 Exp，
    而不会用 Value 和 closure。

# mugda

> move mugda to clique

copy code from from mugda as a lang

# typed logic programming (clique)

simply typed logic programming

dependently typed logic programming

- need equivalence between relations.
- if type system is logic, what is the logic of logic?

# logic programming (clique)

datomic-like datalog in clique

[logic programming] 尝试把多元关系转化为三元组（datomic）

- 关系的代数（peirce）
