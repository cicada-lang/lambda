- a framework for loading module from markdown files
  - how to tdd this?
  - how to use tdd to design a good API of this
  - extract the test framework from `cicada-lang/sexp`
  - for using in readonly.link

# play

> Be really good at using lambda to encode inductive datatypes

- learn Aaron Stump's cedille: https://cedille.github.io
- learn Fu Peng's gottlob: https://github.com/Fermat/gottlob

# docs

> It worth setup up a better documentation system now (with the help of readonly.link)
> - because updating code and playground links is painful

- readonly.link code block can link to playground
  - maybe we should do this for `suki` instead of `lambda`?
- play with birds -- a little book about birds

# problems

- how to do term-graph implementation?

  Normal forms of Parigot numerals are exponential in size,
  but a reasonable term-graph implementation
  should be able to keep them linear via sharing.

# idea

- add `fixpoint` as keyword to define recursive function (can be NbE-ed?)
  - we need to learn coq and lean -- i do not even know coq uses fixpoint
