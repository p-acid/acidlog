import DEFAULT_SEO from 'next-seo.config'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

import { PostMeta } from '~/interfaces/common'
import { getAllPostPaths, getPostData } from '~/utils/post'
import syntaxHighlighter from './src/ui/syntaxHighlighter'

const DynamicComments = dynamic(() => import('../../components/Comments'), {
  ssr: false
})

interface PostProps {
  postDetail: PostMeta
}

const Post = ({
  postDetail: { postId, title, description, contentHtml, thumbnail }
}: PostProps) => {
  return (
    <article>
      <h1 className='break-keep pb-4 text-3xl font-semibold sm:text-5xl'>
        {title}
      </h1>
      <p className='break-keep text-lg text-gray-800 dark:text-gray-300'>
        {description}
      </p>
      <div className='flex justify-center py-10'>
        <Image
          className='max-h-[400px] object-cover'
          src={`/images/posts/${postId}/${thumbnail}`}
          alt={thumbnail}
          width={992}
          height={992}
        />
      </div>
      <ReactMarkdown components={syntaxHighlighter as any}>
        {contentHtml}
      </ReactMarkdown>
      <div className='py-8' />
      <DynamicComments />
    </article>
  )
}

export default Post

export async function getStaticPaths() {
  const allPostsPaths = getAllPostPaths()

  return {
    paths: allPostsPaths,
    fallback: false
  }
}

export async function getStaticProps({
  params
}: {
  params: { postId: string }
}) {
  const postDetail = await getPostData(params.postId)

  return {
    props: {
      postDetail,
      openGraph: {
        title: `${postDetail.title} | ${DEFAULT_SEO.title}`,
        description: postDetail.description,
        images: [`/images/posts/${postDetail.postId}/${postDetail.thumbnail}`]
      }
    }
  }
}
