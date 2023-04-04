---
title: 스토리북 문서화에 대한 고찰
date: '2022-03-17'
description: 좋은 문서화는 의도한 활용 결과를 도출할 수 있지 않을까
tags: ['스토리북', '문서화', 'MDX']
thumbnail: 'thumbnail.jpg'
---

# 들어가며

---

사내 디자인 시스템 개발에 참여한 지 일주일이 되었습니다. 평소 디자인 시스템에 대한 동경이라고 해야 하나, 아무튼 호기심이 상당했기에 하겠다고 나섰지만 생각보다 녹록치 않더군요. 아직도 기능 구현이나 설계 같은 부분에서 많은 고민을 하고 있지만, 그래도 여유가 조금은 생겨서 **문서화나 성능 개선**에 대한 내용이 조금씩 눈에 밟히기 시작하는 것 같습니다.

그 중 오늘은 **문서화**에 대해 학습해보고자 합니다. 개인적으로 문서화에 대한 부분은 유난히도 **디자인 시스템을 사용하는 개발자들의 입장을 많이 고려해야 하는 작업**인 것 같습니다. 막상 디자인 시스템을 만들 때, 제작하는 개발자는 이미 해당 컴포넌트에 대해 지겹게 생각하고 난 뒤이기 때문에 **컴포넌트 내에서 사용되는 속성들**에 대해 꿰뚫고 있을테고, 이러한 마인드로 문서화 작업을 진행한다면 처음보는 사람으로 하여금 **굉장히 편파적일 수 있는 결과물**이 탄생하기도 합니다.

![흔한 디자인시스템 개발자](/images/posts/storybook-docs/why_dont_know.jpeg)

> 물론, 그렇게 이기적으로 개발한다면 **디자인 시스템으로서의 의미가 있나** 싶긴 하지만요

이런 생각은 많이 하고 있는데, 지금의 업무 진행 패턴을 보면 **컴포넌트 구상 및 인사이트 검색 ⮕ 설계 ⮕ 개발 ⮕ 문서화**의 작업 과정을 거치고 있기에, 막상 문서화를 진행하고자 할 때에는 개발 시작보다도 못한 의욕으로 작성하고 있는 제 자신의 모습을 발견할 수 있습니다. 아무리 재밌는 개발 작업이었어도 지겹게 보고 나면 꼴도 보기 싫을수도 있는거 아닐까요? 다들 그러실거라고 생각하겠습니다. 아무튼 이제 푸념 그만하고 **공부 시작합시다.**

# 문서화가 뭔데요?

---

우선 **문서화**가 무엇인지에 대해 간단하게 알아봅시다. 위키무새인 저이기에 바로 위키백과를 뒤졌지만 제가 원하는 정의가 나오진 않아서 **제 나름의 문서화에 대한 정의**를 해보도록 하겠습니다.

문서화는 **일종의 정보들을 글이나 기호로써 표현하여 저장하는 것**을 의미한다고 생각합니다. 여기서 일종의 정보들은 **음성**의 형태가 될 수도 있고, **글 형태의 문자들로 구성된 다른 정보**가 될 수도 있을 것입니다. 우리는 이렇게 문서화를 진행하면 **어떤 이점을 얻을 수 있을까요?**

- 미팅이나 논의를 진행한 부분에 대해 **내용 혼선 없이** 명확하게 업무를 진행할 수 있을 것입니다.
- 음성 정보와 같은 **휘발성 정보**에 대해 다시금 상기할 수 있는 방법을 만들 수도 있을 것입니다.
- 디자인 시스템과 같은 경우에는, **만든 제작자의 의도를 설명하기 위한 방법**으로 활용될 수도 있겠네요.

아무튼 문서화란 이런 것이며, 문서화는 이러한 이유 때문에 진행하지 않을까에 대해 간단히 정리해봤습니다.

# 스토리북은 문서화를 어떻게 하나요?

---

스토리북 문서화는 다양한 방식으로 진행할 수 있습니다. 그 중 대표적으로 다음의 방식들이 존재합니다.

