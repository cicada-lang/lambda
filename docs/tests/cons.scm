(import "./boolean.scm" true false)

(define (cons a d f) (f a d))
(define (car p) (p true))
(define (cdr p) (p false))

(define (null f) true)
(define (null? p) (p (lambda (x y) false)))
