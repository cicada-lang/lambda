# equality between recursive functions

- `exps/pi/fixpoint-value` -- `equal`

- `define` detected recursive function and use `Fixpoint` instead of `Fn`

- be able readback `factorial`

- be able to `(assert-equal factorial factorial)`

- be able to `(assert-equal factorial factorial-2)`

  - where `factorial-2` is structurally the same to `factorial`

- detected **mutually** recursive function and print some thing

- inline **mutually** recursive function to simple recursive function

# graph-based implementation

> Normal forms of Parigot numerals are exponential in size,
> but a reasonable term-graph implementation
> should be able to keep them linear via sharing.

- implement lamping reduction by inet
