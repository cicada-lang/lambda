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

(import "./boolean.scm" true false if and or not)

(define (zero-p n) (n (lambda (x) false) true))

(zero-p zero)
(zero-p one)
(zero-p two)

(define (sub1 n)
  (n (lambda (g k) (zero-p (g one) k (add (g k) one)))
     (lambda (_) zero)
     zero))

(sub1 three)
(sub1 (sub1 three))
(sub1 (sub1 (sub1 three)))
(sub1 (sub1 (sub1 (sub1 three))))

(define (sub m n) (n sub1 m))

(sub three zero)
(sub three one)
(sub three two)
(sub three three)
(sub three four)

(define (lteq m n) (zero-p (sub m n)))

(lteq three four)
(lteq three two)
