import React, { createContext, useReducer, useContext } from "react"
import { nanoid } from "nanoid"
import { findItemIndexById, moveItem } from "../utils"
import { AppState } from '../models/interfaces/contextInterfaces'
import { Action } from '../models/types/AppContextTypes'
import { defaultLists } from "../models/mock-data/defaultTasks"
import { Task } from "../models/classes/TaskClass"

const appData: AppState = {
  lists: defaultLists,
  draggedItem: undefined,
}

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_LIST": {
      if (action.payload.length < 1) return { ...state, lists: [...state.lists] }
      return {
        ...state,
        lists: [
          ...state.lists,
          { listId: nanoid(), title: action.payload, tasks: [] }
        ]
      }
    }
    case "ADD_TASK": {
      if (action.payload.text.length < 1) return { ...state }
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      )
      state.lists[targetLaneIndex].tasks.push(
        new Task({
          listId: action.payload.listId,
          taskId: nanoid(),
          title: action.payload.text,
        }),
      )
      return {
        ...state
      }
    }
    case "MOVE_LIST": {
      const { dragIndex, hoverIndex } = action.payload
      state.lists = moveItem(state.lists, dragIndex, hoverIndex)
      return { ...state }
    }
    case "MOVE_TASK": {
      const {
        dragIndex,
        hoverIndex,
        sourceList,
        targetList
      } = action.payload
      const sourceLaneIndex = findItemIndexById(state.lists, sourceList)
      const targetLaneIndex = findItemIndexById(state.lists, targetList)
      const item = state.lists[sourceLaneIndex].tasks.splice(dragIndex, 1)[0]
      state.lists[targetLaneIndex].tasks.splice(hoverIndex, 0, item)
      return { ...state }
    }
    case "SET_DRAGGED_ITEM": {
      return { ...state, draggedItem: action.payload }
    }
    case "DELETE_TASK": {
      const { id, listId } = action.payload
      const listIndex = findItemIndexById(state.lists, listId)
      const taskIndex = findItemIndexById(state.lists[listIndex].tasks, id)
      state.lists[listIndex].tasks.splice(taskIndex, 1)
      return { ...state }
    }
    case "DELETE_LIST": {
      const { id } = action.payload
      const listIndex = findItemIndexById(state.lists, id)
      state.lists.splice(listIndex, 1)
      return { ...state }
    }
    default: {
      return state
    }
  }
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

interface AppStateContextProps {
  state: AppState
  dispatch: React.Dispatch<Action>
}

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(appStateReducer, appData)
  return (
    <AppStateContext.Provider value={{ state, dispatch }} >
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}