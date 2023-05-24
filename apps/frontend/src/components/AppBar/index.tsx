import { FC } from 'react'
import { HStack, IconButton, Image } from '@chakra-ui/react'
import { AppBarLogo } from 'src/components/AppBar/AppBarLogo.svg'
import { appWindow } from '@tauri-apps/api/window'
import { StaticSprite } from 'src/components/StaticSprite'
import { getSpriteUVs } from 'src/utils/sprites'

export interface AppBarProps {}

export const AppBar: FC<AppBarProps> = ({}) => (
  <HStack
    data-tauri-drag-region
    w="full"
    justify="space-between"
    borderBottom="black"
  >
    <Image p={1} boxSize={8} src="/icons/pixcel-logo.png" />
    <HStack h="full" spacing={0}>
      <IconButton
        h="full"
        onClick={() => appWindow.minimize()}
        py={1}
        px={3}
        aria-label="Minimize"
        _hover={{ img: { opacity: 1 } }}
        icon={
          <StaticSprite
            opacity={0.5}
            boxSize={4.5}
            uvs={getSpriteUVs(9, 80, 119)}
          />
        }
      />
      <IconButton
        h="full"
        onClick={() => appWindow.toggleMaximize()}
        py={1}
        px={3}
        aria-label="Maximize"
        _hover={{ img: { opacity: 1 } }}
        icon={
          <StaticSprite
            opacity={0.5}
            boxSize={4.5}
            uvs={getSpriteUVs(9, 90, 119)}
          />
        }
      />
      <IconButton
        h="full"
        onClick={() => appWindow.close()}
        py={1}
        px={3}
        aria-label="Close"
        _hover={{ img: { opacity: 1 } }}
        icon={
          <StaticSprite
            opacity={0.5}
            boxSize={4.5}
            uvs={getSpriteUVs(9, 50, 119)}
          />
        }
      />
    </HStack>
  </HStack>
)
