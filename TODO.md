# equality between recursive functions

- `define` detected recursive function and use `Fixpoint` instead of `Fn`

- `apply` handle `Fixpoint` specially

  - use semantic of `fix` to do the application

- be able to `(assert-equal factorial factorial)`

- be able to `(assert-equal factorial factorial-2)`

  - where `factorial-2` is structurally the same to `factorial`

- detected **mutually** recursive function and print some thing

- be able to `(assert-equal)` mutually recursive function

# graph-based implementation

> Normal forms of Parigot numerals are exponential in size,
> but a reasonable term-graph implementation
> should be able to keep them linear via sharing.

- implement lamping reduction by inet
