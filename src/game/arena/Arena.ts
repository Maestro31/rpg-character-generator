import { Fighter } from '../fighter/Fighter'
import { AssaultLog } from '../game-logger/GameLoggerInterface'
import { RandomInterface } from '../services/RandomInterface'

export class IllegalFightError extends Error {
  constructor() {
    super('Unable to fight when a fighter is dead')
  }
}

export default class Arena {
  private winner: Fighter | null = null
  private onFightEndedCallback: ((winner: Fighter) => void) | null = null
  private onAssaultLogCreatedCallback:
    | ((assaultLog: AssaultLog) => void)
    | null = null

  constructor(
    private assailantFighter: Fighter,
    private assailedFighter: Fighter,
    private randomService: RandomInterface
  ) {}

  getAssailantFighter(): Fighter {
    return this.assailantFighter
  }

  getAssailedFighter(): Fighter {
    return this.assailedFighter
  }

  nextTurn(): void {
    const assailantFighter = this.assailantFighter
    this.assailantFighter = this.assailedFighter
    this.assailedFighter = assailantFighter
  }

  startAssault(): void {
    this.guardIllegalFight()

    const assailantAttack = this.assailantFighter.getAttack()
    const attackToInflict = this.randomService.getValueUntil(assailantAttack)

    const previousAssailedHealth = this.assailedFighter.getRemainingHealth()

    this.assailantFighter.attemptToInflictDamage(
      attackToInflict,
      this.assailedFighter
    )

    this.logAssault(
      attackToInflict,
      previousAssailedHealth - this.assailedFighter.getRemainingHealth()
    )

    this.checkEndCondition()
  }

  onFightEnded(onFightEndedCallback: (winner: Fighter) => void) {
    this.onFightEndedCallback = onFightEndedCallback
  }

  onAssaultLogCreated(
    onAssaultLogCreatedCallback: (assaultLog: AssaultLog) => void
  ) {
    this.onAssaultLogCreatedCallback = onAssaultLogCreatedCallback
  }

  private isAssailedFighterDead(): boolean {
    return this.assailedFighter.getRemainingHealth() <= 0
  }

  private logAssault(attackToInflict: number, damageTaken: number): void {
    this.onAssaultLogCreatedCallback &&
      this.onAssaultLogCreatedCallback({
        assailant: this.assailantFighter.getCharacter(),
        assailed: this.assailedFighter.getCharacter(),
        assaultResult: {
          attack: attackToInflict,
          damageTaken: damageTaken,
        },
      })
  }

  private guardIllegalFight() {
    if (this.winner) {
      throw new IllegalFightError()
    }
  }

  private checkEndCondition() {
    if (this.isAssailedFighterDead()) {
      this.winner = this.assailantFighter
      this.notifyWinner(this.winner)
    }
  }

  private notifyWinner(winner: Fighter) {
    this.onFightEndedCallback && this.onFightEndedCallback(winner)
  }
}
