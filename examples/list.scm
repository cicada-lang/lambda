(define null
  (lambda (null-case cons-case)
    null-case))

(define (cons head tail)
  (lambda (null-case cons-case)
    (cons-case head tail
      (tail null-case cons-case))))

(define (rec-List target null-case cons-case)
  (target null-case cons-case))

(import zero add1 "./nat-church.scm")

(define (length l)
  (rec-List l
    zero
    (lambda (head target almost)
      (add1 almost))))

(import true "./boolean.scm")

(assert-equal (length null) zero)
(assert-equal (length (cons true null)) (add1 zero))
(assert-equal (length (cons true (cons true null))) (add1 (add1 zero)))

(define (append left right)
  (rec-List left
    right
    (lambda (head target almost)
      (cons head almost))))

(assert-equal (append null null) null)
(assert-equal (append null (cons true null)) (cons true null))
(assert-equal (append (cons true null) null) (cons true null))
(assert-equal (append (cons true null) (cons true null)) (cons true (cons true null)))
(assert-equal (append (cons true (cons true null))
                      (cons true (cons true null)))
              (cons true (cons true (cons true (cons true null)))))
