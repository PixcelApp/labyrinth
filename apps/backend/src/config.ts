export const getConfigValue = <TCastAsValue = string | undefined>(
  key: keyof NodeJS.ProcessEnv,
  options?: {
    required?: boolean
  },
): TCastAsValue => {
  const value = process.env[key] as TCastAsValue

  if (options?.required && !value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }

  return value
}
