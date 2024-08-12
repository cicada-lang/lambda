;; 注意，common-lisp 的 class 名字，
;; 直接占用了常用的 object 名，
;; 而不是用 Dog 和 dog 的命名惯例来区分 class 和 object。

(defstruct dog name breed age)
(defparameter *rover*
  (make-dog :name "rover"
            :breed "collie"
            :age 5))
*rover*
(dog-p *rover*)
(dog-name *rover*)

;; in a new scheme, we can have:

(define-class dog name breed age)
(define-object *rover*
    (new dog
         :name "rover"
         :breed "collie"
         :age 5))
(define-object *rover*
    (new dog
         :name "rover"
         :breed "collie"
         :age 5))
*rover*
(:p *rover*)
(:name *rover*)

;; or

(define-class dog name breed age)
(define-object *rover*
    (dog.new
     .name "rover"
     .breed "collie"
     .age 5))
*rover*
(.p *rover*)
(.name *rover*)
