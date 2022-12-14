import uws from 'uWebSockets.js'
import { onPlayerMatchmaking } from './matchmaking'

uws
  .App()
  .ws('/*', {
    idleTimeout: 32,
    maxBackpressure: 1024,
    maxPayloadLength: 512,
    message: (ws, message) => {
      const playerId = message.toString()
      onPlayerMatchmaking(playerId, ws)
    },
  })
  .get('/*', (res, req) => {
    res
      .writeStatus('200 OK')
      .writeHeader('is-online', 'true')
      .end('swapit game server')
  })
  .listen(9001, (listenSocket) => {
    if (listenSocket) {
      console.log('Listening to port 9001')
    }
  })
