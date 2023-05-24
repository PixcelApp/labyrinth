import { FC, useMemo } from 'react'
import { Button, VStack } from '@chakra-ui/react'
import { ToolButton } from 'src/components/ToolButton'
import { ToolBarActionHandler } from 'src/modules/ToolBarActionHandler'
import { useAppSelector } from 'src/hooks/store.hooks'
import { Tool, ToolAction } from 'src/state/slice/tools.slice'

export interface ToolbarProps {}

const ICON_SIZE = 10
const ICON_ROW_START = 119

export const Toolbar: FC<ToolbarProps> = ({}) => {
  const selected = useAppSelector((state) => state.tools.selected)

  const topButtons = useMemo(
    () =>
      [Tool.Pencil, Tool.Select, Tool.Rectangle, Tool.Zoom, Tool.Line].map(
        (toolId, i) => (
          <ToolButton
            key={toolId}
            label={Tool[toolId]}
            icon={[i * ICON_SIZE, ICON_ROW_START]}
            isSelected={selected === toolId}
            onClick={() => ToolBarActionHandler.emit(ToolAction.Select, toolId)}
          />
        ),
      ),
    [selected],
  )

  const bottomButtons = useMemo(
    () =>
      [Tool.Cross, Tool.Droplet, Tool.Triangle].map((toolId, i) => (
        <ToolButton
          key={toolId}
          label={Tool[toolId]}
          icon={[(i + topButtons.length) * ICON_SIZE, ICON_ROW_START]}
          isSelected={selected === toolId}
          onClick={() => ToolBarActionHandler.emit(ToolAction.Select, toolId)}
        />
      )),
    [selected, topButtons],
  )

  return (
    <VStack h="full" justify="space-between" ml={2} py={2}>
      <VStack spacing="-8px">{topButtons}</VStack>
      <VStack spacing="-8px">{bottomButtons}</VStack>
    </VStack>
  )
}
