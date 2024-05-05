(import monoid  from "monoid.cic")


(class group (monoid)
  [(:inverse x: element): element]

  inverseleft(x: element): equal(element, mul(inverse(x), x), id)
  inverseright(x: element): equal(element, mul(x, inverse(x)), id)

  div(x: element, y: element): element {
                                        return mul(x, inverse(y))
                                                })
