/**
 * @file event store
 * @desc add / remove / cache event
 */

export default class EventStore {
  constructor() {
    this.store = new Map()
  }

  add(node, event, handler, capture = false) {
    const store = this.store
    if (!store.has(node)) {
      store.set(node, {})
    }
    if (!(event in store.get(node))) {
      store.get(node)[event] = []
    }
    store.get(node)[event].push([handler, capture])
    node.addEventListener(event, handler, capture)
  }

  remove(node, event) {
    const store = this.store
    const handlers = store.get(node)
    let eventHandler
    if (handlers) {
      eventHandler = handlers[event] || []
      eventHandler.forEach((handler) => {
        // remove listener
        node.removeEventListener(event, handler[0], handler[1])
        // remove store
        handlers[event] = []
      })
    }
  }
  /* eslint-disable */
  removeAll() {
    const nodes = this.store.keys()
    for (const node of nodes) {
      const handlers = this.store.get(node)
      const eventNameList = Object.keys(handlers)
      eventNameList.forEach(event => this.remove(node, event))
    }
    this.store.clear()
  }
  /* eslint-enable */
}

export const EVENTS_MAP = {
  click: 'click',
  mouseup: 'mouseup',
  mousedown: 'mousedown',
  mousemove: 'mousemove',
}
