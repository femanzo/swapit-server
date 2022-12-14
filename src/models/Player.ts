import type { WebSocket } from 'uWebSockets.js'

export class Player {
  constructor(public id: string, public ws: WebSocket) {}
}
