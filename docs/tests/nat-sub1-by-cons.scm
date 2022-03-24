(import "./nat.scm" zero add1)
(import "./cons.scm" cons car cdr)

(define (shift-add1 x)
  (cons (cdr x) (add1 (cdr x))))

(define (sub1 n)
  (car (n shift-add1 (cons zero zero))))

(assert-equal
 (sub1 (add1 (add1 zero)))
 (add1 zero))

(assert-equal
 (sub1 (add1 zero))
 zero)
