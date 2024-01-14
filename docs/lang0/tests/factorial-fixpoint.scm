(import "./nat-church.md" zero? add1 add mul sub1)
(import "./nat-church.md" zero one two three four)
(import "./boolean.md" if true false)

(define factorial
  (fixpoint factorial
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n)))))))

factorial

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))

(assert-equal factorial factorial)

(assert-equal
  (fixpoint factorial
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n))))))
  (fixpoint fact
    (lambda (n)
      (if (zero? n)
        one
        (mul n (fact (sub1 n)))))))

(assert-not-equal
  (fixpoint factorial
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n))))))
  (lambda (factorial)
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n)))))))

(assert-equal
  factorial
  (lambda (n) (factorial n))
  (lambda (n) ((lambda (n) (factorial n)) n)))

(assert-equal
  (fixpoint factorial
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n))))))
  (lambda (n)
    ((fixpoint factorial
       (lambda (n)
         (if (zero? n)
           one
           (mul n (factorial (sub1 n))))))
     n)))
