import { config } from 'dotenv'
import { wss } from './websockets'

config({ path: '../.env' })

/**
 * Start the server
 */
const { WS_PORT } = process.env
wss.listen(WS_PORT ? Number(WS_PORT) : 9001, (listenSocket) => {
  if (listenSocket) {
    console.log('Listening to port 9001')
  }
})
