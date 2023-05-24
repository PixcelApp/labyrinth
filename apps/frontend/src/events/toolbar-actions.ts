import { ToolBarActionHandler } from 'src/modules/ToolBarActionHandler'
import { store } from 'src/state'
import {
  actions as toolsActions,
  ToolAction,
} from 'src/state/slice/tools.slice'

ToolBarActionHandler.on(ToolAction.Select, (action, toolId) => {
  store.dispatch(toolsActions.select(toolId))
})
