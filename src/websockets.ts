import { randomUUID } from 'node:crypto'
import uws from 'uWebSockets.js'
import { onPlayerMatchmaking, onPlayerDisconnect } from './matchmaking'

export const wss = uws
  .App()
  .ws('/*', {
    idleTimeout: 32,
    maxBackpressure: 1024,
    maxPayloadLength: 512,
    open: (ws) => {
      console.log('WebSocket connected')
      ws.id = randomUUID()
    },
    close: (ws) => {
      console.log('WebSocket closed')
      onPlayerDisconnect(ws.id)
    },
    message: (ws, message) => {
      const playerId = Buffer.from(message).toString('utf-8')

      onPlayerMatchmaking(playerId, ws)
    },
  })
  .get('/*', (res, req) => {
    res
      .writeStatus('200 OK')
      .writeHeader('is-online', 'true')
      .end('swapit game server')
  })
