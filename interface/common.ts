export interface Post {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  thumbnail: string
  index: number
}

export interface PostMeta extends Post {
  postId: string
  contentHtml: string
  tocHtml: string
}
