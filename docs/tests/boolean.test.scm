(import "./boolean.scm" true false if and or not)

true
false

if

(and true false)
(not (not (or true false)))

(lambda (x)
  (not (not (or true false))))
