# Lambda Calculus

> More restraint and more pure, <br>
> so functional and so reduced.
>
> -- Anonymous Bauhaus Student

An implementation of [(Untyped) Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus).

- Use [S-expression](https://github.com/cicada-lang/sexp) as overall syntax, to expression ideas clearly.
- Implement call-by-need lazy evaluation.
- Allow recursive in top-level definitions.
  - No mutual recursion, a name must be defined before used.
- A simple module system with only one API -- `(import)`.
  - It can import module from local file or remote URL.
- Two simple testing statements `(assert-equal)` and `(assert-not-equal)`.
  - They can handle beta and eta equivalence.

Note that, when implementing lambda calculus as an interpreter,
the depth of the call stack is limited by the hosting language.
To avoid this limitation we should implement lambda calculus by machine like SECD.

## Usages

### Command line tool

Install it by the following command:

```sh
npm install -g @cicada-lang/lambda
```

The command-line program is called `lambda`.

open a REPL:

```sh
lambda repl
```

or just:

```sh
lambda
```

Run a file:

```sh
lambda run tests/nat-church.md
```

## Examples

Please see [tests](tests) for more examples.

### Boolean

```scheme
(define (true t f) t)
(define (false t f) f)

(define (if p t f) (p t f))

(define (and x y) (if x y false))
(define (or x y) (if x true y))
(define (not x) (if x false true))

(and true false)
(not (not (or true false)))
```

### Natural Number by Church encoding

[ [WIKIPEDIA](https://en.wikipedia.org/wiki/Church_encoding) ]

```scheme
(define zero (lambda (base step) base))
(define (add1 n) (lambda (base step) (step (n base step))))
(define (iter-Nat n base step) (n base step))

(define one (add1 zero))
(define two (add1 one))
(define three (add1 two))

(define (add m n) (iter-Nat m n add1))

(add two two)
```

### Factorial

```scheme
(import "./nat-church.md"
  zero? add mul sub1
  zero one two three four)

(import "./boolean.md"
  true false if)

(define (factorial n)
  (if (zero? n)
    one
    (mul n (factorial (sub1 n)))))

(factorial zero)
(factorial one)
(factorial two)
(factorial three)
```

### Factorial by fixpoint combinator

[ [WIKIPEDIA](https://en.wikipedia.org/wiki/Fixed-point_combinator) ]

```scheme
(import "./nat-church.md"
  zero? add mul sub1
  zero one two three four)

(import "./boolean.md"
  true false if)

;; NOTE `x` is `f`'s fixpoint if `(f x) = x`
;;   In lambda calculus, we have function `Y`
;;   which can find fixpoint of any function.
;;      (f (Y f)) = (Y f)

(define (Y f)
  ((lambda (x) (f (x x)))
   (lambda (x) (f (x x)))))

;; (claim factorial-wrap (-> (-> Nat Nat) (-> Nat Nat)))
;; (claim (Y factorial-wrap) (-> Nat Nat))
;; (claim y (forall (A) (-> (-> A A) A)))

(define (factorial-wrap factorial)
  (lambda (n)
    (if (zero? n)
      one
      (mul n (factorial (sub1 n))))))

(define factorial (Y factorial-wrap))

(factorial zero)
(factorial one)
(factorial two)
(factorial three)
(factorial four)
```

### Cons the Magnificent

```scheme
;; NOTE Temporarily save `car` and `cdr` to a lambda,
;;   apply this lambda to a function -- `f`,
;;   will apply `f` to the saved `car` and `cdr`
(define (cons car cdr) (lambda (f) (f car cdr)))
(define (car pair) (pair (lambda (car cdr) car)))
(define (cdr pair) (pair (lambda (car cdr) cdr)))

(import "./boolean.md"
  true false)

(define (null f) true)
(define (null? pair) (pair (lambda (car cdr) false)))

(null? null)
```

## Development

```sh
npm install           # Install dependencies
npm run build         # Compile `src/` to `lib/`
npm run build:watch   # Watch the compilation
npm run format        # Format the code
npm run test          # Run test
npm run test:watch    # Watch the testing
```

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
