# lang1

[lang1] example syntax design -- use real λ
[lang1] setup `Exp`

# lang2

[lang2] design syntax

[lang2] note that, composition of substitutions `s` then `t`
is not `(with t s)`
but merging two telescopes `(merge (with t s) t)`,
we must define a scope to be finite composition of bindings.


# command-line

[command-line] change the command line to support many languages

- lang 1 run
- lang 1 repl
- lang -- choose the lang
