(comments
  Remember that ind-Nat take target as an explicit argument,
  because we want to infer application of ind-Nat.

  (claim ind-Nat
    (Pi ((target Nat)
         (motive (-> Nat Type))
         (base (motive zero))
         (step (Pi ((prev Nat))
                 (-> (motive prev)
                     (motive (add1 prev))))))
      (motive target)))

  (define (ind-Nat target motive base step) (target motive base step))

  We already know what (ind-Nat zero) should be,
  thus we have equation about zero,
  let's try to solve zero from this equation.

  (claim (ind-Nat zero)
    (Pi ((motive (-> Nat Type))
         (base (motive zero))
         (step (Pi ((prev Nat))
                 (-> (motive prev)
                     (motive (add1 prev))))))
      (motive zero)))

  (assert-equal
    (ind-Nat zero motive)
    (lambda (base step) (zero motive base step))
    (lambda (base step) base))

  (define zero (lambda (motive base step) base))

  (claim zero
    (Pi ((motive (-> Nat Type))
         (base (motive zero))
         (step (Pi ((prev Nat))
                 (-> (motive prev)
                     (motive (add1 prev))))))
      (motive zero)))

  The type of zero is Nat,
  thus we have:

  (define Nat
    (Pi ((motive (-> Nat Type))
         (base (motive zero))
         (step (Pi ((prev Nat))
                 (-> (motive prev)
                     (motive (add1 prev))))))
      (motive target)))

  But target is a free variable.

  (define (add1 prev)
    (lambda (motive base step)
      (step prev (prev motive base step))))

  (claim add1
    (-> Nat Nat)
    (Pi ((prev Nat)
         (motive (-> Nat Type))
         (base (motive zero))
         (step (Pi ((prev Nat))
                 (-> (motive prev)
                     (motive (add1 prev))))))
      (motive (add1 prev))))


  It seems we are defining one Nat for each n.
  Here comes self types.

  (define Nat
    (Self (target)
      (Pi ((motive (-> Nat Type))
           (base (motive zero))
           (step (Pi ((prev Nat))
                   (-> (motive prev)
                       (motive (add1 prev))))))
        (motive target))))

  The following type checking must pass

  (check zero
    (Self (target)
      (Pi ((motive (-> Nat Type))
           (base (motive zero))
           (step (Pi ((prev Nat))
                   (-> (motive prev)
                       (motive (add1 prev))))))
        (motive target))))

  (check add1
    (-> (Self (target)
          (Pi ((motive (-> Nat Type))
               (base (motive zero))
               (step (Pi ((prev Nat))
                       (-> (motive prev)
                           (motive (add1 prev))))))
            (motive target)))
        (Self (target)
          (Pi ((motive (-> Nat Type))
               (base (motive zero))
               (step (Pi ((prev Nat))
                       (-> (motive prev)
                           (motive (add1 prev))))))
            (motive target))))))
