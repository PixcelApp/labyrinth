type Input = Record<string, Array<unknown>>
type Listener<T extends Input> = (...args: T[keyof T]) => void

export class EventEmitter<T extends Input> {
  private listeners: Record<keyof T, Array<Listener<T>>> = {} as any

  on<K extends keyof T>(event: K, listener: Listener<T>) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(listener)
  }

  off<K extends keyof T>(event: K, listener: Listener<T>) {
    if (!this.listeners[event]) return
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener)
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<Listener<T>>) {
    if (!this.listeners[event]) return
    this.listeners[event].forEach((listener) => listener(...args))
  }
}
