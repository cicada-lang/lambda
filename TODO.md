> `Value` -- `equal` -- can handle recursion

- extract `equalApply` and `equalEvaluate` to `equal/`

- `Ap.equalApply(ctx: EqualCtx, left: Value, right: Value, arg: Value): boolean`
- `Exp.equalEvaluate(mod: Mod, env: Env, ctx: EqualCtx, left: Exp, right: Exp): boolean` ?

# recursion

- `Value` -- `readback` -- limit length by a `count`

# play

- play with fix & Y
- play with birds
