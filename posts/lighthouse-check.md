---
title: 라이트하우스를 통한 웹 페이지 품질 개선
date: '2022-09-25'
description: 개발자 도구로 간편하게 성능을 측정하고 개선하는 방법
tags: ['라이트하우스', '크롬', '성능 개선', '웹']
thumbnail: 'thumbnail.jpg'
---

# 라이트하우스란

---

[**라이트하우스**](https://en.wikipedia.org/wiki/Google_Lighthouse)는 **구글**에서 제공하는 **웹 사이트 성능 검사 서비스**로서 개발자가 사이트의 사용자 경험을 개선할 수 있는 기회와 진단을 제공합니다. 라이트하우스는 다양한 방법(크롬 개발자 도구, `npm` 또는 [브라우저 확장 프로그램](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk))을 통해 활용할 수 있는데 저는 **개발자 도구**를 통해 이를 활용했습니다. 참고로 `npm` 방식은 다음 명령어를 통해 활용할 수 있습니다.

```sh
npm install -g lighthouse
lighthouse https://www.example.com --view
```

아무튼 저는 개발자 도구를 활용할 예정이기에 개발자 도구를 켜고 라이트하우스 탭으로 넘어가 처음 측정을 진행했습니다.

![이 정도면 괜찮은건가?](/images/posts/lighthouse-check/first_check.png)

제 페이지 성능을 처음으로 측정해보니 뭔가 신기한데요, 보시다시피 라이트하우스에서는 다음의 **5가지 기준**으로 결과를 보여줍니다. 그리고 보이는 것처럼 해당 부분의 요약된 점수를 보여주는데요 해당 점수들은 **변동성**을 가지며 이는 라이트하우스 때문이 아닌 **기본 조건의 변화** 때문이라고 합니다.

> 이에 대한 자세한 내용은 [가변성에 대한 라이트하우스 문서](https://github.com/GoogleChrome/lighthouse/blob/master/docs/variability.md)을 참고하면 좋습니다.

또한 성능 점수마다 **가중치**가 부여되어, 가중치가 높은 메트릭이 전체 성능 점수에 큰 영향을 미친다고 합니다. 그렇기에 영향을 많이 주는 요소부터 처리하면 더욱 드라마틱한 변화를 확인할 수 있겠죠? 판단 기준이나 가중치에 대한 자세한 내용은 참고 링크의 [구글 라이트하우스](https://web.dev/lighthouse-performance/)를 참고해주세요.

자 그럼 저의 라이트하우스 점수 개선 과정으로 들어가보겠습니다.

# 성능 점수를 개선해보자

---

![내 꿈을](/images/posts/lighthouse-check/start_work.jpeg)

위에서 말했듯이 라이트하우스에선 **성능 개선을 위한 방안**들을 과제처럼 제시해줍니다. 그래서 라이트하우스 체크를 진행하게 되면 다음과 같은 화면을 볼 수 있습니다.

![빨간불 투성이다](/images/posts/lighthouse-check/opportunities.png)

그리고 각 탭을 누르면 해당 제안에 대한 내용을 간략하게 설명해두었으며, 참고할 수 있는 [구글 Web Dev](https://web.dev/) 링크를 함께 제공합니다. 각 링크를 참고하면서 차근차근 하나씩 해결하면 됩니다 정말 쉽죠?

## 애니메이션 콘텐츠는 비디오 포맷을 사용하자

---

성능 향상에 가장 큰 기여를 할 것이라고 예측된 부분입니다. 구글은 GIF 대신 비디오 포맷을 사용해야 하는 이유를 다음과 같이 설명하고 있습니다.

> **Large GIFs are inefficient for delivering animated content.** By converting large GIFs to videos, you can save big on users' bandwidth.

요약하자면 **GIF 형태의 파일은 애니메이션 콘텐츠를 보여주기에 비효율적**이며 **애니메이션 콘텐츠를 보여주고자 할 때**에는 MPEG4/WebM와 같은 **비디오 포맷을 사용하라**는 말입니다.

안타깝게도 아직 `gif` 확장자를 바로 비디오 포맷으로 변경해주는 것은 없다고 판단되어, 일괄적으로 제가 갖고 있었던 `gif` 파일들을 전부 `mp4` 형태로 수정해주었습니다. 다행히도 그렇게 많은 파일을 보유하고 있지는 않아 공수가 엄청 크진 않았던 것 같습니다.

추가적으로 기존에 썸네일이 사용되는 컴포넌트들을 공통화 하여 확장자가 `mp4` 인지 여부를 분기로 갖는 `Thumbnail` 를 만들어 `src` 를 통해 이미지 콘텐츠 혹은 비디오 콘텐츠를 렌더링 하는 컴포넌트로 일괄 교체하였습니다.

```tsx
type ThumbnailExtendTypes = ImageProps & HTMLAttributes<HTMLVideoElement>

interface ThumbnailProps extends ThumbnailExtendTypes {
  src: string
  alt?: string
}

const Thumbnail = ({ src, alt, ...restProps }: ThumbnailProps) => {
  const isMp4 = useMemo(
    () => validFileExtension(src, EXTENSION.MP4),
    [validFileExtension, src]
  )

  if (isMp4)
    return (
      <ThumbnailVideo autoPlay loop muted playsInline {...restProps}>
        <source src={src} type='video/mp4' />
      </ThumbnailVideo>
    )

  return <ThumbnailImage src={src} alt={alt} loading='eager' {...restProps} />
}

export default Thumbnail
```

내려받는 props 타입으로는 **Next의 Image 컴포넌트 prop 타입**과 **`video` 태그의 기본 prop**을 유니온 형태로 사용하였습니다. 또한, Next의 Image 컴포넌트의 Static Import 방식을 사용하지 않기에 이를 명시하고자 `src` 타입을 오버라이드 해주었습니다.

그리고 비디오 타입의 파일을 렌더링 할 때, 해당 [Web Dev](https://web.dev/efficient-animated-content/)에서 제시한 방식을 활용하여 조건에 일치할 경우 이를 반환하도록 하였습니다.

```html
<video autoplay loop muted playsinline>
  <source src="my-animation.webm" type="video/webm" />
  <source src="my-animation.mp4" type="video/mp4" />
</video>
```

성능 저하에 가장 많은 부분을 차지하고 있었던 부분이라 그런지 해당 수정을 통해 큰 폭의 변화를 경험할 수 있었습니다.

## 웹 폰트 로드 중 텍스트가 계속 표시되도록 하기

---

저는 폰트 스타일이나 아이콘을 활용하기 위해 **웹 폰트**를 사용하고 있었는데, **일부 브라우저에서 글꼴이 로드될 때 텍스트를 숨기며 플래시(FOIT)를 일으킨다**고 합니다. 라이트하우스는 이를 지양하며 텍스트가 보이도록 추가적인 방안을 제시해줍니다.

방안 중 하나는 웹 폰트 로드 시 `font-display` 값을 다음과 같이 `swap` 으로 변경하는 것입니다.

```css
@font-face {
    ...
    font-display: swap;
}
```

이는 **해당 텍스트가 시스템 폰트를 사용하여 즉시 표시되어야 한다**는 것을 의미하며, 정의된 폰트가 로드되기 전까지 시스템 폰트로 대체하여 화면에 보여주도록 합니다. 저는 구글 폰트와 Material Icons를 사용하고 있기에 `url` 마지막에 `display=swap` 을 추가하는 것으로 해결하였습니다.

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
/>
```

## 너무 많은 지연 요청이 성능에 주는 영향

---

우리는 필요한 시점에 로딩하기 위해 **지연 로딩**과 같은 기능들을 활용합니다. 이를 활용하면 실제료 뷰에 존재하지 않는 데이터는 추후에 로딩하는 것으로 처리하여 불필요한 콘텐츠 로드를 방지할 수 있죠. **Next.js**에서도 해당 부분을 **`Image` 컴포넌트의 `loading` prop**을 통해 제공하고 있으며, 이는 기본 값 `lazy` 를 통해 반영됩니다.

```tsx
import Image from 'next/image'

<Image loading="lazy" ... />
```

하지만 이를 과도하게 사용한다면 **오히려 성능 저하를 야기한다**고 합니다. 이에 대한 [해당 연구](https://web.dev/lcp-lazy-loading/?utm_source=lighthouse&utm_medium=devtools)를 간단하게 요약해보면 LCP를 기준으로 지연 로딩은 성능에 악영향을 주지만, 자체만으로 문제가 되는 것은 아니라는 것 같습니다. 자세한 내용은 해당 연구 내용을 통해 확인해주시면 감사하겠습니다.

실제로 제가 마주한 문제 상황의 경우 다음과 같았습니다.

![대충 LCP Image가 지연 로드되고 있다는 뜻](/images/posts/lighthouse-check/lazy-load-error.png)

그럼 **초기 렌더링에서 보이지 않는 이미지들만 지연 로딩**을 한다면 해결될 것 같아 해당 분기를 작성하고자 했습니다. 앞에서 말했듯이 Next.js에서는 `Image` 컴포넌트의 `loading` prop을 통해 이를 관리할 수 있으며 **`eager`** 값을 할당하면 이미지 즉시 로드를 진행할 수 있습니다.

```tsx
const PostItem = ({ id, title, description, date, thumbnail, index }: Post) => {
  const isLazyload = index >= 2;

  ...

      <PostItemThumbnail
        loading={isLazyload ? "lazy" : "eager"}
      />

  ...

}
```

일단 포스팅 리스트에 나타나는 아이템들부터 해결하고자 했습니다. 포스팅 리스트에서 대개 LCP Image에 해당하는 부분은 주로 **전체 포스팅 영역**에 해당합니다. 그리고 전체 포스팅은 반응형을 고려하더라도 최대 2가지 이상의 포스팅이 뷰포트에 위치하는 일은 없기에 **포스팅 순서를 기준으로 2번째 이후의 콘텐츠들만 지연 로딩하기로 결정**하고 위와 같이 **`index` 값**을 넘겨받아 분기를 작성하였습니다.

```tsx
<PostDetailThumbnail loading='eager' />
```

포스팅 상세의 경우 무조건 썸네일이 초기 렌더링 뷰포트에 위치하기 때문에 해당 부분에는 바로 `loading="eager"` 를 할당해주었습니다.

```tsx
<CategoryBannerThumbnail loading='eager' />
```

마지막으로 이미지가 나타나는 카테고리 페이지의 경우 LCP Image에 해당하는 카테고리 배너 이미지를 즉시 로드 방식으로 변경하여 이를 해결하였습니다.

이렇게 일괄적으로 반영한 뒤 다시금 성능 체크를 진행하였을 때, 해당 오류가 사라지게되면서 성능 지표가 상승한 결과를 확인할 수 있었습니다.

## 누적 레이아웃 이동 최적화

---

이번에 마주한 문제 영역은 다음과 같습니다.

![이미지가 명확한 `width` 와 `height` 값을 갖고 있지 않다](/images/posts/lighthouse-check/explicit_layout.png)

명확한 `width` 값과 `height` 값이 없다는 것은 무엇을 의미하며 어떤 문제를 야기할 수 있을까요? 글을 읽다가 요소의 위치 전환 때문에 해당 부분을 다시 찾아야한다는 생각을 한다면 매우 주의가 산만하다고 생각할 것입니다.

이를 측정하기 위한 지표로서 구글에선 [**CLS**](https://web.dev/cls)라는 지표를 기준으로 레이아웃 이동에 대한 점수를 합산하여 불안정성을 측정합니다. 크기가 정해지지 않은 이미지는 이러한 부분에 감점이 되는 요소가 될 수 있는 것이죠. 감점이 되는 이유는 **이미지 로드 전 페이지에 충분한 공간이 할당되었는지를 확인하기 위한 지표**로서 명시적인 `width` 와 `height` 를 사용해야하기 때문입니다.

그러나 Next.js의 `Image` 컴포넌트의 경우 CSS 수정에 어려움이 있었습니다. 명시적인 `width` 와 `height` 값이 필수이며 다소 어려운 방식으로 레이아웃 설정을 진행하는 특성 때문에 이를 반영하기 어려운 구조의 컴포넌트였죠. 그래서 저는 [**`next/future/image`**](https://nextjs.org/docs/api-reference/next/future/image) 를 통해 이를 해결하고자 했습니다.

```tsx
import Image from 'next/future/image'
```

**`next/future/image`** 는 기존 `next/image` 의 특성을 가져오며 활용 방식은 기본 `<img>` 태그와 가까운 **보다 더 시맨틱한 컴포넌트**입니다. 이를 활용하면 기존의 제한적인 CSS 적용 부분도 원활하게 해결할 수 있어 기존 `Thumbnail` 컴포넌트에 사용되던 `Image` 컴포넌트를 `next/future/image` 컴포넌트로 변경을 진행했습니다. 그리고 명시적으로 각 활용 영역 부분에 `width` 값과 `height` 값을 할당함으로서 성능 문제와 디자인 반영 문제를 동시에 해결할 수 있었습니다.

> 누적 레이아웃 이슈에 대해 보다 더 자세한 내용을 알고 싶으시다면 [다음 링크](https://web.dev/lcp-lazy-loading/?utm_source=lighthouse&utm_medium=devtools)를 참고해주세요

## 웹 접근성

---

![여기까지 했는데 지치셨나요?](/images/posts/lighthouse-check/i_am_not_tired.png)

여기까지 했으니 성능 점수는 어느 정도 많이 개선되었으니 이제 **웹 접근성** 관련 점수를 올려봅시다. 웹 접근성이란 간단하게 말하자면 **누구든 사용가능한 웹을 지향하는 것**이라고 할 수 있습니다. 그렇기 때문에 불가피한 상황을 대비하기 위해 보다 더 **메타 데이터**에 대한 내용을 추가하는 것이 중요합니다.

웹 접근성 개선 내역은 많지 않아 간단하게 리스트로 정리하겠습니다.

- `alt` prop 추가
- `meta` 태그 추가 및 페이지 설명 추가

# 그래서 결과는?

---

![와우 ! 데박사꼰 ! 🎉](/images/posts/lighthouse-check/final_result.png)

보시다시피 정말로 만족스러운 결과를 얻을 수 있었습니다. 사실 다이나믹한 기능이 들어간 웹 페이지가 아니기에 점수 개선이 크게 어렵진 않았지만 이렇게 한 번 수정하면서 좋은 점수를 받게 되니 기분이 좋은 건 사실이네요. 메인 페이지 기준으로 이런 점수를 얻은 것이긴 하지만 아무렴 어떱니까!

참고로 접근성 영역에서 2점 감점이 있는데, 이 부분은 CSS 내용 중 색 대조에 대한 부분으로 이 부분은 점수를 낮추더라도 포기할 수 없는 부분이었기에 너그러운 마음으로 용인하고자 했습니다.

> 2점 감점 = 인간미

# 마무리

---

이전에 라이트하우스와 관련된 포스팅을 접하고 주변 동료분께서 자주 언급하셨던 내용이라 언젠가는 이를 학습해보고자 하는 마음이 있었는데, 블로그 점수를 개선하면서 그리고 해당 포스팅을 작성하던 와중에도 이와 관련된 내용들을 많이 찾아보면서 많은 지식을 얻은 것 같아 보람차다고 말씀드릴 수 있을 것 같습니다.

앞에서 봤듯이 라이트하우스 측정을 진행하게 되면 구글 측에서 제시해주는 몇 가지 사항들에 대해 이행하기만 하면 점수가 즉각적으로 반영되는 것이 생각보다 많은 성취감을 주는 것 같아 개인적으로도 만족감이 큰 학습 내용이었던 것 같습니다. 물론 블로그 성능 개선가지고는 큰 문제를 해결했다고 볼 순 없지만 일단 작은 것부터 시작하자는 마음으로 각자의 블로그 성능 개선을 진행해보는건 어떨까요?

> 만약 없다면 만드는 것도 추천드립니다 :)

그럼 여기서 포스팅 마치도록 하겠습니다.

### 참고

---

- [구글 라이트하우스](https://web.dev/lighthouse-performance/)
