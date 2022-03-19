(define (id x) x)

(define (zero f x) x)
(define (one f x) (f x))
(define (two f x) (f (f x)))

(define (add1 n f x) (n (f x)))
