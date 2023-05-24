export const getConfigValue = <TCastAsValue = string | undefined>(
  key: keyof NodeJS.ProcessEnv,
): TCastAsValue => process.env[key] as TCastAsValue
