# Lambda Calculus

> More restraint and more pure, <br>
> so functional and so reduced.
>
> -- Anonymous Bauhaus Student

An implementation of [(Untyped) Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus).

- Use [S-expression](https://github.com/cicada-lang/sexp) as overall syntax.
- Implement call-by-need lazy evaluation.
- Allow recursive in top-level definitions.
  - No mutual recursion, a name must be defined before used.
- A simple module system with only one API -- `(import)`.
  - It can import module from local file or remote URL.
- Two simple testing statements `(assert-equal)` and `(assert-not-equal)`.
  - They can handle beta and eta equivalence.

## Usage

### Online playground

Visit the [Lambda Playground](https://lambda.cicada-lang.org/playground/KGRlZmluZSAodHJ1ZSB0IGYpIHQpCihkZWZpbmUgKGZhbHNlIHQgZikgZikKCihkZWZpbmUgKGlmIHAgdCBmKSAocCB0IGYpKQoKKGRlZmluZSAoYW5kIHggeSkgKGlmIHggeSBmYWxzZSkpCihkZWZpbmUgKG9yIHggeSkgKGlmIHggdHJ1ZSB5KSkKKGRlZmluZSAobm90IHgpIChpZiB4IGZhbHNlIHRydWUpKQoKKGFuZCB0cnVlIGZhbHNlKQoobm90IChub3QgKG9yIHRydWUgZmFsc2UpKSk).

### Command line tool

Install it by the following command:

```
npm -g i @cicada-lang/lambda
```

The command line program is called `lambda`.

Run a module by file:

```
lambda docs/tests/nat-church.md
```

Run a module by URL:

```
lambda https://readonly.link/files/cicada-lang/lambda/-/docs/tests/nat-church.md
```

## Examples

Please see [docs/tests](docs/tests) for more examples.

### Boolean

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGRlZmluZSAodHJ1ZSB0IGYpIHQpCihkZWZpbmUgKGZhbHNlIHQgZikgZikKCihkZWZpbmUgKGlmIHAgdCBmKSAocCB0IGYpKQoKKGRlZmluZSAoYW5kIHggeSkgKGlmIHggeSBmYWxzZSkpCihkZWZpbmUgKG9yIHggeSkgKGlmIHggdHJ1ZSB5KSkKKGRlZmluZSAobm90IHgpIChpZiB4IGZhbHNlIHRydWUpKQoKKGFuZCB0cnVlIGZhbHNlKQoobm90IChub3QgKG9yIHRydWUgZmFsc2UpKSk) ]

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

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGRlZmluZSB6ZXJvIChsYW1iZGEgKGJhc2Ugc3RlcCkgYmFzZSkpCihkZWZpbmUgKGFkZDEgbikgKGxhbWJkYSAoYmFzZSBzdGVwKSAoc3RlcCAobiBiYXNlIHN0ZXApKSkpCihkZWZpbmUgKGl0ZXItTmF0IG4gYmFzZSBzdGVwKSAobiBiYXNlIHN0ZXApKQoKKGRlZmluZSBvbmUgKGFkZDEgemVybykpCihkZWZpbmUgdHdvIChhZGQxIG9uZSkpCihkZWZpbmUgdGhyZWUgKGFkZDEgdHdvKSkKCihkZWZpbmUgKGFkZCBtIG4pIChpdGVyLU5hdCBtIG4gYWRkMSkpCgooYWRkIHR3byB0d28p)
| [WIKIPEDIA](https://en.wikipedia.org/wiki/Church_encoding)
| [READONLY.LINK](https://readonly.link/articles/cicada-lang/lambda/-/docs/tests/nat-church.md) ]

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

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGltcG9ydCAiaHR0cHM6Ly9yZWFkb25seS5saW5rL2ZpbGVzL2NpY2FkYS1sYW5nL2xhbWJkYS8tL2RvY3MvdGVzdHMvbmF0LnNjbSIKICB6ZXJvPyBhZGQgbXVsIHN1YjEKICB6ZXJvIG9uZSB0d28gdGhyZWUgZm91cikKCihpbXBvcnQgImh0dHBzOi8vcmVhZG9ubHkubGluay9maWxlcy9jaWNhZGEtbGFuZy9sYW1iZGEvLS9kb2NzL3Rlc3RzL2Jvb2xlYW4uc2NtIgogIHRydWUgZmFsc2UgaWYpCgooZGVmaW5lIChmYWN0b3JpYWwgbikKICAoaWYgKHplcm8_IG4pCiAgICBvbmUKICAgIChtdWwgbiAoZmFjdG9yaWFsIChzdWIxIG4pKSkpKQoKKGZhY3RvcmlhbCB6ZXJvKQooZmFjdG9yaWFsIG9uZSkKKGZhY3RvcmlhbCB0d28pCihmYWN0b3JpYWwgdGhyZWUpCg) ]

