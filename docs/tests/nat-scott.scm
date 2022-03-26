(define zero (lambda (base step) base))
(define (add1 prev) (lambda (base step) (step prev)))
(define (case-nat n base step) (n base step))

(define one (add1 zero))
(define two (add1 one))
(define three (add1 two))
(define four (add1 three))

(define (sub1 n)
  (case-nat
   n
   zero
   (lambda (prev) prev)))

(assert-equal (sub1 three) two)
(assert-equal (sub1 two) one)
(assert-equal (sub1 one) zero)
(assert-equal (sub1 zero) zero)

(import "./fix.scm" fix)

(define (add-wrap add)
  (lambda (m n)
    (case-nat
     m
     n
     (lambda (prev) (add1 (add prev n))))))

(define add (fix add-wrap))

(assert-equal (add one one) two)
(assert-equal (add two two) four)
