import { useState } from 'react'

export const useNumber = (initial = 0) => {
  const [value, setValue] = useState(initial)

  const set = (value: number) => setValue(value)
  const reset = () => setValue(initial)
  const inc = () => setValue((v) => v + 1)
  const dec = () => setValue((v) => v - 1)

  return [value, { set, inc, reset, dec }] as const
}
