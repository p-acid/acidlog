import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import * as remarkHtml from 'remark-html'

import { Post, PostMeta } from '../interfaces/common'

import { differenceInDays } from 'date-fns'

/**
 * 해당하는 경로 내 모든 마크다운 파일의 메타데이터 배열 반환
 */
export const getMetas = (route: string): PostMeta[] => {
  const fileNames = fs.readdirSync(route)

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(route, fileName)

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

/**
 * `getStaticPaths` 의 `paths` 에 전달될 값을 반환
 * @param path 패스 파라미터 변수명
 */
export const getPaths = (route: string, path: string) => {
  const fileNames = fs.readdirSync(route)

  return fileNames.map((fileName) => {
    return {
      params: {
        [path]: fileName.replace(/\.md$/, '')
      }
    }
  })
}

/**
 * 마크다운 메타데이터 및 콘텐츠 반환
 */
export async function getMarkdownContent(route: string, filename: string) {
  const fullPath = path.join(route, `${filename}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(remarkHtml as any)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  return {
    filename,
    contentHtml,
    ...(matterResult.data as Post)
  }
}
