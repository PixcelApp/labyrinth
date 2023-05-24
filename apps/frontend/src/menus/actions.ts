import { Actions as MenuBar } from 'src/menus/menu-bar.menu'

export const MenuActions = {
  MenuBar,
} as const

type TryGetNestedStringValueFromObject<T> = T extends Record<string, infer U>
  ? U extends Record<string, infer V>
    ? TryGetNestedStringValueFromObject<U>
    : U extends string
    ? U
    : never
  : never

export type MenuActionsActions = TryGetNestedStringValueFromObject<
  typeof MenuActions
>
