(import "./boolean.md" true false if and or not)
(import "./nat-church.md" zero add1 sub1 zero?)
(import "./nat-church.md" one two three four)

(define (even? n)
  (if (zero? n) true
      (if (zero? (sub1 n)) false
          (even? (sub1 (sub1 n))))))

(define (odd? n)
  (if (zero? n) false
      (if (zero? (sub1 n)) true
          (odd? (sub1 (sub1 n))))))

even?
odd?

(assert-equal even? even?)
(assert-equal odd? odd?)

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
