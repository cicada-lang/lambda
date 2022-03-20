(define (zero f x) x)

(define (one f x) (f x))
(define (two f x) (f (f x)))
(define (three f x) (f (f (f x))))

(define (add1 n f x) (f (n f x)))
(define (add m n f x) (m f (n f x)))
(define (add-alt m n) (m add1 n))

(define (mul m n f) (m (n f)))
(define (mul-alt m n) (m (add n) zero))

(define (power m n) (m n))

(add1 (add1 zero))
(add1 one)
two

(mul two two)
(add two two)
(add1 three)

(define four (add1 three))

(mul two (mul two (mul two two)))
(mul (mul two two) (mul two two))
(mul-alt (mul-alt two two) (mul-alt two two))

(power two four)
(power four two)
