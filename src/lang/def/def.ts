import { Module } from "../module"

export abstract class Def {
  abstract mod: Module
  abstract name: string
  // abstract refer(): Value
}
