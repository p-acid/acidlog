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
      <h1 className='pb-4 text-5xl'>{title}</h1>
      <p className='text-lg'>{description}</p>
      <div className='flex justify-center py-6'>
        <Image
          src={`/images/posts/${postId}/${thumbnail}`}
          alt={thumbnail}
          width={560}
          height={560}
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
      postDetail
    }
  }
}
