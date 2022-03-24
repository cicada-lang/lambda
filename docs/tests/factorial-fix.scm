(import "./nat.scm" zero? add mul sub1)
(import "./nat.scm" zero one two three four)
(import "./boolean.scm" if true false)

(define (fix g)
  ((lambda (x) (g (x x)))
   (lambda (x) (g (x x)))))

(define (factorial rec n)
  (if (zero? n)
    one
    (mul n (rec (sub1 n)))))

(assert-equal ((fix factorial) zero) one)
(assert-equal ((fix factorial) one) one)
(assert-equal ((fix factorial) two) two)
(assert-equal ((fix factorial) three) (mul three two))
(assert-equal ((fix factorial) four) (mul four (mul three two)))
