import * as Exps from "../exp"
import { Exp } from "../exp"
import { Neutral } from "../neutral"
import * as Values from "../value"
import { ReadbackCtx } from "../value"

export function readbackNeutral(ctx: ReadbackCtx, neutral: Neutral): Exp {
  switch (neutral.kind) {
    case "Var": {
      return Exps.Var(neutral.name)
    }

    case "Ap": {
      return Exps.Ap(
        readbackNeutral(ctx, neutral.target),
        Values.readback(ctx, neutral.arg),
      )
    }

    case "Fixpoint": {
      return Values.readback(ctx, neutral.fixpoint)
    }
  }
}