- 공식 `addon-docs` 를 활용한 문서화 진행
- 커스텀 사이트에서 문서화 진행
- 노션 혹은 컨플루언스와 같은 워크스페이스에서 문서화 진행
- 디자인 시스템 매니저(제플린 등)와 스토리 연결

이 중 **[`@storybook/addon-docs`](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/docspage.md) 를 통해 스토리북 내부에서 컴포넌트 스토리들을 문서로 변경**할 수 있습니다. 해당 애드온으로 스토리를 작성하는 방식은 `DocsPage` 와 `MDX` 방식이 있습니다.

> 이전 문법인 [`storiesOf`](https://github.com/storybookjs/storybook/blob/master/lib/core/docs/storiesOf.md) 나 [`addons-info`](https://github.com/storybookjs/deprecated-addons/tree/master/addons/info) 도 존재하지만, 이는 생략하도록 하겠습니다.

대표적으로 사용되는 `addon-docs` 방식을 간단하게 알아보도록 합시다.

## DocsPage

---

`DocsPage` 는 **zero-config인 기본 문서**입니다. 참고로 `DocsPage` 는 `addon-info` 의 후속작입니다. 그래서 그런지, `DocsPage` 는 `addon-info` 와 유사하게 기본값을 제공하여 **추가적인 작업 없이 스토리북에 문서를 추가할 수 있습니다.** 그리고 `DocsPage` 가 갖는 **개선 사항**은 다음과 같습니다.

- **리액트, 뷰, 앵귤러를 포함한 모든 프레임워크를 지원**합니다.
- 스토리북과는 별개로, **독립적인 문서 사이트로서 사용되는 문서를 생성**할 수 있습니다.
- 더 나은 구성을 지원하므로, **프로젝트별 정보를 쉽게 캡쳐**할 수 있습니다.
- **더 많이 제어가 필요할 때, `MDX` 문서를 사용**할 수 있도록 제작되었습니다.

이를 활용하여 다음과 같이 스토리를 작성할 수 있습니다.

```jsx
import React from 'react'

import { Button } from './Button'

export default {
  title: 'Example/Button',
  component: Button,

  parameters: {
    componentSubtitle: 'This is Button Component'
  },
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})

Primary.args = {
  primary: true,
  label: 'Button'
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button'
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button'
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button'
}
```

이렇게 스토리 문서를 작성하고 스토리북을 실행하면 다음과 같은 결과를 확인할 수 있습니다.

![DocsPage 결과](/images/posts/storybook-docs/storybook_example.mp4)

이에 대한 자세한 내용은 [**`DocsPage` Reference**](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/docspage.md)를 참조하시면 될 것 같습니다.

## MDX

---

[`MDX`](https://mdxjs.com/)는 **마크다운에서 JSX 문법을 활용할 수 있도록** 만들어줍니다. 이를 스토리북에서 활용하면, 기본적으로 문서 형태를 제공하는 `DocsPage` 와 달리 **컴포넌트 문서를 완전히 제어할 수 있습니다.** 그래서 상대적으로 **자유도가 높기에,** 커스텀을 원한다면 MDX를 활용하면 좋을 것 같습니다.

`MDX` 형태의 문서는 다음과 같이 작성할 수 있습니다.

```jsx
import { Meta, Story, Canvas } from '@storybook/addon-docs';
import { Checkbox } from './Checkbox';

<Meta title="MDX/Checkbox" component={Checkbox} />

# Checkbox

With `MDX` we can define a story for `Checkbox` right in the middle of our
markdown documentation.

<Canvas>
  <Story name="all checkboxes">
    <form>
      <Checkbox id="Unchecked" label="Unchecked" />
      <Checkbox id="Checked" label="Checked" checked />
      <Checkbox appearance="secondary" id="second" label="Secondary" checked />
    </form>
  </Story>
</Canvas>
```

`MDX` 를 활용하는 방법은 [해당 링크](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/mdx.md)에서 확인하시면 좋을 것 같습니다.

# 저는 어떻게 했냐면요

---

저희는 `addon-docs` 를 활용하여 문서화 작업을 진행합니다. 초반엔 `DocsPage` 형태의 문서를 작성하다가, 이후 `MDX` 형식의 문서로 전환하게 되었습니다.

확실히 `MDX` 를 사용하니 **기존 마크다운 문법과 JSX 구문을 혼용할 수 있다는 부분이 정말 편리했습니다.** 단순히, 문서화를 진행할 때 **자유도가 높다**는 부분 외에도, 마크다운 문법을 함께 활용할 수 있기에 **실제로 화면에 반영되는 스토리북 문서의 모습과 코드상의 디자인이 동기화되는 점**이 좋다고 생각했습니다.

그리고 앞에서 말했듯이, 저는 문서화 작업을 전체 작업 프로세스의 **제일 마지막 단계**에서 하기 때문에, 실제로 작업 중에 문서화에 반영하고자 했던 내용들이 많이 생략되는 결과를 확인했습니다. 그래서 추가되는 **`props` 나 변경사항이 존재할 때마다, 그 의도를 별도로 기재하여 이후 문서화에 참고**하는 프로세스를 추가하였습니다. 그렇게 다음의 효과를 얻을 수 있었습니다.

- 개발을 진행하면서 느꼈던 **유의점들을 당시의 생생한 기억을 기반으로 명확히 전달할 수 있습니다.**
- 인지하고 있어야 하는 내용들이 줄어들기에, **좀 더 개발에 집중할 수 있는 환경을 만들 수 있습니다.**

실제로 저는 문서화 작업을 진행하면서 **"아 이거 뭔가 중요한 부분이 있었던 것 같은데"** 라는 순간들이 정말 많았는데, 새로운 추가사항이나 변동사항이 존재할 때 이를 간단하게 기재하고 넘어가니 그런 모먼트를 많이 줄일 수 있었습니다.

그리고 코드 내에서의 변동사항 외에도 **의견 공유 및 논의를 통한 결과** 또한 기재했는데, 이런 부분은 **불필요하다고 생각한 부분을 만든 이유**를 설명할 때 굉장히 유용했던 것 같습니다. 다음과 같은 상황이 있다고 가정해봅시다.

```ts
interface PropsType1 {
  text?: string
}

interface PropsType2 {
  hasText?: boolean
  text?: string
}
```

`PropsType1` 과 `PropsType2` 는 특정 컴포넌트의 `props` 의 타입을 설명하는 인터페이스입니다. 타입 이름을 보니 추가적인 텍스트를 활용하는 컴포넌트인가 봅니다. 차이점을 찾자면 `PropsType2` 는 **텍스트의 유무를 관리하는 `hasText` 를 추가적으로 갖는다는** 부분이겠네요. 이 부분에서 제가 **"`text` 의 유무로 `hasText` 을 핸들링 할 수 있지 않을까?"라는 고민**이 있었는데, 이에 대해 팀원과 논의를 거쳐 `hasText` 를 사용해야 하는 예외 상황(텍스트 데이터만 남기고 텍스트를 온/오프 하는 상황)이 논의 과정에서 나왔고 이러한 부분을 정리했다고 생각하면 될 것 같습니다.

누군가에게도 `hasText` 는 불편하게 다가올 수 있고, 이를 물어보는 상황이 발생하면 이러한 부분을 설명할 때 잊지 않고 의도를 명확히 표현하는데 도움이 되었던 것 같습니다.

# 이렇게 하면 좋을 것 같아요

---

디자인 시스템 문서화에 대한 레퍼런스를 찾다가 발견한 [포스팅](https://dev.to/loicgoyet/how-i-manage-to-make-my-storybook-project-the-most-efficient-possible-2d8o)이 있는데 옛날 포스팅이라 구버전에 대한 내용을 많이 포함하고 있지만, 현 시점에서도 적용할 수 있는 내용들이 있는 것 같아 간단하게 정리해보고자 합니다.

## 가장 간단한 방식으로 스토리 스니펫 작성

---

`stories.js` 파일은 **스토리북에서 컴포넌트를 보여주는 용도**로 사용되지만, 또한 **해당 컴포넌트 자체의 구현 방식에 대한 문서**가 될 수도 있습니다. 그런 맥락에서 머리를 싸매지 않고 컴포넌트 사용 방법을 익히려면 **최대한 직관적으로 코드를 구성하는 것이 좋습니다.**

그러한 맥락에서, 코드는 가능한 **정적이면** 좋고 **추상화를 피하며**, 필요한 경우 **반복을 수행합니다.** 다음의 예시를 통해 이를 확인할 수 있습니다.

```ts
// This story source is written with the new "Component Story Format" from Storybook 5.2
import React from 'react'

import ActorList from './index'
import ActorListItem from './item'

export default {
  title: 'ActorList'
}

// ❌ Bad
export const badStory = () => {
  const actors = [
    {
      name: 'Jonathan Groff',
      role: 'Holden Ford',
      isDetective: true
    },
    {
      name: 'Holt McCallany',
      role: 'Bill Tench',
      isDetective: true
    },
    {
      name: 'Cameron Britton',
      role: 'Edmund Kemper',
      isDetective: false
    }
  ]

  return (
    <ActorList length={actors.length}>
      {actors.map((actor) => (
        <ActorListItem key={actor.name} {...actor} />
      ))}
    </ActorList>
  )
}

// ✅ Good
export const goodStory = () => (
  <ActorList length={3}>
    <ActorListItem name='Jonathan Groff' role='Holden Ford' isDetective />
    <ActorListItem name='Holt McCallany' role='Bill Tench' isDetective />
    <ActorListItem name='Cameron Britton' role='Edmund Kemper' />
  </ActorList>
)
```

## 코드 베이스를 아키텍쳐화 하면서, 스토리를 아키텍쳐화 하기

---

프론트엔드 개발자가 가장 많이 쓰는 명령어 중 하나는 `import` 입니다. 컴포넌트 기반 라이브러리를 사용하여 작은 컴포넌트를 더 큰 컴포넌트로 가져오려고 하기에 **스토리북의 구조가 컴포넌트의 위치를 파악하는데 도움이 된다면 이는 좋은 장점이 될 수 있습니다.**

다음과 같이 컴포넌트를 구성한다면 스토리 제목은 그 다음과 같을 수 있습니다.

```shell
/src
  | /components
    | <Button>
    | /form
      | <Input>
      | <Checkbox>

  | /container
    | <SignUpForm>

  | /view
    | <SignUpPage>
```

- `Components|Button`
- `Components|Form/Input`
- `Components|Form/Checkbox`
- `Container|SignUpForm`
- `View|SignUpPage`

## 각 컴포넌트에 대한 `"default"` 스토리 만들기

---

모든 컴포넌트 지향 라이브러리는 컴포넌트의 렌더링 및 동작에 영향을 주는 옵션인 **`props`**라는 개념이 있습니다. 이 중, 일부는 필수이고 일부는 선택 사항입니다. 따라서, 컴포넌트의 바닐라 버전이 어떻게 보이는지 파악하려면 **각 컴포넌트에서 필수적인 요소만을 갖는 `"default"` 스토리를 갖는 것이 좋습니다.** 필수 `prop`에 대해선 **가능한 한 가장 단순한 값**으로 채워야 좋습니다.

이렇게 하면, 해당 컴포넌트의 가장 기본적인 형태를 인지하고 있으므로 **컴포넌트 구현을 보다 더 예측 가능하게 만들 수 있습니다.** 또한 `"default"` 스토리는 **다른 모든 스토리와의 비교점을 확인할 수 있어, 각 `props` 가 어떤 작업을 수행하는 지 확인하기 쉽습니다.** 마지막으로 `"default"` 스토리는 기본 구현이 변경되는 것을 확인할 수 있어, **디버그나 향상에 매우 유용합니다.**

# 다른 곳은 어떻게 하고 있나요

---

![Shopify Polaris의 Banner 컴포넌트 문서화](/images/posts/storybook-docs/docs-example-shopify.mp4)

다른 디자인 시스템의 예시를 확인하고 싶어서 대표적인 디자인시스템으로 [**Shopify Polaris**](https://polaris.shopify.com/)를 찾아봤습니다.

우선 들어가자마자 인상적이었던 부분은 좌측 리스트에서 **컴포넌트를 분류하는 방식**이었습니다. 확실히, **컴포넌트 종류가 많으니** 일일이 나열하는 것은 **가독성을 떨어트릴 것이고**, 아무리 직관적인 명칭이라고 하더라도 사람에 따라 **컴포넌트명을 통해 적절한 목적의 컴포넌트를 찾는 것**은 어려울 수도 있습니다.

그렇기 때문에, **큰 카테고리를 통해 이를 분류하여 원하는 컴포넌트를 찾기 위해 1차적으로 검수할 수 있다는 부분**이 정말 좋았던 것 같습니다.

![우수 예시](/images/posts/storybook-docs/docs-example-good1.png)
![가이드라인](/images/posts/storybook-docs/docs-example-good2.png)

**우수 예시**와 **가이드라인**을 제시하는 것 또한 중요하다고 생각했습니다. 실제 컴포넌트를 사용하는 사람은 해당 컴포넌트를 제작한 사람보다 **그 컴포넌트의 제작 이유나 활용 방식등에 대한 이해도가 떨어집니다.** 이를 실제로 활용할 때, 어떤 방식으로 활용하는 것이 좋은지에 대한 서술이 그러한 문제점을 해결할 수 있는 방안이 될 것 같습니다. 물론 이것은 디자인 시스템의 목적이 다르기에(쇼피파이의 경우 타겟이 다르다) 그럴 수도 있습니다.

느낀점을 간단히 정리하면 다음과 같습니다.

- 컴포넌트를 탐색할 때 사용할 수 있는 기준으로 **대분류를 만드는 것을 고려하자.**
- 컴포넌트를 사용할 때, 이런 방식으로 사용하면 좋을 것 같다는 **우수 사례를 제시하자.**
- 컴포넌트를 사용할 때, **내부 콘텐츠**는 어떤 방식으로 작성하면 좋을 지에 대한 내용 또한 기재하면 좋다.
- **웹 접근성에 대한 지원**을 한다면 이에 대한 내용도 자세히 기재하자.

# 마무리

---

![문서화 정말 귀찮습니다](/images/posts/storybook-docs/hate_work.jpeg)

그럼에도 문서화는 정말 귀찮은 작업인건 사실입니다. 솔직히 말하면, 문서화 같은거 그냥 쓰는 사람이 알잘딱깔센으로 이해하고 활용하면 되는거 아닌가라고도 생각하게 됩니다. 그럼에도 불구하고, 문서화를 철저하게 잘 해야 하는 이유는 **멀쩡하게 컴포넌트 만들어 놓고, 컴포넌트 사용할 때마다 사람이 고생하는 그림**을 만들지 않기 위해서인가 싶기도 합니다. 쓰는 사람 편하라고 만들어놨는데, 쓸때마다 불편하면 만드는 이유가 퇴색되지 않을까요.

그리고 이번 학습을 통해, **노션 임베드를 통한 디자인 시스템 내용 공유**에 대한 부분을 새롭게 알게 되어 좋았습니다. 디자인 시스템을 제작하면서 개발팀 내에서 PR 리뷰 등의 과정을 거쳤는데요, 이러한 공유 시스템을 활용하여 **제작 이후 디자인팀과의 별도의 QA 작업을 진행할 수 있겠다는 생각**이 들었습니다. 당장 활용이 가능한 시기는 이번 스프린트가 끝나고 회고를 진행할 때 결과 공유를 위한 기능으로 활용할 수 있을 것 같네요.

### 참고

---

- [스토리북 : 이해관계자를 위한 문서](https://storybook.js.org/tutorials/design-systems-for-developers/react/ko/document/)
- [깃허브 : `@storybook/addon-docs`](https://github.com/storybookjs/storybook/blob/next/addons/docs/docs/docspage.md)
- [4 ways to document your design system with Storybook](https://storybook.js.org/blog/4-ways-to-document-your-design-system-with-storybook/)
- [How I manage to make my Storybook project the most efficient possible](https://dev.to/loicgoyet/how-i-manage-to-make-my-storybook-project-the-most-efficient-possible-2d8o)
