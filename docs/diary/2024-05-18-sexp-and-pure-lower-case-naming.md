---
title: sexp and pure lower case naming
date: 2024-05-18
---

为了看看 sexp 与 lisp 的纯小写命名规则是否好用，
我尝试实现了 explicit-substitution。

```scheme
(export exp binding)

(datatype exp
  [var-exp ([name string]) exp]
  [fn-exp ([name string] [ret exp]) exp]
  [ap-exp ([target exp] [arg exp]) exp]
  [let-exp ([bindings (list binding)] [body exp]) exp])

(interface binding
  [name string]
  [body exp])
```

```scheme
(import exp var-exp fn-exp ap-exp let-exp "../exp/index.cic")
(import mod-find mod "../mod/index.cic")
(import do-ap "./do-ap.cic")
(import substitute "./substitute.cic")

(export reduce)

;; NOTE `reduce` might hit fixpoint on other kind of expressions,
;; but it will always remove `let-exp`.

(claim reduce (-> mod exp exp))

(define (reduce a-mod an-exp)
  (match an-exp
    [(var-exp name)
     (match (mod-find a-mod name)
       [(just defintion) an-exp]
       [nothing (reduce a-mod defintion.exp)])]
    [(fn-exp name ret)
     (fn-exp an-exp.name (reduce a-mod ret))]
    [(ap-exp target arg)
     (do-ap a-mod (reduce a-mod target) (reduce a-mod arg))]
    [(let-exp bindings body)
     (reduce a-mod (substitute body bindings))]))
```

感觉并不好用，因为在命名变量的时候，
总是要发明新的缩写，而不能直接用全称。
也不能总是加冠词来命名变量，比如 a-mod 和 an-exp，
因为对于 object 的 field 来说，不能加冠词。

对比 类 JS 语法：

```javascript
import { Exp } from "../exp/index.cic"
import { modFind, Mod } from "../mod/index.cic"
import { doAp } from "./doAp.cic"
import { substitute } from "./substitute.cic"

// NOTE `reduce` might hit fixpoint on other kind of expressions,
// but it will always remove `Let`.

export function reduce(mod: Mod, exp: Exp): Exp {
  match (exp) {
    case Exp::Var(name) => match (modFind(mod, name)) {
      case Maybe::Just(defintion) => exp
      case Maybe::Nothing() => reduce(mod, defintion.exp)
    }

    case Exp::Fn(name, ret) =>
      Exp::Fn(exp.name, reduce(mod, ret))

    case Exp::Ap(target, arg) =>
      doAp(mod, reduce(mod, target), reduce(mod, arg))

    case Exp::Let(bindings, body) =>
      reduce(mod, substitute(body, bindings))
  }
}
```
