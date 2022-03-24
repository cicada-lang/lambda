(import "./nat.scm" zero? add mul sub1)
(import "./nat.scm" zero one two three four)
(import "./boolean.scm" if true false)

(define (factorial rec n)
  (if (zero? n)
    one
    (mul n (rec rec (sub1 n)))))

(assert-equal ((factorial factorial) zero) one)
(assert-equal ((factorial factorial) one) one)
(assert-equal ((factorial factorial) two) two)
(assert-equal ((factorial factorial) three) (mul three two))
(assert-equal ((factorial factorial) four) (mul four (mul three two)))
