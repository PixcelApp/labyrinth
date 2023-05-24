import { Tool, ToolAction } from 'src/state/slice/tools.slice'

export class ToolBarActionHandler {
  static emit(action: ToolAction, toolId: Tool) {
    window.dispatchEvent(
      new CustomEvent('toolbar-action', {
        detail: {
          action,
          toolId,
        },
      }),
    )
  }

  private static callbackHandler(
    action: ToolAction,
    callback: (action: ToolAction, toolId: Tool) => void,
  ) {
    return (rawEvent: Event) => {
      const event = rawEvent as CustomEvent<{
        action: ToolAction
        toolId: Tool
      }>

      if (event.detail.action === action) {
        callback(event.detail.action, event.detail.toolId)
      }
    }
  }

  static on(
    action: ToolAction,
    callback: (action: ToolAction, toolId: Tool) => void,
  ) {
    window.addEventListener(
      'toolbar-action',
      this.callbackHandler(action, callback),
    )
  }

  static off(
    action: ToolAction,
    callback: (action: ToolAction, toolId: Tool) => void,
  ) {
    window.removeEventListener(
      'toolbar-action',
      this.callbackHandler(action, callback),
    )
  }
}
