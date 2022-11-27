import Link from 'next/link'
import { Post } from '../../interface/common'
import { getAllPosts } from '../../utils/post'
import PostItem from './src/ui/PostItem'

interface DashboardProps {
  posts: Post[]
}

export default function Dashboard({ posts }: DashboardProps) {
  return (
    <section className='flex w-full flex-col gap-4'>
      <h1 className='py-8 text-center text-5xl font-bold'>
        Welcome to my New Blog 🎉
      </h1>
      <ul>
        {posts.map((props) => (
          <PostItem key={`post-item-${props.id}`} {...props} />
        ))}
      </ul>
    </section>
  )
}

export async function getStaticProps() {
  const allPostsData = getAllPosts()
  return {
    props: {
      posts: allPostsData
    }
  }
}
