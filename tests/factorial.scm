(import "./nat-church.md" zero? add mul sub1)
(import "./nat-church.md" zero one two three four)
(import "./boolean.md" if true false)

(comments
  (claim factorial (-> Nat Nat)))

(define (factorial n)
  (if (zero? n)
    one
    (mul n (factorial (sub1 n)))))

factorial

(assert-equal
  factorial
  (fixpoint factorial
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n)))))))

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))
