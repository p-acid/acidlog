import { CalendarIcon } from '@heroicons/react/24/solid'
import DEFAULT_SEO from 'next-seo.config'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

import { PostDetail } from '~/interfaces/common'
import { FILE_PATH } from '~/lib/config/path'
import { getKoreanDate } from '~/utils/date'
import { getMarkdownContent, getPaths } from '~/utils/markdown'
import syntaxHighlighter from './src/ui/syntaxHighlighter'

const DynamicComments = dynamic(() => import('../../components/Comments'), {
  ssr: false
})

interface PostProps {
  postDetail: PostDetail
}

const Post = ({
  postDetail: { filename, title, date, description, contentHtml, thumbnail }
}: PostProps) => {
  return (
    <article>
      <div className='flex flex-col items-center'>
        <h1 className='break-keep pt-[10%] pb-8 text-center text-3xl font-semibold sm:text-5xl'>
          {title}
        </h1>
        <span className='break-keep pb-2 text-center text-lg text-gray-500 dark:text-gray-300'>
          {description}
        </span>
        <span className='flex items-center gap-2 break-keep text-sm font-normal text-gray-600 dark:text-gray-400'>
          <CalendarIcon className='h-5' />
          {getKoreanDate(new Date(date))}
        </span>
      </div>
      <div className='flex justify-center py-[20%]'>
        <Image
          className='max-h-[400px] object-cover'
          src={`/images/posts/${filename}/${thumbnail}`}
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
  const allPostsPaths = getPaths(FILE_PATH.post, 'postId')

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
  const postDetail = await getMarkdownContent<PostDetail>(
    FILE_PATH.post,
    params.postId
  )

  return {
    props: {
      postDetail,
      openGraph: {
        title: `${postDetail.title} | ${DEFAULT_SEO.title}`,
        description: postDetail.description,
        images: [`/images/posts/${postDetail.filename}/${postDetail.thumbnail}`]
      }
    }
  }
}
