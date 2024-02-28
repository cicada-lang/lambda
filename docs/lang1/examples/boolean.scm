;; Boolean

;; # True and False

(define (true t f) t)
(define (false t f) f)

;; # Logical connectives

(define (if p t f) (p t f))

(define (and x y) (if x y false))
(define (or x y) (if x true y))
(define (not x) (if x false true))

;; ## Tests

(and true false) false
(or true false) true
(not true) false
(not (not true)) true

(lambda (x) (not (not true)))
(lambda (x) true)
