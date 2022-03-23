(import "./boolean.scm" true false)

(define (cons a d f) (f a d))
(define (car p) (p true))
(define (cdr p) (p false))

(define (null f) true)
(define (null? p) (p (lambda (x y) false)))

(assert-equal (null? (cons null null)) false)

(assert-equal
 (null? (car (cons null null)))
 (null? (cdr (cons null null)))
 (null? null)
 true)

(import "./nat.scm" zero add1)

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
