- `Value` -- `readback` -- can handle recursion

  - (A) `readback` takes `occurred` -- record occurred values -- instead of occurred names

    - use lisp-style syntax to mark circle
      - we need to somehow record all parent values during `readback`
        - or record a list of expression builders,
          if a circle occurred, we find the builder and wrap it.

- play with fix & Y
- play with birds

# recursion

- `Value` -- `equal`
- `Value` -- `equal` -- can handle recursion

  - (A) `equal` records the path during recurse down two expressions
    - one lambda counts an edge of the path

- `(assert-equal)`
- `(assert-not-equal)`
