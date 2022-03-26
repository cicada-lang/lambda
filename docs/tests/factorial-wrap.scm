(import "./nat.scm" zero? add mul sub1)
(import "./nat.scm" zero one two three four)
(import "./boolean.scm" if true false)

;; NOTE `x` is `f`'s fixpoint if `(f x) = x`
;;   In lambda calculus, we have function `fix`
;;   which can find fixpoint of any function.
;;      (f (fix f)) = (fix f)
;;   The following `fix` is one way of defining `fix`.

(define (fix f) ((lambda (x) (f (x x))) (lambda (x) (f (x x)))))

;; We have
;;   (fix f) =
;;   (f ((lambda (x) (f (x x))) (lambda (x) (f (x x))))) =
;;   (f (fix f))

;; NOTE Another way of defining `fix`.

(define (turing-half x y) (y (x x y)))
(define turing-fix (turing-half turing-half))

;; We will have
;;   (turing-fix f) =
;;   (turing-half turing-half f) =
;;   (f (turing-half turing-half f)) =
;;   (f (turing-fix f))

;; (claim factorial-wrap (-> (-> Nat Nat) (-> Nat Nat)))
;; (claim (fix factorial-wrap) (-> Nat Nat))
;; (claim fix (forall (A) (-> (-> A A) A)))

;; NOTE In general,
;;   recursive definition
;;     f = (wrapper f)
;;   can be written non-recursively
;;     f = (fix wrapper)

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
