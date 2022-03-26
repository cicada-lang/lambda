(define (zero z s) z)
(define (add1 n z s) (s n))
(define (nat-case n u f) (n u f))

(define one (add1 zero))
(define two (add1 one))
(define three (add1 two))

(define id (lambda (x) x))

(define (sub1 n) (nat-case n zero id))

(assert-equal (sub1 three) two)
(assert-equal (sub1 two) one)
(assert-equal (sub1 one) zero)
(assert-equal (sub1 zero) zero)
