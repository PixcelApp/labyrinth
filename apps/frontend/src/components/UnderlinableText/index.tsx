import { FC } from 'react'
import { forwardRef, Text } from '@chakra-ui/react'

export interface UnderlinableTextProps {
  label: string
  /**
   * Array of [start, end] indices to underline in the label.
   */
  underlines?: Array<Array<number>>
}

export const UnderlinableText: FC<UnderlinableTextProps> = forwardRef<
  UnderlinableTextProps,
  typeof Text
>(({ label, underlines, ...props }, ref) => (
  <Text ref={ref} {...props}>
    {label.split('').map((char, i) => {
      const isUnderlined = underlines?.some(
        ([start, end]) => i >= start && i < end,
      )

      return (
        <span
          key={i}
          style={{
            textDecoration: isUnderlined ? 'underline' : 'none',
          }}
        >
          {char}
        </span>
      )
    })}
  </Text>
))
