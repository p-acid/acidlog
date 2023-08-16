export interface Post {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  thumbnail: string
  index: number
}

export interface PostDetail extends Post {
  filename: string
  contentHtml: string
}
