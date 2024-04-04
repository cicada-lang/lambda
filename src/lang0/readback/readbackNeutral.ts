import * as Exps from "../exp/index.js"
import { type Exp } from "../exp/index.js"
import { type Neutral } from "../neutral/index.js"
import { readback, ReadbackCtx } from "../readback/index.js"

export function readbackNeutral(ctx: ReadbackCtx, neutral: Neutral): Exp {
  switch (neutral["@kind"]) {
    case "Var": {
      return Exps.Var(neutral.name)
    }

    case "Ap": {
      return Exps.Ap(
        readbackNeutral(ctx, neutral.target),
        readback(ctx, neutral.arg),
      )
    }

    case "ApRecursive": {
      return Exps.Ap(
        readback(ctx, neutral.fn),
        readbackNeutral(ctx, neutral.arg),
      )
    }
  }
}
