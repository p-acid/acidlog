import { Post } from '~/interfaces/common'
import { FILE_PATH } from '~/lib/config/path'
import { getMetas } from '~/utils/markdown'

import PostItem from './src/ui/PostItem'

interface DashboardProps {
  posts: Post[]
}

export default function Dashboard({ posts }: DashboardProps) {
  return (
    <section className='flex w-full flex-col gap-4'>
      <h2 className='py-8 text-4xl font-semibold'>
        Blog<span className='text-lime-500 dark:text-lime-300'>.</span>
      </h2>
      <ul className='flex flex-col gap-12'>
        {posts.map((props) => (
          <PostItem key={`post-item-${props.id}`} {...props} />
        ))}
      </ul>
    </section>
  )
}

export async function getStaticProps() {
  const allPostsData = getMetas<Post>(FILE_PATH.post)
  return {
    props: {
      posts: allPostsData
    }
  }
}
