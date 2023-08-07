import Link from 'next/link'
import { Post } from '~/interfaces/common'

const PostItem = ({ id, title, description, tags, date }: Post) => {
  return (
    <li className='flex flex-col gap-2'>
      <Link
        className='break-keep text-2xl font-medium hover:underline'
        href={`/post/${id}`}
      >
        {title}
      </Link>
      <p className='text-md break-keep font-light'>{description}</p>
      <div className='flex items-end justify-between pt-2 sm:pt-4'>
        <ul className='hidden gap-2 sm:flex'>
          {tags.map((tag) => (
            <li
              key={`post-item-tag-${title}-${tag}`}
              className='rounded-2xl bg-slate-900 px-3 py-1 text-xs font-light text-gray-100 dark:bg-slate-100 dark:font-normal dark:text-black'
            >
              {tag}
            </li>
          ))}
        </ul>
        <p className='text-sm font-light '>
          {'Updated at '}
          <strong className='font-semibold text-lime-900 dark:text-lime-300'>
            {date}
          </strong>
        </p>
      </div>
    </li>
  )
}

export default PostItem
