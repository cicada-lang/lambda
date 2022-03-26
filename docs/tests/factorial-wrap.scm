(import "./nat-church.scm" zero? add mul sub1)
(import "./nat-church.scm" zero one two three four)
(import "./boolean.scm" if true false)
(import "./fix.scm" fix)

;; (claim factorial-wrap (-> (-> Nat Nat) (-> Nat Nat)))
;; (claim (fix factorial-wrap) (-> Nat Nat))
;; (claim fix (forall (A) (-> (-> A A) A)))

(define (factorial-wrap factorial)
  (lambda (n)
    (if (zero? n)
      one
      (mul n (factorial (sub1 n))))))

(define factorial (fix factorial-wrap))

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))
