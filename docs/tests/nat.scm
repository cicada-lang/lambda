(define (zero f x) x)

(define (one f x) (f x))
(define (two f x) (f (f x)))
(define (three f x) (f (f (f x))))

(define (add1 n f x) (f (n f x)))
(define (add m n f x) (m f (n f x)))
(define (add-alt m n) (m add1 n))

(define (mul m n f) (m (n f)))
(define (mul-alt m n) (m (add n) zero))

(define (power m n) (m n))

(add1 (add1 zero))
(add1 one)
two

(mul two two)
(add two two)
(add-alt two two)
(add1 three)

(define four (add1 three))

(mul two (mul two (mul two two)))
(mul (mul two two) (mul two two))
(mul-alt (mul-alt two two) (mul-alt two two))

(power two four)
(power four two)

(import "./boolean.scm" true false if and or not)

(define (zero? n) (n (lambda (x) false) true))

(zero? zero)
(zero? one)
(zero? two)

(define (sub1 n)
  (n (lambda (g k) (zero? (g one) k (add (g k) one)))
     (lambda (_) zero)
     zero))

(sub1 three)
(sub1 (sub1 three))
(sub1 (sub1 (sub1 three)))
(sub1 (sub1 (sub1 (sub1 three))))

(define (sub m n) (n sub1 m))

(sub three zero)
(sub three one)
(sub three two)
(sub three three)
(sub three four)

(define (lteq m n) (zero? (sub m n)))

(lteq three four)
(lteq three two)

;; (define (factorial-rec n)
;;   (if (zero? n)
;;     one
;;     (mul n (factorial-rec (sub1 n)))))

(define factorial-rec
  (lambda (n)
    (if (zero? n)
      one
      (mul n (factorial-rec (sub1 n))))))

(factorial-rec zero)
(factorial-rec one)
(factorial-rec two)
(factorial-rec three)

;; TODO readback loop

;; factorial-rec

;; (lambda (n)
;;   (if (zero? n)
;;     one
;;     (mul n (factorial-rec (sub1 n)))))

;; (lambda (n)
;;   ((zero? n)
;;    one
;;    (mul n (factorial-rec (sub1 n)))))

;; (define (id x) x)

;; (lambda (n)
;;   ((id if) (zero? n)
;;    one
;;    (mul n (factorial-rec (sub1 n)))))

;; ((lambda (if)
;;    (lambda (n)
;;      (if (zero? n)
;;        one
;;        (mul n (factorial-rec (sub1 n))))))
;;  (lambda (p t f) (p t f)))

(define (factorial/rec rec n)
  (if (zero? n)
    one
    (mul n (rec rec (sub1 n)))))

(define factorial/rec
  (lambda (rec n)
    (if (zero? n)
      one
      (mul n (rec rec (sub1 n))))))

(define factorial
  (factorial/rec factorial/rec))

(display-free-names
 (lambda (rec n)
   (if (zero? n)
     one
     (mul n (rec rec (sub1 n))))))

(factorial zero)
(factorial one)
(factorial two)
(factorial three)

;; TODO readback loop

;; factorial

;; (factorial/rec factorial/rec)

;; ((lambda (rec n)
;;    (if (zero? n)
;;      one
;;      (mul n (rec rec (sub1 n)))))
;;  factorial/rec)

;; (lambda (n)
;;   (if (zero? n)
;;     one
;;     (mul n (factorial/rec factorial/rec (sub1 n)))))

;; (circle #1
;;  (lambda (n)
;;    (if (zero? n)
;;      one
;;      (mul n (#1 (sub1 n))))))
