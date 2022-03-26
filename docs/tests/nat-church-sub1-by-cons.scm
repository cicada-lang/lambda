(import "./nat-church.scm" zero add1 iter-nat)
(import "./cons.scm" cons car cdr)

(define (shift-add1 x)
  (cons (cdr x) (add1 (cdr x))))

(define (sub1 n)
  (car (iter-nat n (cons zero zero) shift-add1)))

(assert-equal
 (sub1 (add1 (add1 zero)))
 (add1 zero))

(assert-equal
 (sub1 (add1 zero))
 zero)
