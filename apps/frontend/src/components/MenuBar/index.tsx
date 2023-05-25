import { FC, useMemo } from 'react'
import menuBarMenuData from 'src/menus/menu-bar.menu'
import { RecursiveMenu } from 'src/components/RecursiveMenu'
import { Button, HStack, MenuButton, Text } from '@chakra-ui/react'
import { UnderlinableText } from 'src/components/UnderlinableText'
import { MenuActionHandler } from 'src/modules/MenuActionHandler'
import { useAuth0 } from '@auth0/auth0-react'
import { authorizationParams } from 'src/utils/auth'

export interface MenuBarProps {}

export const MenuBar: FC<MenuBarProps> = ({}) => {
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } =
    useAuth0()

  const buttons = useMemo(
    () =>
      menuBarMenuData.map((item, i) => {
        const handleOnClick = (onOpen: () => void) => () => {
          onOpen()
          MenuActionHandler.emit(item.actions.click)
        }

        const handleOnHover = () => {
          MenuActionHandler.emit(item.actions.hover)
        }

        return (
          <RecursiveMenu
            key={i}
            placement="bottom-start"
            trigger={({ onOpen }) => (
              <MenuButton
                as={Button}
                py={2}
                px={2.5}
                variant="text-only"
                onClick={handleOnClick(onOpen)}
                onPointerEnter={handleOnHover}
              >
                <UnderlinableText
                  label={item.label}
                  underlines={item.underlines}
                />
              </MenuButton>
            )}
            submenu={item.submenu}
          />
        )
      }),
    [],
  )

  console.log({ user, isAuthenticated, isLoading })

  return (
    <HStack w="full" justify="space-between">
      <HStack w="full" spacing={0}>
        {buttons}
      </HStack>

      {isAuthenticated ? (
        <HStack>
          <Text>{JSON.stringify(user)}</Text>
          <Button px={2} onClick={() => logout()}>
            Logout
          </Button>
        </HStack>
      ) : (
        <Button
          px={2}
          onClick={() => loginWithRedirect({ authorizationParams })}
        >
          Login
        </Button>
      )}
    </HStack>
  )
}
