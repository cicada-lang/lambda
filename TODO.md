# equality between recursive functions

- `exps/let/let.ts`
- `exps/let/letrec.ts`

- `(let)`

- `define` detected recursive function and use `Fixpoint` instead of `Fn`
- detected **mutually** recursive function and print some thing
- be able to `(assert-equal factorial (lambda (n) (factorial n)))`
- inline **mutually** recursive function to simple recursive function

# graph-based implementation

> Normal forms of Parigot numerals are exponential in size,
> but a reasonable term-graph implementation
> should be able to keep them linear via sharing.

- implement lamping reduction by inet
