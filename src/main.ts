#!/usr/bin/env -S node

import { Commander } from "@xieyuheng/commander.js"
import { runCommand } from "./commands/runCommand.ts"

async function main() {
  const commander = new Commander()
  commander.use(runCommand)
  await commander.run(process.argv)
}

main()
