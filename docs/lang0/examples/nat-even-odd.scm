(import "./boolean.scm" true false if and or not)
(import "./nat-church.scm" zero add1 sub1 zero?)
(import "./nat-church.scm" one two three four)
(import "./fix.scm" Y)

(define (even? n)
  (if (zero? n) true
      (odd? (sub1 n))))

(define (odd? n)
  (if (zero? n) false
      (even? (sub1 n))))

(assert-equal
  (even? zero)
  (even? two)
  (even? four)
  true)

(assert-equal
  (even? one)
  (even? three)
  false)

(assert-equal
  (odd? zero)
  (odd? two)
  (odd? four)
  false)

(assert-equal
  (odd? one)
  (odd? three)
  true)