```scheme
(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/nat-church.md"
  zero? add mul sub1
  zero one two three four)

(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/boolean.md"
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

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGltcG9ydCAiaHR0cHM6Ly9yZWFkb25seS5saW5rL2ZpbGVzL2NpY2FkYS1sYW5nL2xhbWJkYS8tL2RvY3MvdGVzdHMvbmF0LWNodXJjaC5tZCIKICB6ZXJvPyBhZGQgbXVsIHN1YjEKICB6ZXJvIG9uZSB0d28gdGhyZWUgZm91cikKCihpbXBvcnQgImh0dHBzOi8vcmVhZG9ubHkubGluay9maWxlcy9jaWNhZGEtbGFuZy9sYW1iZGEvLS9kb2NzL3Rlc3RzL2Jvb2xlYW4ubWQiCiAgdHJ1ZSBmYWxzZSBpZikKCjs7IE5PVEUgYHhgIGlzIGBmYCdzIGZpeHBvaW50IGlmIGAoZiB4KSA9IHhgCjs7ICAgSW4gbGFtYmRhIGNhbGN1bHVzLCB3ZSBoYXZlIGZ1bmN0aW9uIGBZYAo7OyAgIHdoaWNoIGNhbiBmaW5kIGZpeHBvaW50IG9mIGFueSBmdW5jdGlvbi4KOzsgICAgICAoZiAoWSBmKSkgPSAoWSBmKQoKKGRlZmluZSAoWSBmKQogICgobGFtYmRhICh4KSAoZiAoeCB4KSkpCiAgIChsYW1iZGEgKHgpIChmICh4IHgpKSkpKQoKOzsgKGNsYWltIGZhY3RvcmlhbC13cmFwICgtPiAoLT4gTmF0IE5hdCkgKC0-IE5hdCBOYXQpKSkKOzsgKGNsYWltIChZIGZhY3RvcmlhbC13cmFwKSAoLT4gTmF0IE5hdCkpCjs7IChjbGFpbSB5IChmb3JhbGwgKEEpICgtPiAoLT4gQSBBKSBBKSkpCgooZGVmaW5lIChmYWN0b3JpYWwtd3JhcCBmYWN0b3JpYWwpCiAgKGxhbWJkYSAobikKICAgIChpZiAoemVybz8gbikKICAgICAgb25lCiAgICAgIChtdWwgbiAoZmFjdG9yaWFsIChzdWIxIG4pKSkpKSkKCihkZWZpbmUgZmFjdG9yaWFsIChZIGZhY3RvcmlhbC13cmFwKSkKCihmYWN0b3JpYWwgemVybykKKGZhY3RvcmlhbCBvbmUpCihmYWN0b3JpYWwgdHdvKQooZmFjdG9yaWFsIHRocmVlKQooZmFjdG9yaWFsIGZvdXIp)
| [WIKIPEDIA](https://en.wikipedia.org/wiki/Fixed-point_combinator) ]

```scheme
(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/nat-church.md"
  zero? add mul sub1
  zero one two three four)

(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/boolean.md"
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

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/OzsgTk9URSBUZW1wb3JhcmlseSBzYXZlIGBjYXJgIGFuZCBgY2RyYCB0byBhIGxhbWJkYSwKOzsgICBhcHBseSB0aGlzIGxhbWJkYSB0byBhIGZ1bmN0aW9uIC0tIGBmYCwKOzsgICB3aWxsIGFwcGx5IGBmYCB0byB0aGUgc2F2ZWQgYGNhcmAgYW5kIGBjZHJgCihkZWZpbmUgKGNvbnMgY2FyIGNkcikgKGxhbWJkYSAoZikgKGYgY2FyIGNkcikpKQooZGVmaW5lIChjYXIgcGFpcikgKHBhaXIgKGxhbWJkYSAoY2FyIGNkcikgY2FyKSkpCihkZWZpbmUgKGNkciBwYWlyKSAocGFpciAobGFtYmRhIChjYXIgY2RyKSBjZHIpKSkKCihpbXBvcnQgImh0dHBzOi8vcmVhZG9ubHkubGluay9maWxlcy9jaWNhZGEtbGFuZy9sYW1iZGEvLS9kb2NzL3Rlc3RzL2Jvb2xlYW4uc2NtIgogIHRydWUgZmFsc2UpCgooZGVmaW5lIChudWxsIGYpIHRydWUpCihkZWZpbmUgKG51bGw_IHBhaXIpIChwYWlyIChsYW1iZGEgKGNhciBjZHIpIGZhbHNlKSkpCgooYXNzZXJ0LWVxdWFsCiAobnVsbD8gbnVsbCkKIChudWxsIChsYW1iZGEgKGNhciBjZHIpIGZhbHNlKSkKIHRydWUpCgooYXNzZXJ0LWVxdWFsCiAobnVsbD8gKGNvbnMgbnVsbCBudWxsKSkKICgoY29ucyBudWxsIG51bGwpIChsYW1iZGEgKGNhciBjZHIpIGZhbHNlKSkKICgobGFtYmRhIChjYXIgY2RyKSBmYWxzZSkgbnVsbCBudWxsKQogZmFsc2Up) ]

```scheme
;; NOTE Temporarily save `car` and `cdr` to a lambda,
;;   apply this lambda to a function -- `f`,
;;   will apply `f` to the saved `car` and `cdr`
(define (cons car cdr) (lambda (f) (f car cdr)))
(define (car pair) (pair (lambda (car cdr) car)))
(define (cdr pair) (pair (lambda (car cdr) cdr)))

(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/boolean.md"
  true false)

(define (null f) true)
(define (null? pair) (pair (lambda (car cdr) false)))
```

## Development

```
npm install    // Install dependencies
npm run build  // Compile `src/` to `lib/`
npm run watch  // Watch the compilation
npm run test   // Run test
```

## Contributions

> Be polite, do not bring negative emotion to others.

- [TODO.md](TODO.md)
- [STYLE-GUIDE.md](STYLE-GUIDE.md)
- [CODE-OF-CONDUCT.md](CODE-OF-CONDUCT.md)
- When contributing, add yourself to [AUTHORS](AUTHORS)

## License

- [GPLv3](LICENSE)
