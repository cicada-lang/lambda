(comments
  (define Nat
    (forall (X)
      (-> X (-> X X) X))))

(comments
  (claim iter-Nat
    (forall (X)
      (-> Nat X (-> X X) X))))

(comments
  (claim ind-Nat
    (Pi ((target Nat)
         (motive (-> Nat Type))
         (base (motive zero))
         (step (Pi ((prev Nat))
                 (-> (motive prev)
                     (motive (add1 prev))))))
      (motive target)))

  (define (ind-Nat target motive base step) (target base step))

  ((comments We already know what (ind-Nat zero) should be,
             thus we have equation about zero,
             let's try to solve zero from it this equation.)

   (claim (ind-Nat zero)
     (Pi ((motive (-> Nat Type))
          (base (motive zero))
          (step (Pi ((prev Nat))
                  (-> (motive prev)
                      (motive (add1 prev))))))
       (motive zero)))

   (assert-equal
     (ind-Nat zero)
     (lambda (motive base step) (zero base step))
     (lambda (motive base step) base))

   (define zero (lambda (base step) base))

   (comments But we can not type zero in this way,
             we'd better add motive to it.
             Let's try again.)

   (claim (ind-Nat zero motive)
     (Pi ((base (motive zero))
          (step (Pi ((prev Nat))
                  (-> (motive prev)
                      (motive (add1 prev))))))
       (motive zero)))

   (assert-equal
     (ind-Nat zero motive)
     (lambda (base step) ((zero motive) base step))
     (lambda (base step) base))

   (define zero (lambda (motive base step) base))

   (claim zero
     (Pi ((motive (-> Nat Type))
          (base (motive zero))
          (step (Pi ((prev Nat))
                  (-> (motive prev)
                      (motive (add1 prev))))))
       (motive zero))))

  (define (add1 prev) (lambda (base step) (step prev (prev base step))))

  (define Nat
    (Pi ((target Nat)
         (motive (-> Nat Type))
         (base (motive zero))
         (step (Pi ((prev Nat))
                 (-> (motive prev)
                     (motive (add1 prev))))))
      (motive target))))
