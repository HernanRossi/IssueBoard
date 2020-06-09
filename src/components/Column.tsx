import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { ColumnContainer, ColumnTitle, DividerLine } from '../styles/styles'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../context'
import { Card } from './Card'
import { useItemDrag } from '../utils/useItemDrag'
import { DragItem } from '../types/dragItem'
import { isHidden } from '../utils/isHidden'
import { Divider } from '@material-ui/core'

interface ColumnProps {
  text: string
  index: number
  id: string
  isPreview?: boolean
}

export const Column = ({ text, index, id, isPreview }: ColumnProps) => {

  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const { drag } = useItemDrag({ type: "COLUMN", id, index, text })
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {
      if (item.type === "COLUMN") {
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) return

        dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } })
        item.index = hoverIndex
      } else {
        const dragIndex = item.index
        const hoverIndex = 0
        const sourceColumn = item.columnId
        const targetColumn = id

        dispatch({
          type: "MOVE_TASK",
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn }
        })
        item.index = hoverIndex
        item.columnId = targetColumn
      }

    }
  })

  drag(drop(ref))

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(state.draggedItem, "COLUMN", id, isPreview)}
      isPreview={isPreview}
    >
      <ColumnTitle>{text}</ColumnTitle>
      <DividerLine/>
      {state.lists[index].tasks.map((task, i) => (
        <Card text={task.text} key={task.id} id={task.id} columnId={id} index={i} />
      ))}
      <AddNewItem toggleButtonText="New Task"
        onAdd={text => dispatch({ type: "ADD_TASK", payload: { text, taskId: id } })}
        dark />
    </ColumnContainer>
  )
}