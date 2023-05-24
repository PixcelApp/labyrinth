import { space } from 'src/theme/space'

export const sizes = {
  none: '0%',
  half: '50%',
  full: '100%',
  toolbar: {
    button: {
      size: '32px',
    },
  },
  header: {
    height: '54px',
  },
  content: {
    max: '1024px',
  },
  search: {
    width: '480px',
  },
  aside: {
    width: '304px',
  },
  button: {
    large: '36px',
    medium: '32px',
    small: '24px',
    xsmall: '20px',
  },
  ...space,
} as const
