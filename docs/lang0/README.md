# Lang0

Lambda calculus.

- Implement call-by-need lazy evaluation.
- A name must be defined before used, thus no mutual recursion.
- Allow non-mutual recursive by `(fixpoint)`.


```scheme
(define name body)
(define (name arg ...) body)
(import "./file.scm")
(assert-equal exp ...)
(assert-not-equal exp ...)

(lambda (name) ret)
(fixpoint name body)
```

## Examples

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
(import "./nat-church.scm"
  zero? add mul sub1
  zero one two three four)

(import "./boolean.scm"
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
(import "./nat-church.scm"
  zero? add mul sub1
  zero one two three four)

(import "./boolean.scm"
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

(import "./boolean.scm"
  true false)

(define (null f) true)
(define (null? pair) (pair (lambda (car cdr) false)))

(null? null)
```
