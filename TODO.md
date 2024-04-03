# lang0

> 支持直接递归函数与相互递归函数，不能判断等价的地方就不判断。

[lang0] `FnRecursive` as `Value`
[lang0] `evaluate` -- `FnRecursive`
[lang0] add an extra pass -- `defineMod` before `executeMod`
[lang0] `doAp` should not apply a `FnRecursive` when the `arg` is `NotYet`
[lang0] `defineMod` -- check occor to create `FnRecursive` instead of `Fn`

[lang0] 用中文重新整理 lambda encoding 相关的知识，形成一本书。
[lang0] 用中文重新整理 lambda encoding 和 self type 相关的知识。

# lang1

[lang1] fix `freshen` -- be like lang0 with `usedNames`
[lang1] 支持 `(assert-equal)` 与 `(assert-not-equal)`
[lang1] 直接用 lang0 的测试
