import { canUseDOM } from 'vtex.render-runtime'
import { useLazyFullSession } from 'vtex.session-client'

import push from './modules/push'
import type { PixelMessage } from './typings/events'

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {

    case 'vtex:productClick': {
      const { product } = e.data
      console.log("pixel personalice")
      console.log(product)
      console.log(e.data)
      console.log(e)

      push({
        Event: {
          ITEM_ID: product.productId,
          CATEGORY_NAME: product.categories[0]
        },
        EventType: 'productClick',
        SessionId: '',
        UserId: ''
      })

      break
    }

    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
