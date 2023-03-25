---
title: 배워봅시다, SvelteKit
date: '2023-03-25'
description: 근데 넌 모르잖아, SvelteKit 세상
tags: ['SvelteKit', 'Svelte', '프레임워크', '튜토리얼']
thumbnail: 'thumbnail.png'
---

# 나의 SvelteKit에 온 걸 환영해, 연진아

---

이전에 학습 권태기가 몰려올 즈음 이렇게는 안되겠다 싶어 이것저것 찾다가 발견한 **Svelte**를 학습했었습니다. 한눈에 봐도 React와는 다른 방식이었기에 신선하게 느껴졌고, 당시에도 React 이외의 다른 **진짜 프레임워크**를 사용해보면서 신세계를 느꼈었지만 끈기가 부족했는지 아니면 React 학습만으로도 벅찼는지 얼마 안가 손을 놓고 말았던 기억이 있네요.

![나 지금 되게 신나, 연진아](/images/posts/how-to-svelte-kit/hurry.jpeg)

그런 와중에 **SvelteKit**이라는 Svelte 기반 앱 프레임워크가 출시되었다는 소식을 듣고 언젠간 한 번 배워봐야지 생각만 하다가 이렇게 학습 일지 겸 간단한 기록을 작성해보고자 합니다. 이전에 Svelte 때처럼 친절하게 [튜토리얼](https://learn.svelte.dev/tutorial/introducing-sveltekit)도 제공하고 있으니 관심 있는 분들은 얼른 배움을 찾아 떠나시길 바랍니다.

# SvelteKit, 짧게 알아보기

---

**SvelteKit**은 고성능 웹 앱을 구축하기 위한 **앱 프레임워크**로, 기존 UI 프레임워크인 Svelte를 기반으로 작성됩니다. 앱 프레임워크인 SvelteKit은 **라우팅, 서버 사이드 렌더링, 데이터 요청, 타입스크립트 통합, SPA 구현** 등 다양한 기능들을 포함하고 있습니다. 또한, [**Vite**](https://vitejs.dev/)를 사용하여 빌드하기에 이 시대의 힙한 개발자라면 한 번쯤 만져봐야 하는 프레임워크라고 할 수 있습니다.

> SvelteKit에 대한 자세한 내용은 [**공식 홈페이지**](https://kit.svelte.dev/)에 더 잘 나와있으니 이만 물러가겠습니다.

![자 백정질 하러 드가자 ~](/images/posts/how-to-svelte-kit/skip.png)

# 튜토리얼

---

> 지금부터 튜토리얼 내용을 포함합니다. 직접 진행하고 싶으신 분들은 [해당 링크](https://learn.svelte.dev/tutorial/introducing-sveltekit)를 참고해주세요.

저는 앞에 말했듯이 이전에 Svelte를 잠깐 학습했던 경험이 있어서 1부를 지나치고 진행했습니다. Svelte도 처음이신 분들은 1부부터 시작하시면 좋을 것 같습니다.

## 프로젝트 구조

---

프로젝트를 시작하면 다음과 같은 프로젝트 구조를 확인하실 수 있습니다.

- `src`
  - `app.html`: 페이지 템플릿
  - `routes`: 라우팅
- `static`: 정적 asset 파일들, 배포될 때 포함될 것들
- `package.json`: 패키지
- `svelte.config.js`: 프로젝트 config
- `vite.config.js`: vite 기본 설정 관련

여기서 `package.json` 을 보면 의존성에 기본적으로 **`svelte` 와 `@sveltejs/kit`, `vite`, `esbuild-wasm`** 가 추가되어 있고 SvelteKit CLI를 활용하기 위한 스크립트 명령어가 추가되어 있습니다. 그리고 `type` 이 기본이 `module` 로 할당되어 CommonJS가 아닌 **자바스크립트 모듈**로 처리됨을 알 수 있습니다.

```json
{
  ...

  "scripts": {
    "dev": "./node_modules/vite/bin/vite.js dev",
    "build": "./node_modules/vite/bin/vite.js build",
    "preview": "./node_modules/vite/bin/vite.js preview"
  },
  "devDependencies": {
    "@sveltejs/kit": "^1.7.2",
    "esbuild-wasm": "^0.17.9",
    "svelte": "^3.55.1",
    "vite": "^4.1.3"
  },
  "type": "module"
}
```

또한 `app.html` 파일을 보면 `<head>` 태그 안에 `%sveltekit.head%` 가 있고 `<body>` 태그 안엔 `%sveltekit.body%` 가 있는 것을 확인할 수 있는데 SvelteKit이 이를 적절하게 변환한다고 하니 `routes` 내 소스 코드들을 해당 영역에 적절히 렌더링 하는 것 같습니다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    ... %sveltekit.head% ...
  </head>
  <body>
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

## 서버와 클라이언트

---

SvelteKit 앱은 함께 작동하는 별개의 두 가지 엔티티인 **서버와 클라이언트**라고 볼 수 있습니다. 이에 대한 내용을 정리하면 다음과 같습니다.

- 서버의 기본 작업은 **요청을 응답으로 바꾸는 것**입니다.
- 클라이언트는 **브라우저에 로드되는 자바스크립트**를 의미합니다.
- SvelteKit은 **두 장치가 원활하게 통신**하게 만들어줍니다.
  - 초기 렌더링에서 **서버는 HTML을 렌더링** 하여 콘텐츠를 가능한 빨리 표시되도록 합니다.
  - 그런 다음 클라이언트는 전체 페이지를 다시 로드하지 않고 후속 탐색이 발생하도록 **하이드레이션**이라는 프로세스를 대신합니다.
  - 필요에 따라 서버에서 **추가 코드와 데이터를 요청**합니다.

## 라우팅

---

### 페이지

---

SvelteKit은 Next.js와 같이 **파일 시스템 기반 라우팅**을 사용합니다. `src/routes` 폴더 내 **`+page.svelte` 이름의 파일을 갖는 모든 디렉터리**는 경로를 갖습니다.

> 기존 MPA 앱과 달리 페이지를 이동하고 뒤로 가면 SPA 같이 현재 페이지의 콘텐츠가 업데이트 되는데, 이것은 빠른 서버 렌더링과 즉각적인 네비게이션을 제공합니다.

### 레이아웃

---

모든 페이지에서 공유하는 **레이아웃**을 **`+layout.svelte`** 를 통해 구현할 수 있습니다. `routes` 디렉토리 내에 `+layout.svelte` 파일을 추가하고 **반복적으로 렌더링 될 요소를 구현**합니다. 이때 **`<slot>` 태그**를 활용하여 각 **페이지 콘텐츠**를 렌더링 할 수 있습니다. 해당 레이아웃 파일은 **모든 자식 경로에 적용**됩니다.

```html
<nav>
  <a href="/">home</a>
  <a href="/about">about</a>
</nav>

<slot />
```

### 동적 라우팅

---

동적 라우팅을 구현할 경우, 이 또한 Next.js와 마찬가지로 **대괄호**(`[]`)로 작성되는 디렉토리명으로 파라미터를 받을 수 있습니다.

## 데이터 로딩

---

SvelteKit의 핵심 작업은 **라우팅, 로딩, 렌더링**으로 구성되는데 라우팅과 렌더링이 어떻게 동작하는지 알아봤기 때문에 **로딩**에 대해 알아봅시다.

### 페이지 데이터

---

앱의 `+page.svelte` 를 포함하는 모든 디렉토리의 **`+page.server.js`** 파일에는 **`load` 함수를 선언할 수 있습니다.** 파일 이름에서 알 수 있듯이 해당 모듈은 **클라이언트 측 탐색을 포함하여 서버에서만 실행됩니다.** `load` 함수에서 반환된 값은 `data` prop을 통해 `+page.svelte` 파일에서 활용할 수 있습니다. 또한 `load` 함수의 파라미터로 페이지 파라미터를 전달 받아 이를 활용할 수도 있습니다.

```js
export function load({ params }) {
    ...
}
```

### 레이아웃 데이터

---

`+layout.svelte` 파일이 모든 자식 경로에 대한 UI를 생성하듯이, **`+layout.server.js`** 는 모든 자식 경로에 대한 데이터를 불러옵니다. 요청 데이터를 자식 경로에 상속하여 공유하고 싶다면 해당 파일명으로 생성하여 활용하면 됩니다.

## 폼

---

반대로 데이터를 보내야 할 때가 있는데, 이를 `<form>` 태그를 통해 가능합니다.

### `<form>` 엘리먼트

---

아래와 같이 **`method` 속성**을 통해 `POST` 요청을 생성할 수 있습니다.

```html
<form method="POST">
  <label>
    Add data:
    <input />
  </label>
</form>
```

이때, 해당 요청을 `+page.server.js` 파일 내 **`actions` 객체**에 정의할 수 있습니다.

```js
export const actions = {
  default: async (...props) => {
    ...
  }
}
```

### 명명된 폼 액션

---

페이지가 하나의 액션만을 갖는 것은 드물기 때문에 `actions` 객체 내 **명명된 액션**을 통해 구분지어 할당할 수 있습니다.

```js
export const actions = {
  create: async (...props) => {
    ...
  },

  delete: async (...props) => {
    ...
  }
}
```

> 앞의 기본 작업(`default`)과 명명된 작업은 공존할 수 없습니다.

그리고 아래와 같이 **`action` 속성**을 통해 명명된 액션을 할당할 수 있습니다.

```html
<form method="POST" action="?/create">
  <label>
    Add data:
    <input />
  </label>
</form>
```

> `action` 속성은 **어떤 URL이든 될 수 있습니다.** 다른 페이지에서 정의된 경우 `/todos?/create` 와 같이 경로를 설정할 수 있습니다. 해당 예제에서는 페이지 내 존재하는 액션이기에 경로명을 생략했습니다.

### 유효성 검사

---

유저들은 어떤 데이터를 제출할지 예상이 안되는 대상들이고 그렇기에 **`<form>` 데이터의 유효성을 검사하는 것이 중요합니다.**

기본적으로 **브라우저 내장 `<form>` 유효성 검사**를 통해 이를 수행할 수 있습니다. 예를 들어, `<input>` 의 경우 `required` 속성을 추가할 수 있습니다.

```html
<!-- 이제 빈 input에서 제출을 진행하면, 오류를 반환합니다. -->
<input required />
```

하지만 이 정도로는 부족합니다. 일부 유효성 검사(예를 들어, 고유 여부)들은 이를 통해 수행할 수 없으며, 이를 위해선 **서버 측 검증이 진행되어야 합니다.** 이를 위해 유효성 검사 구문을 추가해줍니다.

```ts
export function createTodo(userid, description) {
  // todo는 설명이 필요하다는 유효성 검사
	if (description === '') {
		throw new Error('todo must have a description');
	}

	if (!db.has(userid)) {
		db.set(userid, []);
	}

	const todos = db.get(userid);

// 고유한 todo를 생성해야 한다는 유효성 검사
	if (todos.find((todo) => todo.description === description)) {
		throw new Error('todos must be unique');
	}

  ...
}
```

그런데 이렇게 되면 익숙치 않은 오류 페이지로 리다이렉트 시키는데 SvelteKit은 종종 민감한 정보를 사용자에게 숨긴다고 합니다. 이는 부자연스럽기 때문에 **`fail` 함수**를 통해 적절한 HTTP 코드와 데이터를 반환하도록 바꿀 수 있습니다.

```ts
export const actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData();

    // try ~ catch 구문을 통해 error를 핸들링
		try {
			db.createTodo(cookies.get('userid'), data.get('description'));
		} catch (error) {
			return fail(422, {
				description: data.get('description'),
				error: error.message
			});
		}
	}
```

이렇게 반환된 데이터는 `<form>` 제출 이후에만 채워지는 **`<form>` prop**을 통해 활용할 수 있습니다.

```html
<script>
  export let data
  export let form
</script>
```

> 꼭 `fail` 로 래핑하지 않아도 데이터를 반환할 수 있습니다. 예를 들어, 성공했을 때 "성공하셨습니다!" 라는 메시지들을 말이죠.

### 점진적 향상

---

SvelteKit에서는 `<form>` 을 활용하기 때문에 자바스크립트 없이도 동작하고 이는 해당 프레임워크가 꽤나 탄력적이라고 할 수 있다고 말할 수 있습니다. 하지만 대부분 사용자들은 자바스크립트를 활용하고 이 경우엔 **점진적인 향상**을 도모할 수 있습니다.

이를 위해 **`$app/forms` 에서 `enhance` 함수를 불러와** 다음과 같이 **`<form>` 에 `use:enhance` 지시문을 추가**합니다.

```html
<script>
  import { enhance } from '$app/forms'
</script>

<form method="POST" action="?/create" use:enhance />
```

이렇게 되면 전체 페이지 새로고침을 제외하고 **브라우저 네이티브 동작을 모방**하여 다음과 같은 동작을 진행합니다.

- `form` prop 업데이트
- 성공적인 응답에 대한 모든 데이터를 무효화하여 `load` 함수들을 재실행
- 리다이렉트 응답에 대해 새로운 페이지로 네비게이션
- 에러 발생에 대해 가장 가까운 에러 페이지로 이동

이제 페이지 리로딩 대신 업데이트를 진행하기 때문에, transitions와 같은 행동들을 추가할 수 있습니다.

### `use:enhance` 커스터마이징

---

`use:enhance` 를 사용하면 단순히 브라우저 기본 동작을 모방하는 것 외에도 다양한 기능을 수행할 수 있습니다. **콜백 함수**를 전달하여 **보류 상태의 표현과 낙관적 UI 업데이트** 등을 수행할 수 있습니다.

데이터를 생성하는 경우 요청되는 동안 해당 상태(보류 상태)를 다음과 같이 표현할 수 있습니다.

```tsx
<form
  method='POST'
  action='?/create'
  use:enhance={() => {
    creating = true

    return async ({ update }) => {
      await update()
      creating = false
    }
  }}
>
  <label>
    {creating ? 'saving...' : 'add a todo:'}
    <input
      disabled={creating}
      name='description'
      value={form?.description ?? ''}
      required
    />
  </label>
</form>
```

삭제의 경우엔 삭제 요청을 기다릴 필요가 없으니 미리 삭제를 진행(낙관적 UI 업데이트)할 수도 있습니다.

```tsx
<ul>
	{#each data.todos.filter((todo) => !deleting.includes(todo.id)) as todo (todo.id)}
		<li class="todo" in:fly={{ y: 20 }} out:slide>
			<form
				method="POST"
				action="?/delete"
				use:enhance={() => {
					deleting = [...deleting, todo.id];
					return async ({ update }) => {
						await update();
						deleting = deleting.filter((id) => id !== todo.id);
					};
				}}
			>
```

> 이외에도 `use:enhance` 의 커스터마이징은 `cancel()` 을 통한 제출 취소와 `<form>` 리셋 제어 등 다양하게 가능합니다. 자세한 내용은 [문서](https://kit.svelte.dev/docs/modules#$app-forms-enhance)를 참고하세요.

## API Routes

---

SvelteKit을 사용하면 HTTP 메서드에 해당하는 함수를 내보내는 `+server.js` 파일을 추가하여 **API Routes**를 만들 수 있습니다. 예를 들어, 다음과 같이 `src/routes/roll/+server.js` 경로에 `GET` 메서드를 추가할 수 있습니다.

```ts
export function GET() {
  const number = Math.floor(Math.random() * 6) + 1

  return new Response(number, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
```

요청 핸들러는 [요청 객체](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response)를 반환해야 합니다. API Routes에서 **JSON**을 반환하는 것이 일반적이기에 SvelteKit은 이를 위한 **`json()`** 이라는 편리한 함수를 제공합니다.

```ts
import { json } from '@sveltejs/kit'

export function GET() {
  const number = Math.floor(Math.random() * 6) + 1

  return json(number)
}
```

## 에러와 리다이렉트

---

SvelteKit에는 **예상된 에러와 예상되지 않은 오류** 두 가지가 있습니다.

예상되는 오류의 경우 `+page.server.js` 파일에 `@sveltejs/kit` 에서 불러온 **`error` 함수를 통해 정의된 에러들**이고 이는 **사용자에게 표시**됩니다. 반면, 예상되지 않은 오류는 **`new Error` 생성자를 통해 생성된 에러**이고 이는 민감한 정보를 담고 있을 수 있기 때문에 **내부 오류 메시지와 500 상태 코드로 대체**됩니다.

### 에러 페이지

---

`load` 함수에서 에러를 반환하면, SvelteKit은 **에러 페이지를 렌더링합니다.** 기본 오류 페이지는 다소 단조롭기 때문에 **`src/routes/+error.svelte` 컴포넌트를 만들어** 커스텀 한 에러 페이지를 생성할 수 있습니다.

```tsx
<script>
	import { page } from '$app/stores';

	const emojis = {
		// TODO add the rest!
		420: '🫠',
		500: '💥'
	};
</script>

<h1>{$page.status} {$page.error.message}</h1>
<span style="font-size: 10em">
	{emojis[$page.status] ?? emojis[500]}
</span>
```

> `page` 스토어에 대해선 다음에 자세히 알아봅니다.

`+error.svelte` 컴포넌트는 `+layout.svelte` 내에서 렌더링 되며, 디렉토리 구분을 통해 보다 세분화 된 에러 페이지 영역 구분을 진행할 수 있습니다. 특정 경로의 `+error.svelte` 컴포넌트는 **해당 경로에서 우선적으로 렌더링**됩니다.

### 에러 대체

---

상황이 정말 잘못되어, 에러 페이지를 렌더링하다가 에러를 반환하는 경우와 같은 상황에서 SvelteKit은 **정적 에러 페이지로 전환**합니다.

이때 반환되는 정적 페이지를 **`src/error.html` 파일**을 통해 커스터마이징 할 수 있습니다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>%sveltekit.error.message%</title>
    <style>
      body {
        color: #ff531a;
      }
    </style>
  </head>
  <body>
    <h1>Game over</h1>
    <p>Error code %sveltekit.status%</p>
  </body>
</html>
```

해당 파일은 다음의 값들을 포함할 수 있습니다.

- `%sveltekit.status%`: HTTP 상태 코드
- `%sveltekit.error.message%`: 에러 메시지

### 리다이렉트

---

**`throw` 메커니즘**을 통해 다른 페이지로 리다이렉트 시킬 수 있습니다.

```ts
import { redirect } from '@sveltejs/kit'

export function load() {
  throw redirect(307, '/b')
}
```

해당 `+page.server.js` 파일이 있는 페이지는 `/b` 경로로 리다이렉트 됩니다. `throw redirect(...)` 구문은 **`load` 함수, form 액션, API routes, `handle` Hook** 등의 내부에서 활용할 수 있습니다.

가장 일반적인 상태 코드는 다음과 같습니다.

- `303`: form 액션의 경우, 성공적인 제출 이후
- `307`: 임시 리다이렉션을 위한
- `308`: 영구적인 리다이렉션을 위한

## 페이지 옵션

---

데이터 로딩 챕터에서는 `+page.js`, `+page.server.js`, `+layout.js` 그리고 `+layout.server.js` 파일에서 `load` 함수를 내보내는 방법에 대해 알았습니다. 그리고 다음 모듈들을 통해 다양한 **페이지 옵션**을 내보낼 수 있습니다.

- `ssr`: 페이지를 서버 사이드 렌더링을 할 지에 대한 여부
- `csr`: SvelteKit 클라이언트를 불러올 지에 대한 여부
- `prerender`: 요청 마다가 아닌, 빌드할 때 페이지를 미리 불러올 지에 대한 여부
- `trailingSlash`: URL에서 후행 슬래시를 추가, 제거 및 무시할 지에 대한 여부

페이지 옵션은 **개별 페이지(`+page.js`, `+page.server.js` 에서 `export` 된 경우) 또는 페이지 그룹(`+layout.js`, `+layout.server.js` 에서 `export` 된 경우)에 적용**할 수 있습니다. 전체 앱에 대한 옵션을 정하려면 **루트에서 정의**하고 하위 레이아웃 및 페이지에서 이를 **오버라이드** 할 수 있습니다.

### `ssr`

---

**SSR**(Server-side rendering)은 Next.js와 마찬가지로 **서버 사이드 렌더링**을 의미하며 말 그대로 **서버 측에서 렌더링(HTML을 생성)을 진행하는 것**입니다. 이는 **성능과 SEO** 등의 측면에서 유용합니다.

하지만 일부 컴포넌트의 경우 `window` 객체와 같이 브라우저 전역에 접근해야 하는 경우가 있고, 이런 경우 서버 사이드 렌더링을 포기해야 하기에 이를 **비활성화** 시킬 수 있습니다.

```ts
// +page.server.ts

export const ssr = false
```

> 루트의 `+layout.server.js` 파일에서 이를 비활성화 시키면 앱 전체를 SPA 변환할 수 있습니다.

### `csr`

---

앞에서 SSR을 비활성화한 것과 마찬가지로 클라이언트 측 인터랙션을 통해 발생하는 렌더링(Client-side rendering)을 **`csr` 옵션**을 통해 비활성화 할 수 있습니다.

```ts
// +page.server.ts

export const csr = false
```

이는 더이상 자바스크립트가 동작하지 않으며, 그 어떤 인터랙션이 없을 수 있다는 것을 의미합니다. 이를 통해 자바스크립트가 없는 환경에서 앱을 사용할 수 있는 지 등의 테스트를 해볼 수 있습니다.

### `prerender`

---

**사전 렌더링**(Prerendering)은 요청에 의해 동적으로 페이지를 생성하는 것이 아니라 **빌드 타임에 한 번만 HTML을 생성하는 것**입니다.

사전 렌더링은 잘못 되기 쉬운 [캐시 컨트롤](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)에서 자유롭고 성능이 우수하다는 장점이 있지만, 빌드 프로세스가 오래 걸리고 새 버전의 업데이트가 있어야만 콘텐츠를 업데이트 할 수 있다는 단점이 있습니다. 앞의 옵션들과 같이 `prerender` 옵션을 통해 활성화 할 수 있습니다.

```ts
// +page.server.ts

export const prerender = true
```

모든 페이지가 사전 렌더링이 가능한 것은 아닙니다. 사전 렌더링이 가능하려면 다음 기본 규칙을 알아야 합니다.

- 두 명의 유저가 동일한 콘텐츠를 불러올 수 있어야 합니다.
- 페이지는 form 액션을 포함하면 안 됩니다.

동적 라우팅을 한다면 [**`prerender.entries`**](https://kit.svelte.dev/docs/configuration#prerender) 에 정의되어 있거나, `prerender.entries` 에 있는 링크을 따라가서 도달할 수 있는 한 사전 렌더링 될 수 있습니다.

> 루트의 `+layout.server.js` 에서 `prerender` 를 `true` 로 설정하면 SvelteKit은 해당 앱을 **정적 사이트 생성기**(SSG)로 변경할 수 있습니다.

### `trailingSlash`

---

`/foo` 와 `/foo/` 경로는 같다고 생각할 수 있지만, 실제론 다릅니다. 상대 경로인 `./bar` 가 있을 때 전자의 경우 `/bar` 경로로 이동하고 후자의 경우 `/foo/bar` 로 이동을 합니다. 그리고 검색 엔진은 두 가지 경로를 별개의 경로라 판단하여 **SEO에 악영향을 끼칩니다.**

요약하자면, 후행 슬래시에 대해 유연하게 생각하는 것은 좋지 않은 생각이며, SvelteKit은 **기본적으로 후행 슬래시를 제거합니다.**

만약, **후행 슬래시가 있음을 항상 파악하고자** 한다면 **`trailingSlash` 옵션**에 **`always` 값을 할당**할 수 있습니다.

```ts
export const trailingSlash = 'always'
```

**두 가지 경우를 모두 무시**하고 싶다면(권장되지 않음), **`ignore`** 값을 할당할 수 있습니다.

```ts
export const trailingSlash = 'always'
```

기본값은 **`never`** 입니다.
