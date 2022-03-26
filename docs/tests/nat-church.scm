(define zero (lambda (base step) base))
(define (add1 n) (lambda (base step) (step (n base step))))
(define (iter-nat n base step) (n base step))

(define one (add1 zero))
(define two (add1 one))
(define three (add1 two))
(define four (add1 three))

(define (add m n) (iter-nat m n add1))

(assert-equal
 (add1 three)
 (add two two))

;; NOTE The above `add` is `O(n)`,
;; Rosser has a `O(C)` which takes
;; four beta-reduction steps for any inputs
;; (assuming inputs are in normal forms).

(define (add-rosser m n)
  (lambda (base step)
    (iter-nat m (iter-nat n base step) step)))

(assert-equal
 (add1 three)
 (add-rosser two two))

(define (mul m n) (iter-nat m zero (add n)))

(assert-equal
 (add two two)
 (mul two two))

(assert-equal
 (mul two (mul two (mul two two)))
 (mul (mul two two) (mul two two)))

(define (power-of m n) (iter-nat m one (mul n)))
(define (power m n) (power-of n m))

(assert-equal
 (power two four)
 (mul (mul two two) (mul two two))
 (power four two)
 (mul four four))

(import "./boolean.scm" true false if and or not)

(define (zero? n) (iter-nat n true (lambda (x) false)))

(assert-equal (zero? zero) true)
(assert-equal (zero? one) false)
(assert-equal (zero? two) false)

(define (sub1 n)
  (iter-nat
   n
   (lambda (_) zero)
   (lambda (g k) (zero? (g one) k (add (g k) one)))
   zero))

(assert-equal
 zero
 (sub1 one)
 (sub1 (sub1 two))
 (sub1 (sub1 (sub1 three)))
 (sub1 (sub1 (sub1 (sub1 three))))
 (sub1 (sub1 (sub1 (sub1 (sub1 three))))))

(define (sub m n) (iter-nat n m sub1))

(assert-equal (sub three zero) three)
(assert-equal (sub three one) two)
(assert-equal (sub three two) one)
(assert-equal (sub three three) zero (sub three four))

(define (lteq m n) (zero? (sub m n)))

(assert-equal (lteq three four) true)
(assert-equal (lteq four three) false)

(define (even? n)
  (if (zero? n) true
      (odd? (sub1 n))))

(define (odd? n)
  (if (zero? n) false
      (even? (sub1 n))))

(assert-equal
 (even? zero)
 (even? two)
 (even? four)
 true)

(assert-equal
 (even? one)
 (even? three)
 false)

(assert-equal
 (odd? zero)
 (odd? two)
 (odd? four)
 false)

(assert-equal
 (odd? one)
 (odd? three)
 true)
