将 explicit-substitution 从 lambda 中分离出来

# 有待验证的假设

在 explicit-substitution 中实验，然后开始 cicada。

- 用 `assert-equal` 验证基于 `Exp` 的 definitional 等价关系。
- 验证基于 `Exp` 的递归函数之间的 definitional 等价关系。
- 验证基于 `Exp` 的 dependent type 类型检查器。
- 在实现 explicit-substitution 时避免全局的 `globalFreshen`。

# lang1

[lang1] 支持 `(assert-equal)` 与 `(assert-not-equal)`
[lang1] 支持直接递归函数与相互递归函数，不能判断等价的地方就不判断。

# lang0

[lang0] docs/lambda-encoding -- Exp Lambda 编码的例子，外加解释器
[lang0] docs/self-type
