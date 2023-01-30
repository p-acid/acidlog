import Image from 'next/image'
import Link from 'next/link'
import { Prism as ReactSyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { getPostHeadLinkId, validFileExtension } from '~/utils/post'

const COMMON_STYLE = {
  heading: 'mt-12 mb-6',
  media: 'w-full max-h-[600px] max-w-xl',
  list: 'flex flex-col gap-1 mb-6 list-inside'
}

const syntaxHighlighter = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <ReactSyntaxHighlighter
        language={match[1]}
        PreTag='pre'
        style={vscDarkPlus}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </ReactSyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  hr: ({ ...props }) => (
    <hr className='border-t-1 my-4 border-gray-500' {...props} />
  ),
  h1: ({ children, ...props }) => (
    <Link href={`#${getPostHeadLinkId(children)}`}>
      <h1
        className={`${COMMON_STYLE.heading} text-3xl sm:text-4xl`}
        {...props}
        id={getPostHeadLinkId(children)}
      >
        {children}
      </h1>
    </Link>
  ),
  h2: ({ children, ...props }) => (
    <Link href={`#${getPostHeadLinkId(children)}`}>
      <h2
        {...props}
        className={`${COMMON_STYLE.heading} text-2xl sm:text-3xl`}
        id={getPostHeadLinkId(children)}
      >
        {children}
      </h2>
    </Link>
  ),
  h3: ({ children, ...props }) => (
    <Link href={`#${getPostHeadLinkId(children)}`}>
      <h3
        {...props}
        className={`${COMMON_STYLE.heading} text-xl sm:text-2xl`}
        id={getPostHeadLinkId(children)}
      >
        {children}
      </h3>
    </Link>
  ),
  h4: ({ children, ...props }) => (
    <Link href={`#${getPostHeadLinkId(children)}`}>
      <h4
        {...props}
        className={`${COMMON_STYLE.heading} text-lg sm:text-xl`}
        id={getPostHeadLinkId(children)}
      >
        {children}
      </h4>
    </Link>
  ),
  p: ({ children, ...props }) => (
    <p {...props} className='mb-8 text-lg font-light'>
      {children}
    </p>
  ),
  em: ({ children, ...props }) => (
    <em {...props} className='mr-1'>
      {children}
    </em>
  ),
  strong: ({ children, ...props }) => (
    <strong {...props} className='font-medium'>
      {children}
    </strong>
  ),
  img: ({ src, alt, ...props }) => {
    const isMp4 = validFileExtension(src, 'mp4')

    return (
      <div className='mb-6 flex w-full flex-col items-center justify-center gap-2'>
        {isMp4 ? (
          <video autoPlay loop muted playsInline className={COMMON_STYLE.media}>
            <source src={src} type='video/mp4' />
          </video>
        ) : (
          <Image
            {...props}
            className={`${COMMON_STYLE.media} object-contain`}
            src={src}
            alt={alt}
            width={560}
            height={350}
          />
        )}
        {alt && <p className='text-light text-sm'>{alt}</p>}
      </div>
    )
  },
  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className='mt-5 mb-8 border-l-2 border-l-zinc-900 py-2 px-6 dark:border-l-white [&>*:last-of-type]:mb-0'
    >
      {children}
    </blockquote>
  ),
  a: ({ children, ...props }) => (
    <a {...props} className='text-blue-900 hover:underline dark:text-blue-400'>
      {children}
    </a>
  ),
  pre: ({ children, ...props }) => (
    <pre {...props} className='mb-6 p-4'>
      {children}
    </pre>
  ),
  ul: ({ children, depth, ...props }) => {
    return (
      <ul {...props} className={`ml-${depth} ${COMMON_STYLE.list} list-disc`}>
        {children}
      </ul>
    )
  },
  ol: ({ children, depth, ...props }) => (
    <ol {...props} className={`${COMMON_STYLE.list} list-decimal`}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className='text-lg font-light [&>ul]:mb-2 [&>ol]:mb-2'>
      {children}
    </li>
  )
}

export default syntaxHighlighter
