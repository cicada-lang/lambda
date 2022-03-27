(import "./boolean.scm" true false)

;; NOTE Temporarily save `car` and `cdr` to a lambda,
;;   apply this lambda to a function -- `f`,
;;   will apply `f` to the saved `car` and `cdr`
(define (cons car cdr) (lambda (f) (f car cdr)))
(define (car pair) (pair (lambda (car cdr) car)))
(define (cdr pair) (pair (lambda (car cdr) cdr)))

(define (null f) true)
(define (null? pair) (pair (lambda (car cdr) false)))

(assert-equal
  (null? null)
  (null (lambda (car cdr) false))
  true)

(assert-equal
  (null? (cons null null))
  ((cons null null) (lambda (car cdr) false))
  ((lambda (car cdr) false) null null)
  false)
