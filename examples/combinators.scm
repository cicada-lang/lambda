(define (S x y z) ((x z) (y z)))
(define (K x y) x)
(define (I x) x)

(I)
(K I)
(S K I)
