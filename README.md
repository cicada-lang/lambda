# Lambda Calculus

An implementation of [(Untyped) Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus) in JavaScript.

- Use [S-expression](https://github.com/cicada-lang/sexp) as overall syntax.
- Use callby-need lazy evaluation.
- Allow recursive definitions.
  - Aiming to study of the equivalence relation between recursive functions.

## Usage

### Online playground

Visit the [Lambda Playground](https://lambda.cicada-lang.org/playground/KGRlZmluZSAodHJ1ZSB0IGYpIHQpCihkZWZpbmUgKGZhbHNlIHQgZikgZikKCihkZWZpbmUgKGlmIHAgdCBmKSAocCB0IGYpKQoKKGRlZmluZSAoYW5kIHggeSkgKGlmIHggeSBmYWxzZSkpCihkZWZpbmUgKG9yIHggeSkgKGlmIHggdHJ1ZSB5KSkKKGRlZmluZSAobm90IHgpIChpZiB4IGZhbHNlIHRydWUpKQoKKGFuZCB0cnVlIGZhbHNlKQoobm90IChub3QgKG9yIHRydWUgZmFsc2UpKSk).

### Command line tool

The command line program is called `lambda`.

Install it by the following command:

```
npm -g i @cicada-lang/lambda
```

## Examples

### Boolean

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGRlZmluZSAodHJ1ZSB0IGYpIHQpCihkZWZpbmUgKGZhbHNlIHQgZikgZikKCihkZWZpbmUgKGlmIHAgdCBmKSAocCB0IGYpKQoKKGRlZmluZSAoYW5kIHggeSkgKGlmIHggeSBmYWxzZSkpCihkZWZpbmUgKG9yIHggeSkgKGlmIHggdHJ1ZSB5KSkKKGRlZmluZSAobm90IHgpIChpZiB4IGZhbHNlIHRydWUpKQoKKGFuZCB0cnVlIGZhbHNlKQoobm90IChub3QgKG9yIHRydWUgZmFsc2UpKSk) ]

[**docs/tests/boolean.scm**](docs/tests/boolean.scm)

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

