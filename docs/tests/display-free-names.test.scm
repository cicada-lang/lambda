(display-free-names
 (lambda (factorial)
   (if (zero? n)
     one
     (mul n (factorial (sub1 n))))))
