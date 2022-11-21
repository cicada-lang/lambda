import type { Exp } from "../exp"
import * as Exps from "../exp"
import type { Neutral } from "../neutral"
import { readback, ReadbackCtx } from "../readback"

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

    case "Fixpoint": {
      return readback(ctx, neutral.fixpoint)
    }
  }
}
