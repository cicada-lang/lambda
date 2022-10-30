(import "./nat-church.md" zero? add mul sub1)
(import "./nat-church.md" zero one two three four)
(import "./boolean.md" if true false)
(import "./fix.md" Y turing)

(comments
  (claim factorial-wrap (-> (-> Nat Nat) (-> Nat Nat)))
  (claim (Y factorial-wrap) (-> Nat Nat))
  (claim Y (forall (A) (-> (-> A A) A))))

(define factorial-wrap
  (lambda (factorial)
    (lambda (n)
      (if (zero? n)
        one
        (mul n (factorial (sub1 n)))))))

factorial-wrap

(assert-equal ((Y factorial-wrap) zero) one)
(assert-equal ((Y factorial-wrap) one) one)
(assert-equal ((Y factorial-wrap) two) two)
(assert-equal ((Y factorial-wrap) three) (mul three two))
(assert-equal ((Y factorial-wrap) four) (mul four (mul three two)))

(assert-equal ((turing factorial-wrap) zero) one)
(assert-equal ((turing factorial-wrap) one) one)
(assert-equal ((turing factorial-wrap) two) two)
(assert-equal ((turing factorial-wrap) three) (mul three two))
(assert-equal ((turing factorial-wrap) four) (mul four (mul three two)))

;; NOTE `fix` is built-in

(assert-equal ((fix factorial-wrap) zero) one)
(assert-equal ((fix factorial-wrap) one) one)
(assert-equal ((fix factorial-wrap) two) two)
(assert-equal ((fix factorial-wrap) three) (mul three two))
(assert-equal ((fix factorial-wrap) four) (mul four (mul three two)))
