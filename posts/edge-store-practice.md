---
title: 'Edge Store : 파일 업로드를 간단하게'
date: '2023-10-31'
description: Edge Store 활용하여 Next.js에서 파일 업로드를 간단하게 구현합니다.
tags: ['Edge Store', '업로드', 'Next.js']
thumbnail: 'thumbnail.png'
---

간단한 사이드 프로젝트를 진행할 때 이미지와 같은 파일들을 업로드 해야 하는 경우가 있습니다. 만약 프로젝트에 Next.js를 활용하고 있다면 **Edge Store**를 통해 간단하게 업로드 기능을 구현할 수 있습니다. 빠르게 예시 프로젝트를 확인하고 싶으시면 [다음 레포지토리](https://github.com/p-acid/edge-store-example)에서 확인하실 수 있습니다.

# 설정

---

Edge Store 설정은 [공식 문서](https://edgestore.dev/docs/quick-start)를 확인하시면 쉽게 진행하실 수 있습니다. 우선 설정에 필요한 패키지 설치를 위해 다음 명령어를 실행합니다.

## 패키지 설치

---

```sh
yarn add @edgestore/server @edgestore/react zod
```

각 패키지는 다음과 같은 용도로 활용됩니다.

- `@edgestore/server` : API Route Handler 설정을 위한 패키지
- `@edgestore/react` : Provider 호출을 위한 리액트 기반 패키지
- `zod` : 런타임 타입 체크를 위한 패키지

## 환경 변수

---

환경 변수는 [로그인 페이지](https://dashboard.edgestore.dev/sign-in)에서 로그인을 진행하면 프로젝트 생성이 가능한 대시보드 화면으로 넘어갑니다.

![프로젝트 생성 화면](/images/posts/edge-store-practice/create-project.png)

그렇게 프로젝트를 생성하고 나면 **액세스 키**와 **시크릿 키**를 확인할 수 있습니다. 시크릿 키의 경우 보안 처리가 되어 있어 보안 방지 버튼을 클릭하면 시크릿 키를 확인하실 수 있습니다.

![생성된 키](/images/posts/edge-store-practice/key.png)

추후, 다시 액세스 키와 시크릿 키를 확인하려면 대시보드에서 다음 버튼을 통해 확인할 수 있습니다.

![키 재확인](/images/posts/edge-store-practice/info.png)

그렇게 키를 얻고 나면 다음과 같이 `.env` 파일을 설정해줍니다.

```env
EDGE_STORE_ACCESS_KEY=your-access-key
EDGE_STORE_SECRET_KEY=your-secret-key
```

> 공식 문서에도 나왔지만 `.env` 파일을 설정했다면 **꼭 `.gitignore` 파일에 `.env` 를 추가**해주셔야 합니다.

## 백엔드

---

백엔드 기능 구현은 Next.js의 버전이 **App Router** 인지 **Page Router** 인지에 따라 설정을 다르게 합니다. [공식 문서](https://edgestore.dev/docs/quick-start#backend)에 친절히 다 작성되어 있으며 저는 App Router 버전으로 프로젝트가 구성되어 있기 때문에 해당 설정을 추가하였습니다.

```ts
// src/app/api/edgestore/[...edgestore]/route.ts

import { initEdgeStore } from '@edgestore/server'
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'
const es = initEdgeStore.create()
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket()
})
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter
})
export { handler as GET, handler as POST }
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter
```

설정은 인증을 위한 `next-auth` 패키지 설정과 유사하게 `route.ts` 파일을 통해 API Route Handler를 작성합니다. 이렇게 정의된 핸들러를 통해 DB로 업로드 된 파일을 전송합니다.

## 프론트엔드

---

다음으로 Context Provider와 커스텀 훅을 정적 파일에 생성합니다.

```ts
// src/lib/edgestore.ts

'use client'

import { type EdgeStoreRouter } from '../app/api/edgestore/[...edgestore]/route'
import { createEdgeStoreProvider } from '@edgestore/react'

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>()

export { EdgeStoreProvider, useEdgeStore }
```

이렇게 `export` 된 래핑 컴포넌트와 커스텀 훅을 통해 간편하게 업로드 요청을 보낼 수 있습니다. 예시에선 다음과 같이 루트 레이아웃 파일에 컨텍스트 래퍼를 추가했지만 국소적으로 활용할 페이지 영역에서만 사용하는 것도 가능합니다.

```tsx
// src/app/layout.tsx

import { EdgeStoreProvider } from '../lib/edgestore'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  )
}
```

이렇게 모든 설정을 마치고 나면 기능을 활용할 준비가 마무리 되었습니다.

# 기능

---

기능으로는 **업로드, 교체, 삭제, 임시 저장** 등이 있습니다.

> 기능 구현 예시는 [해당 레포지토리](https://github.com/p-acid/edge-store-example/blob/main/src/app/src/ui/upload-form.tsx)를 통해 확인하실 수 있습니다.

## 업로드

---

**업로드**는 `useEdgeStore` 에서 반환되는 `edgeStore` 의 **`edgeStore.publicFiles.upload()` 메서드**를 사용합니다.

```ts
function handler() {
  const res = await edgestore.publicFiles.upload({
    /**
     * 업로드 할 파일
     */
    file,
    /**
     * 진행 상태에 따라 진행률을 반환하는 콜백
     */
    onProgressChange(progress: number) {
      console.log(progress) // 진행률
    }
    options: {
      manualFileName, // 파일명 수동 설정
      replaceTargetUrl, // 대체할 업로드 파일 URL
      temporary // 임시 등록 여부
    }
  })
}
```

`file` 필드에 업로드 하고자 하는 파일을 전달하여 기본적인 업로드가 가능합니다. 추가적으로 각 필드를 통해 다양하게 구현을 할 수 있습니다. 반환된 값의 타입은 다음과 같습니다.

```ts
// 업로드 리턴 타입

interface UploadReturn {
  url: string
  size: number
  uploadedAt: Date
  metadata: Record<string, never>
  path: Record<string, never>
  pathOrder: string[]
}
```

## 교체

---

앞의 `upload` 메서드에서 **`options.replaceTargetUrl`** 를 추가하여 업로드 된 파일을 교체할 수 있습니다. 업로드가 완료되는 기존 파일은 자동으로 삭제됩니다.

```ts
await edgestore.publicFiles.upload({
  file: fileToUpload,
  options: {
    temporary: true
  }
})
```

## 삭제

---

업로드와 마찬가지로 **`edgeStore.publicFiles.delete()` 메서드**를 통해 가능합니다.

> 클라이언트 측 컴포넌트에서 삭제를 진행하기 위해선 [`beforeDelete` 라이프사이클 훅](https://edgestore.dev/docs/configuration#lifecycle-hooks)을 설정해야 합니다.

```ts
await edgestore.publicFiles.delete({
  url: urlToDelete
})
```

## 임시 저장

---

임시 저장은 `upload` 메서드의 **`options.temporary` 필드**를 활용하여 가능합니다. 임시 저장된 파일들은 **확정되지 않으면 자동으로 24시간 이후에 삭제**됩니다.

```ts
await edgestore.publicFiles.upload({
  file: fileToUpload,
  options: {
    temporary: true
  }
})
```

저장 확정은 **`edgeStore.publicFiles.confirmUpload()` 메서드**를 통해 가능합니다.

```ts
await edgestore.publicFiles.confirmUpload({
  url: urlToConfirm
})
```

업로드 한 뒤 대시보드를 확인하면 다음과 같이 데이터가 쌓인 것을 확인하실 수 있습니다.

![업로드 된 화면](/images/posts/edge-store-practice/uploaded-image.png)

# 마무리

---

이번 기회를 통해서 간단하게 업로드 기능을 구현할 수 있는 Edge Store에 대해 알게 되었고, 간단한 기능 구현이라면 해당 서비스 무료 플랜을 활용하여 구현할 수 있을 것 같아 좋았습니다. 해당 설정은 [Next.js App Router Template 레포지토리](https://github.com/p-acid?tab=repositories)에도 적용되어 있어 간단한 프로젝트를 진행하실 때 해당 템플릿을 활용하셔도 좋을 것 같습니다.

조만간 사이드 프로젝트 리뷰로 돌아오겠습니다.