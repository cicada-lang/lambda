# lang0

> 支持直接递归函数与相互递归函数，不能判断等价的地方就不判断。

[lang0] `equivalentNeutral` -- `ApRecursive`

[lang0] test about equivalent between recursive functions

[lang0] 用中文重新整理 lambda encoding 相关的知识，形成一本书。
[lang0] 用中文重新整理 lambda encoding 和 self type 相关的知识。

# lang1

[lang1] fix `freshen` -- be like lang0 with `usedNames`
[lang1] 支持 `(assert-equal)` 与 `(assert-not-equal)`
[lang1] 直接用 lang0 的测试

# lang2

> move mugda to clique

[lang2] copy code from from mugda as lang2

# lang3

[lang3] pie with explicit substitution.

- 当 everything is expression 时，
  inference rule 的表达会有什么变化？

  - 好像是所有论文中的 inference rule 都只会用 Exp，
    而不会用 Value 和 closure。

# typed logic programming (clique)

simply typed logic programming

dependently typed logic programming

- need equivalence between relations.
- if type system is logic, what is the logic of logic?

# logic programming (clique)

datomic-like datalog in clique

[logic programming] 尝试把多元关系转化为三元组（datomic）

- 关系的代数（peirce）
