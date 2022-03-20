(define (id x) x)

(define (zero f x) x)
(define (one f x) (f x))
(define (two f x) (f (f x)))

(define four (add1 (add1 two)))

(define (add1 n f x) (n (f x)))

zero
add1
(add1 zero)
(add1 (add1 zero))
(add1 (add1 (add1 zero)))
