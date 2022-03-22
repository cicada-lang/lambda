- `Value` -- `readback` -- can handle recursion

  - (A) `readback` takes `occurred` -- record occurred values -- instead of occurred names

    - use lisp-style syntax to mark circle

      - we need a pair of new expressions -- `Exps.CircleWrapper` and `Exps.CircleRef`

      - we need to record a list of effects to build expression,
        if a circle occurred, we find the effect and wrap it.

      - we find "circle occur" by viewing the `effects` of `ReadbackCtx` as a path

- play with fix & Y
- play with birds

# recursion

- `Value` -- `equal`
- `Value` -- `equal` -- can handle recursion

  - (A) `equal` records the `path` during recursion

    - one lambda counts an `edge` of the `path`

- `(assert-equal)`
- `(assert-not-equal)`
