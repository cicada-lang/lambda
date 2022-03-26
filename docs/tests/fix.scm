;; NOTE `x` is `f`'s fixpoint if `(f x) = x`
;;   In lambda calculus, we have function `fix`
;;   which can find fixpoint of any function.
;;      (f (fix f)) = (fix f)

;; NOTE Once we have `fix`, we can achieve the following recursive definition
;;   f = (wrapper f)
;; by non-recursively lambda term.
;;   f = (fix wrapper)

;; NOTE The following `fix` is one way of defining `fix`.

(define (fix f) ((lambda (x) (f (x x))) (lambda (x) (f (x x)))))

;; We will have
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