### Church Numerals

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGRlZmluZSAoemVybyBmIHgpIHgpCgooZGVmaW5lIChvbmUgZiB4KSAoZiB4KSkKKGRlZmluZSAodHdvIGYgeCkgKGYgKGYgeCkpKQooZGVmaW5lICh0aHJlZSBmIHgpIChmIChmIChmIHgpKSkpCgooZGVmaW5lIChhZGQxIG4gZiB4KSAoZiAobiBmIHgpKSkKCihkZWZpbmUgKGFkZCBtIG4gZiB4KSAobSBmIChuIGYgeCkpKQooZGVmaW5lIChtdWwgbSBuIGYpIChtIChuIGYpKSkKCihkZWZpbmUgKHBvd2VyIG0gbikgKG0gbikpCgooaW1wb3J0ICJodHRwczovL3JlYWRvbmx5LmxpbmsvZmlsZXMvY2ljYWRhLWxhbmcvbGFtYmRhLy0vZG9jcy90ZXN0cy9ib29sZWFuLnNjbSIKICB0cnVlIGZhbHNlIGlmIGFuZCBvciBub3QpCgooZGVmaW5lICh6ZXJvPyBuKSAobiAobGFtYmRhICh4KSBmYWxzZSkgdHJ1ZSkpCgooZGVmaW5lIChzdWIxIG4pCiAgKG4gKGxhbWJkYSAoZyBrKSAoemVybz8gKGcgb25lKSBrIChhZGQgKGcgaykgb25lKSkpCiAgICAgKGxhbWJkYSAoXykgemVybykKICAgICB6ZXJvKSkKCihkZWZpbmUgKHN1YiBtIG4pIChuIHN1YjEgbSkpCgooZGVmaW5lIChsdGVxIG0gbikgKHplcm8_IChzdWIgbSBuKSkpCgooZGVmaW5lIChmYWN0b3JpYWwtcmVjIG4pCiAgKGlmICh6ZXJvPyBuKQogICAgb25lCiAgICAobXVsIG4gKGZhY3RvcmlhbC1yZWMgKHN1YjEgbikpKSkpCgooZmFjdG9yaWFsLXJlYyB6ZXJvKQooZmFjdG9yaWFsLXJlYyBvbmUpCihmYWN0b3JpYWwtcmVjIHR3bykKKGZhY3RvcmlhbC1yZWMgdGhyZWUp)
| [WIKIPEDIA](https://en.wikipedia.org/wiki/Church_encoding) ]

[**docs/tests/nat.scm**](docs/tests/nat.scm)

```scheme
(define (zero f x) x)

(define (one f x) (f x))
(define (two f x) (f (f x)))
(define (three f x) (f (f (f x))))

(define (add1 n f x) (f (n f x)))

(define (add m n f x) (m f (n f x)))
(define (mul m n f) (m (n f)))

(define (power m n) (m n))

(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/boolean.scm"
  true false if and or not)

(define (zero? n) (n (lambda (x) false) true))

(define (sub1 n)
  (n (lambda (g k) (zero? (g one) k (add (g k) one)))
     (lambda (_) zero)
     zero))

(define (sub m n) (n sub1 m))

(define (lteq m n) (zero? (sub m n)))

(define (factorial-rec n)
  (if (zero? n)
    one
    (mul n (factorial-rec (sub1 n)))))

(factorial-rec zero)
(factorial-rec one)
(factorial-rec two)
(factorial-rec three)
```

### Cons the magnificent

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGltcG9ydCAiaHR0cHM6Ly9yZWFkb25seS5saW5rL2ZpbGVzL2NpY2FkYS1sYW5nL2xhbWJkYS8tL2RvY3MvdGVzdHMvYm9vbGVhbi5zY20iCiAgdHJ1ZSBmYWxzZSkKCihkZWZpbmUgKGNvbnMgYSBkIGYpIChmIGEgZCkpCihkZWZpbmUgKGNhciBwKSAocCB0cnVlKSkKKGRlZmluZSAoY2RyIHApIChwIGZhbHNlKSkKCihkZWZpbmUgKG51bGwgZikgdHJ1ZSkKKGRlZmluZSAobnVsbD8gcCkgKHAgKGxhbWJkYSAoeCB5KSBmYWxzZSkpKQoKKGltcG9ydCAiaHR0cHM6Ly9yZWFkb25seS5saW5rL2ZpbGVzL2NpY2FkYS1sYW5nL2xhbWJkYS8tL2RvY3MvdGVzdHMvbmF0LnNjbSIKICB6ZXJvIGFkZDEpCgooZGVmaW5lIChzaGlmdC1hZGQxIHgpCiAgKGNvbnMgKGNkciB4KSAoYWRkMSAoY2RyIHgpKSkpCgooZGVmaW5lIChzdWIxIG4pCiAgKGNhciAobiBzaGlmdC1hZGQxIChjb25zIHplcm8gemVybykpKSkKCihzdWIxIChhZGQxIChhZGQxIHplcm8pKSkKKHN1YjEgKGFkZDEgemVybykpCnplcm8) ]

[**docs/tests/cons.scm**](docs/tests/cons.scm)

```scheme
(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/boolean.scm"
  true false)

(define (cons a d f) (f a d))
(define (car p) (p true))
(define (cdr p) (p false))

(define (null f) true)
(define (null? p) (p (lambda (x y) false)))

(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/nat.scm"
  zero add1)

(define (shift-add1 x)
  (cons (cdr x) (add1 (cdr x))))

(define (sub1 n)
  (car (n shift-add1 (cons zero zero))))

(sub1 (add1 (add1 zero)))
(sub1 (add1 zero))
zero
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
