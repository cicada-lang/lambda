(import zero? add mul sub1 "./nat-church.scm")
(import zero one two three four "./nat-church.scm")
(import if true false "./boolean.scm")

;; (claim factorial-half
;;   (fix (lambda (X) (-> X Nat Nat))))

(define (factorial-half self n)
  (if (zero? n)
    one
    (mul n (self self (sub1 n)))))

factorial-half

(define factorial (factorial-half factorial-half))

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))
