(define (zero f x) x)
(define (one f x) (f x))
(define (two f x) (f (f x)))

(define (add1 n f x) (f (n f x)))

(add1 (add1 zero))
(add1 one)
two
