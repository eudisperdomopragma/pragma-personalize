import { IOClients } from '@vtex/api'

import Status from './status'

import Products from './products'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() { 
    return this.getOrSet('status', Status)
  }

  public get products() {
    return this.getOrSet('products', Products)
  }
}
