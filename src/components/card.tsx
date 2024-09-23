import { MouseEventHandler } from 'react'

type CardProps = {
  title: string
  description: string
  onEdit: MouseEventHandler
  onDelete: MouseEventHandler
}

const Card = ({ title, description, onEdit, onDelete }: CardProps) => {
  return (
    <div className='p-4 text-gray-400 border border-gray-300 bg-white transition-all rounded-md shadow-md hover:-translate-y-1 hover:text-black hover:border-black w-full hover:rounded-none'>
      <p>{title}</p>
      <p>{description}</p>
      <div className='flex gap-2'>
        <p className='underline cursor-pointer' onClick={onEdit}>
          edit
        </p>
        <p className='underline cursor-pointer' onClick={onDelete}>
          hapus
        </p>
      </div>
    </div>
  )
}

export default Card
