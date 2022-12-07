import DEFAULT_SEO from 'next-seo.config'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { PostMeta } from '~/interfaces/common'
import { getAllPostPaths, getPostData } from '~/utils/post'
import syntaxHighlighter from './src/ui/syntaxHighlighter'

interface PostProps {
  postDetail: PostMeta
}

const Post = ({
  postDetail: { postId, title, description, contentHtml, thumbnail }
}: PostProps) => {
  return (
    <article>
      <h1 className='pb-4 text-3xl font-semibold sm:text-5xl'>{title}</h1>
      <p className='text-lg text-gray-800 dark:text-gray-300'>{description}</p>
      <div className='flex justify-center py-10'>
        <Image
          src={`/images/posts/${postId}/${thumbnail}`}
          alt={thumbnail}
          width={992}
          height={992}
        />
      </div>
      <ReactMarkdown components={syntaxHighlighter as any}>
        {contentHtml}
      </ReactMarkdown>
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
