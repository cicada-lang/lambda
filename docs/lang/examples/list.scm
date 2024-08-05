(define nil
  (lambda (nil-case ::-case)
    nil-case))

(define (:: head tail)
  (lambda (nil-case ::-case)
    (::-case head tail
      (tail nil-case ::-case))))

(define (rec-List target nil-case ::-case)
  (target nil-case ::-case))

(import zero add1 "./nat-church.scm")

(define (length l)
  (rec-List l
    zero
    (lambda (head target almost)
      (add1 almost))))

(import true "./boolean.scm")

(assert-equal (length nil) zero)
(assert-equal (length (:: true nil)) (add1 zero))
(assert-equal (length (:: true (:: true nil))) (add1 (add1 zero)))

(define (append left right)
  (rec-List left
    right
    (lambda (head target almost)
      (:: head almost))))

(assert-equal (append nil nil) nil)
(assert-equal (append nil (:: true nil)) (:: true nil))
(assert-equal (append (:: true nil) nil) (:: true nil))
(assert-equal (append (:: true nil) (:: true nil)) (:: true (:: true nil)))
(assert-equal (append (:: true (:: true nil))
                      (:: true (:: true nil)))
              (:: true (:: true (:: true (:: true nil)))))
