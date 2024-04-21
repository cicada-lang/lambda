import { Monoid } from "Monoid.cic"

interface Group extends Monoid {
  claim inverse(x: Element): Element

  claim inverseLeft(x: Element): Equal(Element, mul(inverse(x), x), id)
  claim inverseRight(x: Element): Equal(Element, mul(x, inverse(x)), id)

  define div(x: Element, y: Element): Element {
    return mul(x, inverse(y))
  }
}
