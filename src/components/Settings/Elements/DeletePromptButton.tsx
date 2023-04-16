import { useState } from 'react'
import { Prompt, usePrompts } from '../../../hooks/usePrompts'
import * as Dialog from '@radix-ui/react-dialog'
import { HiTrash } from 'react-icons/hi'
import DialogPortal from '../../Layout/DialogPortal'

export const DeletePromptButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false)
  const [prompts, setPrompts] = usePrompts()

  const handleDelete = () => {
    const removeItem = (items: Prompt[], id: string): Prompt[] => {
      const newItems = items.filter((item) => item.id !== id)
      newItems.forEach((item) => {
        if (item.children) {
          item.children = removeItem(item.children, id)
        }
      })
      return newItems
    }
    setPrompts([])
    setPrompts(removeItem(prompts, id))
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className='cdx-rounded-sm cdx-p-1 cdx-bg-red-500/30'
          type="button"
        >
          <HiTrash />
        </button>
      </Dialog.Trigger>
      <DialogPortal
        title='Delete Prompt ?'
        primaryAction={() => {
          handleDelete()
          setOpen(false)
        }}
        secondaryAction={() => setOpen(false)}
        primaryText='Delete'
      >
        You are about to delete this prompt. This action cannot be undone.
      </DialogPortal>
    </Dialog.Root>
  )
}
