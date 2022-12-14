import uws from 'uWebSockets.js'
import { createMatch } from './matchmaking'

uws
  .App()
  .ws('/*', {
    idleTimeout: 30,
    maxBackpressure: 1024,
    maxPayloadLength: 512,
    message: (ws, message, isBinary) => {
      // let ok = ws.send(message, isBinary, true)
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
