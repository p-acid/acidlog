import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import * as remarkHtml from 'remark-html'

import { Post, PostMeta } from '../interface/common'

import { differenceInDays } from 'date-fns'

const postRoute = path.join(process.cwd(), 'posts')

export const getAllPosts = () => {
  const fileNames = fs.readdirSync(postRoute)

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postRoute, fileName)

    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      id,
      ...matterResult.data
    } as PostMeta
  })

  const sortedPostList = allPostsData.sort((a: PostMeta, b: PostMeta) =>
    differenceInDays(new Date(b.date), new Date(a.date))
  )

  return sortedPostList
}

export const getRecommendedPosts = (posts: Post[], filterList: string[]) => {
  return posts.filter(({ id }) => filterList.includes(id))
}

export const getAllPostPaths = () => {
  const fileNames = fs.readdirSync(postRoute)

  return fileNames.map((fileName) => {
    return {
      params: {
        postId: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(postId: string) {
  const fullPath = path.join(postRoute, `${postId}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(remarkHtml as any)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  return {
    postId,
    contentHtml,
    ...matterResult.data
  }
}

export const getPostHeadLinkId = (children: string[]) => {
  if (typeof children[0] !== 'string') return

  return children[0].replace(' ', '-')
}

/**
 * 파일 확장자를 반환하는 함수
 * @param src 확장자를 포함하는 파일 경로
 */
export const getFileExtension = (src: string) => {
  const fileName = src.slice(src.lastIndexOf('/'))
  const lastDotIndex = fileName.lastIndexOf('.')

  return fileName.slice(lastDotIndex + 1)
}

/**
 * 파일 확장자를 매칭하는 함수
 * @param src 확장자를 포함하는 파일 경로
 * @param compareExtension 비교하고자 하는 확장자명
 */
export const validFileExtension = (src: string, compareExtension: string) => {
  const fileExtension = getFileExtension(src)

  return fileExtension === compareExtension
}
