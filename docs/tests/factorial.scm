(import "./nat.scm" zero? add mul sub1)
(import "./nat.scm" zero one two three four)
(import "./boolean.scm" if true false)

;; (claim factorial (-> Nat Nat))

(define (factorial n)
  (if (zero? n)
    one
    (mul n (factorial (sub1 n)))))

(assert-equal (factorial zero) one)
(assert-equal (factorial one) one)
(assert-equal (factorial two) two)
(assert-equal (factorial three) (mul three two))
(assert-equal (factorial four) (mul four (mul three two)))

;; NOTE Use `(assert-equal)` to step a process of evaluation,
;;   with the help of a non-recursive dummy.

(define (factorial-dummy x) x)

(assert-equal
 (lambda (n)
   (if (zero? n)
     one
     (mul n (factorial-dummy (sub1 n)))))

 (lambda (n)
   ((zero? n)
    one
    (mul n (factorial-dummy (sub1 n)))))

 (lambda (n)
   ((n (lambda (x) false) true)
    one
    (mul n (factorial-dummy (sub1 n)))))

 (lambda (n)
   ((n (lambda (x) false) true)
    (lambda (f x) (f x))
    (lambda (f) (n ((factorial-dummy (sub1 n)) f)))))

 (lambda (n)
   ((n (lambda (x) (lambda (t f) f)) (lambda (t f) t))
    (lambda (f x) (f x))
    (lambda (f) (n ((factorial-dummy (sub1 n)) f)))))

 (lambda (n)
   ((n (lambda (x) (lambda (t f) f)) (lambda (t f) t))
    (lambda (f x) (f x))
    (lambda (f)
      (n ((factorial-dummy
           (n (lambda (g k)
                (zero? (g one) k (add (g k) one)))
              (lambda (_) zero)
              zero))
          f))))))
