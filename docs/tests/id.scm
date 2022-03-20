(define (id x) x)

(define (compose f g x) (f (g x)))

(compose
 (compose id id)
 (compose id id))
