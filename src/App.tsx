import { useEffect, useRef, useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import Card from './components/card'
import { Note } from '../types'

const BASE_URL = 'http://127.0.0.1:3000/api/v1'

export default function App() {
  const [data, setData] = useState<Note[]>([])
  const [selected, setSelected] = useState<Note | null>(null)

  const inputTitleRef = useRef<HTMLInputElement>(null)
  const inputDescriptionRef = useRef<HTMLTextAreaElement>(null)

  async function init() {
    try {
      const json = await fetch(`${BASE_URL}/notes`, {
        method: 'GET',
      })
      const response = await json.json()
      console.log('response init', response)
      setData(response?.data)
    } catch (error) {
      console.log('error while init', error)
    }
  }

  async function createNote() {
    try {
      const note = {
        title: inputTitleRef.current?.value,
        description: inputDescriptionRef.current?.value,
      }
      const json = await fetch(`${BASE_URL}/note`, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const response = await json.json()
      console.log('response createNote', response)
      alert(response?.message)
      inputDescriptionRef.current!.value = ''
      inputTitleRef.current!.value = ''
      init()
    } catch (error) {
      console.log('error while createNote', error)
    }
  }

  async function updateNote() {
    try {
      const note = {
        title: inputTitleRef.current?.value,
        description: inputDescriptionRef.current?.value,
      }
      const json = await fetch(`${BASE_URL}/note/${selected?.id}`, {
        method: 'PUT',
        body: JSON.stringify(note),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const response = await json.json()
      console.log('response updateNote', response)
      alert(response?.message)
      inputDescriptionRef.current!.value = ''
      inputTitleRef.current!.value = ''
      init()
    } catch (error) {
      console.log('error while updateNote', error)
    }
  }

  async function deleteNote(id: number) {
    try {
      const json = await fetch(`${BASE_URL}/note/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const response = await json.json()
      console.log('response deleteNote', response)
      alert(response?.message)

      init()
    } catch (error) {
      console.log('error while deleteNote', error)
    }
  }

  useEffect(() => {
    if (selected != null) {
      inputTitleRef.current!.value = selected.title
      inputDescriptionRef.current!.value = selected.description
    }
  }, [selected])

  useEffect(() => {
    init()
  }, [])

  return (
    <main className='mx-auto flex flex-col  items-center'>
      <h1 className='text-2xl font-bold my-10'>Notes App</h1>
      <div className='w-[500px] flex flex-col items-center'>
        <div className='w-[500px]'>
          <Input ref={inputTitleRef} placeholder='Title' className='my-4' />
          <Textarea
            ref={inputDescriptionRef}
            placeholder='Description'
            className='my-4'
          />
        </div>
        <Button
          onClick={selected != null ? updateNote : createNote}
          className='w-full'
        >
          {selected != null ? 'Update Note' : 'Add Note'}
        </Button>
      </div>
      <section className='grid grid-cols-1 gap-4 w-[500px] my-10'>
        {data.map((item) => (
          <Card
            title={item.title}
            description={item.description}
            key={item.id}
            onEdit={() => {
              setSelected(item)
            }}
            onDelete={() => deleteNote(item.id)}
          />
        ))}
      </section>
    </main>
  )
}
