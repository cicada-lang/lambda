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

(assert-equal
 (add1 (add1 zero))
 (add1 one)
 two)

(assert-equal
 (mul two two)
 (add two two)
 (add-alt two two)
 (add1 three))

(define four (add1 three))

(assert-equal
 (mul two (mul two (mul two two)))
 (mul (mul two two) (mul two two))
 (mul-alt (mul-alt two two) (mul-alt two two)))

(assert-equal
 (power two four)
 (power four two))

(import "./boolean.scm" true false if and or not)

(define (zero? n) (n (lambda (x) false) true))

(assert-equal (zero? zero) true)
(assert-equal (zero? one) false)
(assert-equal (zero? two) false)

(define (sub1 n)
  (n (lambda (g k) (zero? (g one) k (add (g k) one)))
     (lambda (_) zero)
     zero))

(assert-equal
 zero
 (sub1 one)
 (sub1 (sub1 two))
 (sub1 (sub1 (sub1 three)))
 (sub1 (sub1 (sub1 (sub1 three))))
 (sub1 (sub1 (sub1 (sub1 (sub1 three))))))

(define (sub m n) (n sub1 m))

(assert-equal (sub three zero) three)
(assert-equal (sub three one) two)
(assert-equal (sub three two) one)
(assert-equal (sub three three) zero (sub three four))

(define (lteq m n) (zero? (sub m n)))

(assert-equal (lteq three four) true)
(assert-equal (lteq four three) false)

(define (factorial-rec n)
  (if (zero? n)
    one
    (mul n (factorial-rec (sub1 n)))))

(assert-equal (factorial-rec zero) one)
(assert-equal (factorial-rec one) one)
(assert-equal (factorial-rec two) two)
(assert-equal (factorial-rec three) (mul three two))
(assert-equal (factorial-rec four) (mul four (mul three two)))

;; TODO readback loop

;; (assert-equal factorial-rec factorial-rec)

(define (rec x) x)

(assert-equal
 (lambda (n)
   (if (zero? n)
     one
     (mul n (rec (sub1 n)))))

 (lambda (n)
   ((zero? n)
    one
    (mul n (rec (sub1 n)))))

 (lambda (n)
   ((n (lambda (x) false) true)
    one
    (mul n (rec (sub1 n)))))

 (lambda (n)
   ((n (lambda (x) false) true)
    (lambda (f x) (f x))
    (lambda (f) (n ((rec (sub1 n)) f)))))

 (lambda (n)
   ((n (lambda (x) (lambda (t f) f)) (lambda (t f) t))
    (lambda (f x) (f x))
    (lambda (f) (n ((rec (sub1 n)) f)))))

 (lambda (n)
   ((n (lambda (x) (lambda (t f) f)) (lambda (t f) t))
    (lambda (f x) (f x))
    (lambda (f)
      (n ((rec
           (n (lambda (g k)
                (zero? (g one) k (add (g k) one)))
              (lambda (_) zero)
              zero))
          f))))))

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

;; (display-free-names
;;  (lambda (rec n)
;;    (if (zero? n)
;;      one
;;      (mul n (rec rec (sub1 n))))))

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))

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
