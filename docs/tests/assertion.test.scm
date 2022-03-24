(assert-equal
 (lambda (x) x)
 (lambda (y) y))

(assert-equal
 (lambda (x y) (x y))
 (lambda (y x) (y x)))
