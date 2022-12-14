import { Player } from './Player'
import { randomUUID } from 'crypto'

export class Match {
  private _matchId: string
  private _matchDate: number
  private _firstPlayer: Player
  private _secondPlayer: Player

  private _firstPlayerScore = 0
  private _secondPlayerScore = 0

  constructor(firstPlayer: Player, secondPlayer: Player) {
    this._matchId = randomUUID()
    this._matchDate = Date.now()
    this._firstPlayer = firstPlayer
    this._secondPlayer = secondPlayer
  }

  start() {
    this._firstPlayerScore = 0
    this._secondPlayerScore = 0

    console.log(`Match ${this._matchId} started!`)
  }

  get matchId() {
    return this._matchId
  }

  get matchDate() {
    return this._matchDate
  }

  updateFirstPlayerScore(score: number) {
    this._firstPlayerScore = score
  }

  updateSecondPlayerScore(score: number) {
    this._secondPlayerScore = score
  }
}
