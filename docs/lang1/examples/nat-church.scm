;; Church Encoding of Natural Number

(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step (prev base step))))
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

(add two five) seven
(add three three) six

(define (add-rosser m n)
  (lambda (base step)
    (iter-Nat m (iter-Nat n base step) step)))

(add-rosser two five) seven
(add-rosser three three) six
