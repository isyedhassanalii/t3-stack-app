import { TodoItems } from '@prisma/client'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { trpc } from '../utils/trpc'

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>
  setItems: Dispatch<SetStateAction<TodoItems[]>>
}

const ItemModal: FC<ItemModalProps> = ({ setModalOpen, setItems }) => {
  const [input, setInput] = useState<string>('')

  const { mutate: addItem } = trpc.useMutation(['items.addItem'], {
    onSuccess(TodoItems) {
      setItems((prev) => [...prev, TodoItems])
    },
  })

  return (
    <>
    <div className='absolute inset-0 flex items-center justify-center bg-black/80'>
      <div className='space-y-6 bg-white p-3'>
        <h3 className='text-xl font-semibold'>Name of item</h3>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline'
        />
        <div className='grid grid-cols-2 gap-8'>
          <button
            type='button'
            onClick={() => setModalOpen(false)}
            className='rounded-md bg-gray-500 p-1 text-xs text-white transition hover:bg-gray-600'>
            Cancel
          </button>
          <button
            type='button'
            onClick={() => {
              addItem({ name: input })
              setModalOpen(false)
            }}
            className='rounded-md bg-green-500 p-1 text-xs text-white transition hover:bg-green-600'>
            Add
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default ItemModal
