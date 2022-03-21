- `Value` -- `readback` -- can handle recursion

  - [note] When we have recursive definitions, `readback` does not find normal forms.

  - handle top-level recursive definitions -- `factorial-rec`

    - (A) `evaluate` takes `occurred` -- to mark occurred top-level names

  - handle fix point recursive constructions -- `(factorial/rec factorial/rec)`

    - (A) `evaluate` takes `occurred`
      - does not works, because the names are not top-level
      - maybe ok if we used `occurred` to record occurred values -- instead of occurred names
        - use lisp-style syntax to mark circle
          - we need to somehow record all parent values during `readback`
            - or record a list of expression builders,
              if a circle occurred, we find the builder and wrap it.

    - (B) `readback` blocks occurred names in `env`
      - but it also blocks all other names that are used more then once

- play with fix & Y
- play with birds

# recursion

- `Value` -- `equal`
- `Value` -- `equal` -- can handle recursion

  - (A) `equal` records the path during recurse down two expressions
    - one lambda counts an edge of the path
    - `FnValue` has hash -- take `env` into account
      - be careful about recursive definitions in `env` during hashing

- `(assert-equal)`
- `(assert-not-equal)`
