import { useEffect, useMemo, useRef } from 'react'
import { META_CONFIG } from '~/lib/config/blog'

const Comments = () => {
  const commentsRef = useRef<HTMLDivElement>(null)

  const repoPath = useMemo(() => {
    const repoUrl = META_CONFIG.github
    return repoUrl.slice(repoUrl.indexOf('github.com/') + 11)
  }, [])

  useEffect(() => {
    const scriptEl = document.createElement('script')
    scriptEl.src = 'https://utteranc.es/client.js'
    scriptEl.async = true
    scriptEl.crossOrigin = 'anonymous'
    scriptEl.setAttribute('repo', repoPath)
    scriptEl.setAttribute('issue-term', 'pathname')
    scriptEl.setAttribute('theme', `github-light`)
    scriptEl.setAttribute('label', '💬 Comments')
    scriptEl.onload = () => {
      const commentsEl = document.getElementById('utterance-github-comments')

      if (commentsEl && commentsEl.children[1]) {
        ;(commentsEl.children[1] as HTMLElement).style.display = 'none'
      }
    }

    commentsRef.current?.appendChild(scriptEl)
  }, [repoPath])

  return <div ref={commentsRef} id='utterance-github-comments' />
}

export default Comments
