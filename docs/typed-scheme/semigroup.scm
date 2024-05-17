(define semigroup
  (interface ()
    (claim element type)
    (claim mul (-> element element element))
    (claim mul-associative
      (forall ([x element]
               [y element]
               [z element])
        (equal element
               (mul x (mul y z))
               (mul (mul x y) z))))))

(define nat-semigroup
  (object
    (define element nat)
    (define (mul x y) (nat-mul x y))
    (define (mul-associative x y z)
      (refl (nat-mul x (nat-mul y z))
            (nat-mul (nat-mul x y) z)))))

(claim create-semigroup
  (forall ((element type)
           (mul (-> element element element))
           (mul-associative
            (forall ([x element]
                     [y element]
                     [z element])
              (equal element
                     (mul x (mul y z))
                     (mul (mul x y) z)))))
    semigroup))

(define (create-semigroup element mul mul-associative)
  (object
    (define element nat)
    (define mul mul)
    (define mul-associative mul-associative)))

(define nat-semigroup
  (create-semigroup
   nat nat-mul
   (lambda (x y z)
     (refl (nat-mul x (nat-mul y z))
           (nat-mul (nat-mul x y) z)))))

(claim semigroup-mul3
  (forall ((s semigroup))
    (-> s.element s.element s.element s.element)))

(define (semigroup-mul3 s x y z)
  (s.mul x (s.mul y x)))

(define-interface semigroup
  [element type]
  [mul (-> element element element)]
  [mul-associative
   (forall ([x element]
            [y element]
            [z element])
     (equal element
            (mul x (mul y z))
            (mul (mul x y) z)))])

(define-object nat-semigroup
  [element nat]
  [(mul x y) (nat-mul x y)]
  [(mul-associative x y z)
   (refl (nat-mul x (nat-mul y z))
         (nat-mul (nat-mul x y) z))])

(define-object nat-semigroup
  [element nat]
  [mul (lambda (x y) (nat-mul x y))]
  [mul-associative
   (lambda (x y z)
     (refl (nat-mul x (nat-mul y z))
           (nat-mul (nat-mul x y) z)))])

(define-object nat-semigroup
  .element nat
  .mul (lambda (x y) (nat-mul x y))
  .mul-associative (lambda (x y z)
                     (refl (nat-mul x (nat-mul y z))
                           (nat-mul (nat-mul x y) z))))

(define nat-semigroup
  (object
    .element nat
    .mul (lambda (x y) (nat-mul x y))
    .mul-associative (lambda (x y z)
                       (refl (nat-mul x (nat-mul y z))
                             (nat-mul (nat-mul x y) z)))))

(define nat-semigroup
  {.element nat
   .mul (lambda (x y) (nat-mul x y))
   .mul-associative (lambda (x y z)
                      (refl (nat-mul x (nat-mul y z))
                            (nat-mul (nat-mul x y) z)))})

{.name "Xie Yuheng"
 .age 32
 .country {.name "China"
           .containte "Asia"}}
