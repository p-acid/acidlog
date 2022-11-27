import { PostMeta } from '../../interface/common'
import { getAllPostPaths, getPostData } from '../../utils/post'

interface PostProps {
  postDetail: PostMeta
}

const Post = ({ postDetail }: PostProps) => {
  return (
    <div>
      <span>fsdf</span>
    </div>
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
