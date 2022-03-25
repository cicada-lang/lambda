# Lambda Calculus

An implementation of [(Untyped) Lambda Calculus](https://en.wikipedia.org/wiki/Lambda_calculus) in JavaScript.

- Use [S-expression](https://github.com/cicada-lang/sexp) as overall syntax.
- Implement call-by-need lazy evaluation.
- Allow recursive definitions.
- With a simple module system that can load module from URL.
- With simple testing statements `(assert-equal)` and `(assert-not-equal)`.
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
lambda docs/tests/boolean.test.scm
```

Run a module by URL:

```
lambda https://readonly.link/files/cicada-lang/lambda/-/docs/tests/boolean.test.scm
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

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGRlZmluZSAoemVybyBmIHgpIHgpCihkZWZpbmUgKG9uZSBmIHgpIChmIHgpKQooZGVmaW5lICh0d28gZiB4KSAoZiAoZiB4KSkpCihkZWZpbmUgKHRocmVlIGYgeCkgKGYgKGYgKGYgeCkpKSkKCihkZWZpbmUgKGFkZDEgbiBmIHgpIChmIChuIGYgeCkpKQoKKGRlZmluZSBmb3VyIChhZGQxIHRocmVlKSkKCihkZWZpbmUgKGFkZCBtIG4gZiB4KSAobSBmIChuIGYgeCkpKQooZGVmaW5lIChtdWwgbSBuIGYpIChtIChuIGYpKSkKCihpbXBvcnQgImh0dHBzOi8vcmVhZG9ubHkubGluay9maWxlcy9jaWNhZGEtbGFuZy9sYW1iZGEvLS9kb2NzL3Rlc3RzL2Jvb2xlYW4uc2NtIgogIHRydWUgZmFsc2UgaWYgYW5kIG9yIG5vdCkKCihkZWZpbmUgKHplcm8_IG4pIChuIChsYW1iZGEgKHgpIGZhbHNlKSB0cnVlKSkKCihkZWZpbmUgKHN1YjEgbikKICAobiAobGFtYmRhIChnIGspICh6ZXJvPyAoZyBvbmUpIGsgKGFkZCAoZyBrKSBvbmUpKSkKICAgICAobGFtYmRhIChfKSB6ZXJvKQogICAgIHplcm8pKQoKKGRlZmluZSAoc3ViIG0gbikgKG4gc3ViMSBtKSkKCihzdWIgZm91ciB0d28pCihzdWIgdGhyZWUgb25lKQ)
| [WIKIPEDIA](https://en.wikipedia.org/wiki/Church_encoding) ]

[**docs/tests/nat.scm**](docs/tests/nat.scm)

```scheme
(define (zero f x) x)
(define (one f x) (f x))
(define (two f x) (f (f x)))
(define (three f x) (f (f (f x))))

(define (add1 n f x) (f (n f x)))

(define four (add1 three))

(define (add m n f x) (m f (n f x)))
(define (mul m n f) (m (n f)))

(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/boolean.scm"
  true false if and or not)

(define (zero? n) (n (lambda (x) false) true))

(define (sub1 n)
  (n (lambda (g k) (zero? (g one) k (add (g k) one)))
     (lambda (_) zero)
     zero))

(define (sub m n) (n sub1 m))

(sub four two)
(sub three one)
```

### Factorial

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGltcG9ydCAiaHR0cHM6Ly9yZWFkb25seS5saW5rL2ZpbGVzL2NpY2FkYS1sYW5nL2xhbWJkYS8tL2RvY3MvdGVzdHMvbmF0LnNjbSIKICB6ZXJvPyBhZGQgbXVsIHN1YjEKICB6ZXJvIG9uZSB0d28gdGhyZWUgZm91cikKCihpbXBvcnQgImh0dHBzOi8vcmVhZG9ubHkubGluay9maWxlcy9jaWNhZGEtbGFuZy9sYW1iZGEvLS9kb2NzL3Rlc3RzL2Jvb2xlYW4uc2NtIgogIHRydWUgZmFsc2UgaWYpCgooZGVmaW5lIChmYWN0b3JpYWwgbikKICAoaWYgKHplcm8_IG4pCiAgICBvbmUKICAgIChtdWwgbiAoZmFjdG9yaWFsIChzdWIxIG4pKSkpKQoKKGZhY3RvcmlhbCB6ZXJvKQooZmFjdG9yaWFsIG9uZSkKKGZhY3RvcmlhbCB0d28pCihmYWN0b3JpYWwgdGhyZWUpCg) ]

[**docs/tests/factorial.scm**](docs/tests/factorial.scm)

