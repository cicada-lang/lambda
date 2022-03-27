;; (comments
;;  (define Nat (forall (X) (-> (-> X X) (-> X X)))))

(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step (prev base step))))

;; (comments
;;  (claim iter-Nat
;;    (forall (X)
;;      (Pi ((n Nat)
;;           (base X)
;;           (step (-> X X)))
;;        X))))

(define (iter-Nat n base step) (n base step))

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

(define (add m n) (iter-Nat m n add1))

(assert-equal (add two five) seven)
(assert-equal (add three three) six)

(define (mul m n) (iter-Nat m zero (add n)))

(assert-equal (mul two five) ten)
(assert-equal (mul three three) nine)
(assert-equal (add two two) (mul two two))

(assert-equal
 (mul two (mul two (mul two two)))
 (mul (mul two two) (mul two two)))

(define (power-of m n) (iter-Nat m one (mul n)))
(define (power m n) (power-of n m))

(assert-equal (power two three) eight)
(assert-equal (power three two) nine)

(assert-equal
 (power two four)
 (mul (mul two two) (mul two two))
 (power four two)
 (mul four four))
