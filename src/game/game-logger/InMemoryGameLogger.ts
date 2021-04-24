import { AssaultLog, GameLoggerInterface } from './GameLoggerInterface'

export default class InMemoryGameLogger implements GameLoggerInterface {
  private logs: AssaultLog[] = []

  getLogs(): AssaultLog[] {
    return this.logs
  }

  logAssault(assaultLog: AssaultLog): void {
    this.logs.push(assaultLog)
  }
}
