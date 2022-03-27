(import "./cons.scm" cons car cdr null null?)
(import "./boolean.scm" true false)

(assert-equal (null? (cons null null)) false)

(assert-equal
  (null? (car (cons null null)))
  (null? (cdr (cons null null)))
  (null? null)
  true)
