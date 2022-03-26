(import "./nat-church.scm" zero? add mul sub1)
(import "./nat-church.scm" zero one two three four)
(import "./boolean.scm" if true false)

;; (claim factorial (-> Nat Nat))

(define (factorial n)
  (if (zero? n)
    one
    (mul n (factorial (sub1 n)))))

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))
