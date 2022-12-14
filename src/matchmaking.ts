import type { WebSocket } from 'uWebSockets.js'

import { Match } from './models/Match'
import { Player } from './models/Player'

const playerQueue: Player[] = ([] = [])

export const onPlayerMatchmaking = (playerId: string, ws: WebSocket) => {
  const player = new Player(playerId, ws)

  if (playerQueue.length === 0) {
    playerQueue.push(player)
    return
  }

  const firstPlayer = playerQueue.shift()
  if (firstPlayer) {
    const match = createMatch(firstPlayer, player)
    console.log(`Match ${match.matchId} created!`)
    return
  }

  console.log('Something went wrong!')
}

export const createMatch = (firstPlayer: Player, secondPlayer: Player) => {
  const match = new Match(firstPlayer, secondPlayer)
  match.start()
  return match
}
