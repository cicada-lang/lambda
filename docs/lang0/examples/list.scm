(define nil
  (lambda (nil-case ::-case)
    nil-case))

(define (:: head tail)
  (lambda (nil-case ::-case)
    (::-case head tail
      (tail nil-case ::-case))))

(define (rec-List target nil-case ::-case)
  (target nil-case ::-case))

(import "./nat-church.scm" zero add1)

(define (length l)
  (rec-List l
    zero
    (lambda (head target almost)
      (add1 almost))))

(import "./boolean.scm" true)

(assert-equal (length nil) zero)
(assert-equal (length (:: true nil)) (add1 zero))
(assert-equal (length (:: true (:: true nil))) (add1 (add1 zero)))
