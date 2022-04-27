(import "./boolean.md" true false if and or not)
(import "./nat-church.md" zero add1 sub1 zero?)
(import "./nat-church.md" one two three four)
(import "./nat-even-odd.scm" even? odd?)

;; NOTE Test mutual recursive functions.

(define (evenp n)
  (if (zero? n) true
      (oddp (sub1 n))))

(define (oddp n)
  (if (zero? n) false
      (evenp (sub1 n))))

;; TODO

;; (assert-equal evenp evenp)
;; (assert-equal oddp oddp)

;; (assert-equal even? evenp)
;; (assert-equal odd? oddp)

(assert-equal
  (evenp zero)
  (evenp two)
  (evenp four)
  true)

(assert-equal
  (evenp one)
  (evenp three)
  false)

(assert-equal
  (oddp zero)
  (oddp two)
  (oddp four)
  false)

(assert-equal
  (oddp one)
  (oddp three)
  true)
