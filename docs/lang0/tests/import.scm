(import id compose (rename compose c) "./compose.scm")

(assert-equal
  (compose
   (compose id id)
   (compose id id))
  (c (c id id) (c id id))
  id)
