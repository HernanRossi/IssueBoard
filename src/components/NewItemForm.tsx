import React, { useState } from 'react'
import { NewItemFormContainer, NewItemButton, NewItemInput } from '../styles/styles'
import { useFocus } from '../utils'
interface NewItemFormProps {
  onAdd(text: string): void
}

export const NewItemForm = (props: NewItemFormProps) => {
  const { onAdd } = props
  const [text, setText] = useState("")
  const inputRef = useFocus()

  return (
    <NewItemFormContainer>
      <NewItemInput 
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <NewItemButton onClick={()=> onAdd(text)}>
        Create
      </NewItemButton>
    </NewItemFormContainer>
  )
}