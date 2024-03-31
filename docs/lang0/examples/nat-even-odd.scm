(import "./boolean.scm" true false if and or not)
(import "./nat-church.scm" zero add1 sub1 zero?)
(import "./nat-church.scm" one two three four)
(import "./fix.scm" Y)

(define even?
  (let ([wrap (lambda (even?)
                (lambda (n)
                  (if (zero? n) true
                      (if (zero? (sub1 n)) false
                          (even? (sub1 (sub1 n)))))))])
    (Y wrap)))

(define odd?
  (let ([wrap (lambda (odd?)
                (lambda (n)
                  (if (zero? n) false
                      (if (zero? (sub1 n)) true
                          (odd? (sub1 (sub1 n)))))))])
    (Y wrap)))

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
