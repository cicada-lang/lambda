(import "./compose.scm" id compose (rename compose c))

(assert-equal
  (compose
   (compose id id)
   (compose id id))
  (c (c id id) (c id id))
  id)
