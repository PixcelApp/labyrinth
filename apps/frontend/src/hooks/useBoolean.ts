import { useState } from 'react'

export const useBoolean = (initial = false) => {
  const [time, setValue] = useState(initial ? new Date().getTime() : 0)

  const toggle = () => setValue((v) => (v ? 0 : new Date().getTime()))

  const on = () => setValue(new Date().getTime())

  const off = () => setValue(0)

  const set = (value: boolean) => (value ? on() : off())

  return [!!time, { time, toggle, on, off, set }] as const
}
