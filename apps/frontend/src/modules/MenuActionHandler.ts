import type { MenuActionsActions } from 'src/menus/actions'

export class MenuActionHandler {
  static emit(action: MenuActionsActions) {
    window.dispatchEvent(
      new CustomEvent('menu-action', {
        detail: {
          action,
        },
      }),
    )
  }

  private static callbackHandler(
    action: MenuActionsActions,
    callback: () => void,
  ) {
    return (rawEvent: Event) => {
      const event = rawEvent as CustomEvent<{ action: MenuActionsActions }>

      if (event.detail.action === action) {
        callback()
      }
    }
  }

  static on(action: MenuActionsActions, callback: () => void) {
    window.addEventListener(
      'menu-action',
      this.callbackHandler(action, callback),
    )
  }

  static off(action: MenuActionsActions, callback: () => void) {
    window.removeEventListener(
      'menu-action',
      this.callbackHandler(action, callback),
    )
  }
}
