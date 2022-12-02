import Image from 'next/image'
import { Post } from '~/interfaces/common'
import { getAllPosts } from '~/utils/post'
import PostItem from './src/ui/PostItem'

interface DashboardProps {
  posts: Post[]
}

export default function Dashboard({ posts }: DashboardProps) {
  return (
    <section className='flex w-full flex-col gap-4'>
      <div className='flex flex-col items-center'>
        <h1 className='pt-8 text-center text-5xl font-bold'>
          Welcome to New Blog 🎉
        </h1>
        <Image src='/banner.png' alt='banner' width={560} height={560} />
      </div>
      <h2 className='pt-8 pb-4 text-4xl font-semibold'>Posts</h2>
      <ul className='flex flex-col gap-12'>
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
