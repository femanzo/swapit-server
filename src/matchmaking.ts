import type { WebSocket } from 'uWebSockets.js'

import { Match } from './models/Match'
import { Player } from './models/Player'

const playerQueue: Player[] = ([] = [])

export const onPlayerDisconnect = (playerId: string) => {
  const player = playerQueue.find((p) => p.id === playerId)
  if (player) {
    playerQueue.splice(playerQueue.indexOf(player), 1)
  }
  console.log(`Player ${playerId} disconnected!`)
}

export const onPlayerMatchmaking = (playerId: string, ws: WebSocket) => {
  const player = new Player(playerId, ws)
  console.log(`Player ${playerId} is in matchmaking!`)

  if (playerQueue.length === 0) {
    playerQueue.push(player)
    ws.send('Waiting for another player to join...')
    return
  }

  const firstPlayer = playerQueue.shift()
  if (firstPlayer) {
    const match = createMatch(firstPlayer, player)
    ws.send(`Match ${match.matchId} created!`)
    console.log(`Match ${match.matchId} created!`)
    return
  }

  console.log('Something went wrong!')
  ws.send('Something went wrong!')
}

export const createMatch = (firstPlayer: Player, secondPlayer: Player) => {
  const match = new Match(firstPlayer, secondPlayer)
  match.start()
  return match
}
