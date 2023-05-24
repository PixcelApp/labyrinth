import { FC } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

export const SettingOption: FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    w="full"
    justifyContent={props.rightIcon ? 'space-between' : 'flex-start'}
    variant="text-only"
    py={2}
    px={2.5}
    {...props}
  >
    {children}
  </Button>
)
