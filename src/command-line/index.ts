import {
  CommandRunner,
  CommandRunners,
  Commands,
} from "@xieyuheng/command-line"
import { RunCommand } from "./commands/index.ts"

export function createCommandRunner(): CommandRunner {
  return new CommandRunners.CommonCommandRunner({
    defaultCommand: new Commands.CommonHelp(),
    commands: [new RunCommand(), new Commands.CommonHelp()],
  })
}