```scheme
(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/nat.scm"
  zero? add mul sub1
  zero one two three four)

(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/boolean.scm"
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

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGltcG9ydCAiaHR0cHM6Ly9yZWFkb25seS5saW5rL2ZpbGVzL2NpY2FkYS1sYW5nL2xhbWJkYS8tL2RvY3MvdGVzdHMvbmF0LnNjbSIKICB6ZXJvPyBhZGQgbXVsIHN1YjEKICB6ZXJvIG9uZSB0d28gdGhyZWUgZm91cikKCihpbXBvcnQgImh0dHBzOi8vcmVhZG9ubHkubGluay9maWxlcy9jaWNhZGEtbGFuZy9sYW1iZGEvLS9kb2NzL3Rlc3RzL2Jvb2xlYW4uc2NtIgogIHRydWUgZmFsc2UgaWYpCgooZGVmaW5lIChmaXggZykKICAoKGxhbWJkYSAoeCkgKGcgKHggeCkpKQogICAobGFtYmRhICh4KSAoZyAoeCB4KSkpKSkKCihkZWZpbmUgKGZhY3RvcmlhbCByZWMgbikKICAoaWYgKHplcm8_IG4pCiAgICBvbmUKICAgIChtdWwgbiAocmVjIChzdWIxIG4pKSkpKQoKKChmaXggZmFjdG9yaWFsKSB6ZXJvKQooKGZpeCBmYWN0b3JpYWwpIG9uZSkKKChmaXggZmFjdG9yaWFsKSB0d28pCigoZml4IGZhY3RvcmlhbCkgdGhyZWUpCigoZml4IGZhY3RvcmlhbCkgZm91cikK)
| [WIKIPEDIA](https://en.wikipedia.org/wiki/Fixed-point_combinator) ]

[**docs/tests/factorial-fix.scm**](docs/tests/factorial-fix.scm)

```scheme
(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/nat.scm"
  zero? add mul sub1
  zero one two three four)

(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/boolean.scm"
  true false if)

(define (fix g)
  ((lambda (x) (g (x x)))
   (lambda (x) (g (x x)))))

(define (factorial rec n)
  (if (zero? n)
    one
    (mul n (rec (sub1 n)))))

((fix factorial) zero)
((fix factorial) one)
((fix factorial) two)
((fix factorial) three)
((fix factorial) four)
```

### Cons the magnificent

[ [PLAYGROUND](https://lambda.cicada-lang.org/playground/KGltcG9ydCAiaHR0cHM6Ly9yZWFkb25seS5saW5rL2ZpbGVzL2NpY2FkYS1sYW5nL2xhbWJkYS8tL2RvY3MvdGVzdHMvYm9vbGVhbi5zY20iCiAgdHJ1ZSBmYWxzZSkKCihkZWZpbmUgKGNvbnMgYSBkIGYpIChmIGEgZCkpCihkZWZpbmUgKGNhciBwKSAocCB0cnVlKSkKKGRlZmluZSAoY2RyIHApIChwIGZhbHNlKSkKCihkZWZpbmUgKG51bGwgZikgdHJ1ZSkKKGRlZmluZSAobnVsbD8gcCkgKHAgKGxhbWJkYSAoeCB5KSBmYWxzZSkpKQoKOzsgTk9URSBBIGJldHRlciB3YXkgdG8gZGVmaW5lIGBzdWIxYCBmb3IgQ2h1cmNoIE51bWVyYWxzLgoKKGltcG9ydCAiaHR0cHM6Ly9yZWFkb25seS5saW5rL2ZpbGVzL2NpY2FkYS1sYW5nL2xhbWJkYS8tL2RvY3MvdGVzdHMvbmF0LnNjbSIKICB6ZXJvIGFkZDEpCgooZGVmaW5lIChzaGlmdC1hZGQxIHgpCiAgKGNvbnMgKGNkciB4KSAoYWRkMSAoY2RyIHgpKSkpCgooZGVmaW5lIChzdWIxIG4pCiAgKGNhciAobiBzaGlmdC1hZGQxIChjb25zIHplcm8gemVybykpKSkKCihzdWIxIChhZGQxIChhZGQxIHplcm8pKSkKKHN1YjEgKGFkZDEgemVybykpCnplcm8) ]

[**docs/tests/cons.scm**](docs/tests/cons.scm)

```scheme
(import "https://readonly.link/files/cicada-lang/lambda/-/docs/tests/boolean.scm"
  true false)

(define (cons a d f) (f a d))
(define (car p) (p true))
(define (cdr p) (p false))

(define (null f) true)
(define (null? p) (p (lambda (x y) false)))

;; NOTE A better way to define `sub1` for Church Numerals.

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
