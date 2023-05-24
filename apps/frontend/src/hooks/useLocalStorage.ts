import { useState } from 'react'

export interface UseLocalStorageOptions<T> {
  useJSON?: boolean
  serialize?: (value: T) => string
  deserialize?: (value: string | null) => any
}

export enum LocalStorageItem {
  AppColorScheme = 'pixcel.app.color-scheme',
  AppCustomColorScheme = 'pixcel.app.color-scheme.custom',
}

export const useLocalStorageSetter = <T>(
  options: UseLocalStorageOptions<T> = {},
) => {
  const get = (key: string): T => {
    const value = localStorage.getItem(key)

    if (options.useJSON) {
      return value ? JSON.parse(value) : null
    }

    if (options.deserialize) {
      return options.deserialize(value)
    }

    return value as T
  }

  const set = (key: string, value: T) => {
    if (options.useJSON) {
      return localStorage.setItem(key, JSON.stringify(value))
    }

    if (options.serialize) {
      return localStorage.setItem(key, options.serialize(value))
    }

    localStorage.setItem(key, value as unknown as string)
  }

  const remove = (key: string) => localStorage.removeItem(key)

  return { get, set, remove } as const
}

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {},
) => {
  const { get, set } = useLocalStorageSetter<T>(options)
  const [value, setValue] = useState<T>(get(key))

  return {
    get: () => {
      const value = get(key)
      if (!value) {
        set(key, initialValue)
        return initialValue
      }
      return value
    },
    set: (value: T) => {
      setValue(value)
      set(key, value)
    },
    reset: () => {
      setValue(initialValue)
      set(key, initialValue)
    },
    value,
  } as const
}
