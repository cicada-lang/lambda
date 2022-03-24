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

(define (factorial n)
  (if (zero? n)
    one
    (mul n (factorial (sub1 n)))))

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))

;; TODO equal loop

;; (assert-equal factorial factorial)

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

(define (factorial/rec rec n)
  (if (zero? n)
    one
    (mul n (rec rec (sub1 n)))))

(assert-equal ((factorial/rec factorial/rec) zero) one)
(assert-equal ((factorial/rec factorial/rec) one) one)
(assert-equal ((factorial/rec factorial/rec) two) two)
(assert-equal ((factorial/rec factorial/rec) three) (mul three two))
(assert-equal ((factorial/rec factorial/rec) four) (mul four (mul three two)))

;; TODO equal loop

;; (assert-equal (factorial/rec factorial/rec) (factorial/rec factorial/rec))

(define (Y g)
  ((lambda (x) (g (x x)))
   (lambda (x) (g (x x)))))

(define (factorial/fix rec n)
  (if (zero? n)
    one
    (mul n (rec (sub1 n)))))

(assert-equal ((Y factorial/fix) zero) one)
(assert-equal ((Y factorial/fix) one) one)
(assert-equal ((Y factorial/fix) two) two)
(assert-equal ((Y factorial/fix) three) (mul three two))
(assert-equal ((Y factorial/fix) four) (mul four (mul three two)))

;; TODO equal loop

;; (assert-equal (Y factorial/fix) (Y factorial/fix))
;; (assert-equal (Y factorial/fix) (factorial/fix (Y factorial/fix)))
