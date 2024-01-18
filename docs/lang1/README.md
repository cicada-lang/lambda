---
title: Lambda calculus with explicit substitution
subtitle: lang1
---

# Syntax

Exp:

```scm
<exp:var> := <name>
<exp:fn> := (lambda (<name>) <exp>)
<exp:ap> := (<exp> <exp>)
<exp:with> := (with <exp> <exp>)
<exp:null-subst> := {}
<exp:push-subst> := (push <exp> <name> <exp>)
```

Always telescope:

```scm
{:k1 e1
 :k2 e2}

{:k1 e1
 :k2 (with {:k1 e1} e2)}
```

Beta reduction:

```scm
((λ (x) a) b) =>
(with {:x b} a)
```

Substitution under lambda:

```scm
(with s (λ (x) a)) =>
;; y is fresh in a and s
(λ (y) (with s ((λ (x) a) y))) =>
(λ (y) (with s (with {:x y} a)))
```
