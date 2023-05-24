import { ThemeOverride } from '@chakra-ui/react'

export enum FontWeight {
  Regular = '400',
}

export enum FontSize {
  Regular = '16px',
}

export enum FontFamily {
  Body = 'body',
  Heading = 'heading',
  Mono = 'mono',
}

export const fonts = {
  [FontFamily.Body]: "'pixelFJ8pt1', sans-serif",
  [FontFamily.Heading]: "'editundo', sans-serif",
  [FontFamily.Mono]: 'monospace',
} satisfies ThemeOverride['fonts']
