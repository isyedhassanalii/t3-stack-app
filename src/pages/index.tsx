import { TodoItems } from '@prisma/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import ItemModal from '../components/ItemModal'
import { trpc } from '../utils/trpc'
import { HiX } from 'react-icons/hi'
import { motion } from 'framer-motion'

const Home: NextPage = () => {
  const [items, setItems] = useState<TodoItems[]>([])
  const [checkedItems, setCheckedItems] = useState<TodoItems[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const { data: itemsData, isLoading } = trpc.useQuery(['items.getAllItems'], {
    onSuccess(TodoItems) {
      setItems(TodoItems)
      const checked = TodoItems.filter((item) => item.checked)
      setCheckedItems(checked)
    },
  })

  const { mutate: deleteItem } = trpc.useMutation(['items.deleteItem'], {
    onSuccess(TodoItems) {
      setItems((prev) => prev.filter((item) => item.id !== TodoItems.id))
    },
  })



  if (!itemsData || isLoading) return <p>Loading...</p>

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {modalOpen && <ItemModal setModalOpen={setModalOpen} setItems={setItems} />}

      <main className='mx-auto my-12 max-w-3xl'>
        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
                <button className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" onClick={() => setModalOpen(true)}>Add</button>
            </div>
        </div>
        <div>
        {items.map((item) => {
            const { id, name } = item

            return (
            <div className="flex mb-4 items-center" key={id} >
              
              <div className="w-full text-grey-darkest">
                <p className="w-full text-grey-darkest"> {name}</p>
                    </div>
                <button className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800" onClick={() => deleteItem({ id })}>Remove</button>
            </div>
            )
          	})}
        </div>
    </div>
</div>
      </main>
    </>
  )
}

export default Home
