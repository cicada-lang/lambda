;; Church Encoding of Natural Number

;; # zero & add1 & which-Nat

(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step (prev base step))))
(define (iter-Nat n base step) (n base step))

;; ## Typing

;; The type of `zero` is the `Nat`.
;; We know

;; (claim zero
;;   (forall (X)
;;     (-> X (-> X X) X)))

;; Thus

;; (define Nat
;;   (forall (X)
;;     (-> X (-> X X) X)))

;; (claim add1
;;   (-> Nat Nat)
;;   (forall (X)
;;     (-> Nat (-> X (-> X X) X))))

;; (claim iter-Nat
;;   (forall (X)
;;     (-> Nat (-> X (-> X X) X))))

;; # one to ten

(define one (add1 zero))
(define two (add1 one))
(define three (add1 two))
(define four (add1 three))
(define five (add1 four))
(define six (add1 five))
(define seven (add1 six))
(define eight (add1 seven))
(define nine (add1 eight))
(define ten (add1 nine))

;; # add

(define (add m n) (iter-Nat m n add1))

(assert-equal (add two five) seven)
(assert-equal (add three three) six)

;; # add-rosser

;; The above `add` is `O(n)`,
;; Rosser has a `O(4)` `add`, which takes
;; four beta-reduction steps for any inputs
;; (assuming inputs are in normal forms).

(define (add-rosser m n)
  (lambda (base step)
    (iter-Nat m (iter-Nat n base step) step)))

(assert-equal (add-rosser two five) seven)
(assert-equal (add-rosser three three) six)

;; # mul

(define (mul m n) (iter-Nat m zero (add n)))

(assert-equal (mul two five) ten)
(assert-equal (mul three three) nine)
(assert-equal (add two two) (mul two two))

(assert-equal
  (mul two (mul two (mul two two)))
  (mul (mul two two) (mul two two)))

;; # power-of & power

(define (power-of m n) (iter-Nat m one (mul n)))
(define (power m n) (power-of n m))

(assert-equal (power two three) eight)
(assert-equal (power three two) nine)

(assert-equal
  (power two four)
  (mul (mul two two) (mul two two))
  (power four two)
  (mul four four))

;; # zero?

(import true false if and or not "./boolean.scm")

(define (zero? n) (iter-Nat n true (lambda (x) false)))

(assert-equal (zero? zero) true)
(assert-equal (zero? one) false)
(assert-equal (zero? two) false)

;; # sub1

;; The `sub1` about is `O(n)`,
;; while `sub1` for Scott encoding is `O(3)`.

(import cons car cdr "./cons.scm")

(define (shift-add1 x)
  (cons (cdr x) (add1 (cdr x))))

(define (sub1 n)
  (car (iter-Nat n (cons zero zero) shift-add1)))

(assert-equal (sub1 two) one)
(assert-equal (sub1 one) zero)
(assert-equal (sub1 zero) zero)

;; # sub

(define (sub m n) (iter-Nat n m sub1))

(assert-equal (sub three zero) three)
(assert-equal (sub three one) two)
(assert-equal (sub three two) one)
(assert-equal (sub three three) zero (sub three four))

;; # lteq

(define (lteq m n) (zero? (sub m n)))

(assert-equal (lteq three four) true)
(assert-equal (lteq four three) false)
