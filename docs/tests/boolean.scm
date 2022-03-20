(define (true then else) then)
(define (false then else) else)

(define (if boolean then else) (boolean then else))

(define (and x y) (if x y false))
(define (or x y) (if x true y))
(define (not x) (if x false true))

true
false
(and true false)
(not (not (or true false)))
