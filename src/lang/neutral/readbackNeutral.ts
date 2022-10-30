import * as Exps from "../exp"
import { Exp } from "../exp"
import { Neutral } from "../neutral"
import { ReadbackCtx } from "../value"

export function readbackNeutral(ctx: ReadbackCtx, neutral: Neutral): Exp {
  switch (neutral.kind) {
    case "Var": {
      return Exps.Var(neutral.name)
    }

    case "Ap": {
      return Exps.Ap(
        readbackNeutral(ctx, neutral.target),
        neutral.arg.readback(ctx),
      )
    }

    case "Fixpoint": {
      return neutral.fixpoint.readback(ctx)
    }
  }
}
