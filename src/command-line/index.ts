import {
  CommandRunner,
  CommandRunners,
} from "@xieyuheng/command-line/lib/index.js"
import * as Commands from "./commands/index.js"

export function createCommandRunner(): CommandRunner {
  return new CommandRunners.CommonCommandRunner({
    defaultCommand: new Commands.CommonHelp(),
    commands: [new Commands.RunCommand(), new Commands.CommonHelp()],
  })
}
