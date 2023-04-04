---
title: 컴포넌트를 설계하는 다양한 방법
date: '2022-07-31'
description: 여러가지 리액트 디자인 패턴에 대해서 알아보고 응용하기
tags: ['리액트', '디자인 패턴', '컴포넌트']
thumbnail: 'thumbnail.jpg'
---

# 디자인 패턴이란

---

우선 간단히 **디자인 패턴의 정의**에 대해 알아보도록 하겠습니다.

> **소프트웨어 디자인 패턴(software design pattern)은** 소프트웨어 공학 내 소프트웨어 디자인의 특정 문맥에서 공통적으로 발생하는 문제에 대해 재사용 가능한 해결책이다. 소스나 기계 코드로 바로 전환될수 있는 완성된 디자인은 아니며, 다른 상황에 맞게 사용될 수 있는 문제들을 해결하는데에 쓰이는 서술이나 템플릿이다.
>
> [소프트웨어 디자인 패턴 - 위키백과](https://ko.wikipedia.org/wiki/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%EB%94%94%EC%9E%90%EC%9D%B8_%ED%8C%A8%ED%84%B4)

앞의 정의는 소프트웨어 공학에서 **디자인 패턴**의 정의입니다. 위 정의를 보면 **특정 문맥에서 공통적으로 발생하는 문제에 대한 재사용 가능한 해결책**이라는 말이 있는데, 이 부분이 **리액트의 컴포넌트 재사용성**과 일맥상통 하는 것 같이 보입니다. 그렇기에 리액트 내에서 보다 더 좋은 디자인 패턴을 통해 컴포넌트 제작에 있어서도 그 퀄리티를 높여 재사용에 용이하게 만들 수 있을 것 같습니다.

리액트 생태계는 굉장히 크기 때문에 당연히도 다양한 디자인 패턴들이 있고 그 중 몇 가지를 학습해서 이를 다시 한 번 포스팅을 하면서 정리해보고자 합니다. 다양한 디자인 패턴에 대해서 알고 싶으시다면 [해당 링크](https://www.patterns.dev/posts/#design-patterns)를 참고해보시면 좋을 것 같습니다.

# The higher-order component pattern

---

**고차 컴포넌트**라고 불리는 해당 패턴은 **애플리케이션 전체에서 컴포넌트 로직을 재사용하는데 사용**되는 고급 리액트 패턴입니다. 컴포넌트는 데이터인 props를 UI로 변환하는 반면, 고차 컴포넌트는 **컴포넌트를 새로운 컴포넌트로 변환**합니다. 이렇게 들으면 굉장히 복잡한 개념 같기에 예시를 통해 간단히 알아보겠습니다.

데이터를 가져오기 전에 로딩 화면을 보여주고 싶다고 가정했을 때, 다음의 `withLoader` 와 같은 고차 컴포넌트를 만들 수 있습니다.

```tsx
import React, { useEffect, useState } from 'react'

export default function withLoader(Element, url) {
  return (props) => {
    const [data, setData] = useState(null)

    useEffect(() => {
      async function getData() {
        const res = await fetch(url)
        const data = await res.json()
        setData(data)
      }

      getData()
    }, [])

    if (!data) {
      return <div>Loading...</div>
    }

    return <Element {...props} data={data} />
  }
}
```

`withLoader` 는 `data` 라는 상태 값을 통해 요청에 대한 데이터를 받기 전까지 `Loading...` 이라는 텍스트를 화면에 반영하도록 되어 있습니다. 이렇게 고차 컴포넌트를 활용한다면 반복적으로 작성해야할 로직들을 공유할 수 있습니다. 고차 함수 컴포넌트를 간단하게 정리하면 다음과 같습니다.

- 애플리케이션 전체에서 컴포넌트 로직을 재사용하는데 사용되는 고급 리액트 패턴
- 구체적으로 **컴포넌트를 가져와 새 컴포넌트를 반환**하는 함수
- 입력된 컴포넌트를 수정하지 않고, 상속을 사용하여 동작을 복사하지도 않음
- 사이드 이펙트가 전혀 없는 **순수 함수**

# The provider pattern

---

리액트가 [**단방향 데이터 흐름**](https://ko.reactjs.org/docs/thinking-in-react.html)을 갖고 있다는 것은 다들 아시는 사실일 것입니다. 그렇기에 종종 컴포넌트 트리 내에서 최종 컴포넌트에 데이터가 도달하기 위해 다음과 같이 **중간 컴포넌트에서 불필요한 prop 전달이 발생**하기도 합니다.

![출처 : Patterns](/images/posts/react-patterns/prop_drilling.mp4)

이러한 문제를 **_prop drilling_** 이라고 하며, 이 문제를 해결하기 위해 해당 디자인 패턴을 사용할 수 있습니다. 리액트에서는 [Context API](https://ko.reactjs.org/docs/context.html)를 활용하여 Provider pattern을 구현할 수 있습니다. 다음 예시와 함께 이해해보도록 하겠습니다.

```tsx
const ThemeContext = React.createContext('light')

class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value='dark'>
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext
  render() {
    return <Button theme={this.context} />
  }
}
```

원래 `App` 컴포넌트에서 `ThemedButton` 까지 prop이 전달되기 위해 `Toolbar` 컴포넌트를 거쳐 prop drilling이 발생해야 하는 상황이지만, `context`를 통해 테마 값을 전달받기 때문에 이를 방지할 수 있었습니다.

이런 부분에서 prop 대신 `context` 만을 사용하는 것이 전적으로 좋아보이기도 하지만, `context`를 사용하면 **컴포넌트 재사용에 어려움을 주므로** 이를 필요할 때 적절하게 사용하는 것이 중요합니다. 이를 대체할 수 있는 방법으로 [컴포넌트 합성](https://ko.reactjs.org/docs/composition-vs-inheritance.html)에 대한 내용도 참고해보시길 바랍니다.

Provider pattern을 간단히 정리하면 다음과 같습니다.

- **컴포넌트 트리의 여러 컴포넌트에서 전역 데이터를 공유**하는데 사용되는 고급 패턴
- 리액트에서는 **Context API**를 통해 구현할 수 있다.
- **prop drilling** 문제를 해결하기 위해 사용한다.
  - 즉, prop drilling 없이 컴포넌트 트리 내에서 데이터 공유가 가능하다.
- 현재 context 값을 구독하기 위한 useContext Hook도 존재

# The compound components pattern

---

우리는 컴포넌트 개발을 하면서 종종 서로 상태와 로직을 공유하고 이를 통해 의존하는 관계를 갖는 컴포넌트를 개발하기도 합니다. 주로 **`select` 태그나 드롭다운 컴포넌트 혹은 메뉴 컴포넌트**와 같은 것들이 그렇겠죠. 이런 경우에 공유와 의존을 처리하기 위한 간단하고 효율적인 컨테이너 패턴이 **Compound components pattern**입니다. 이 역시도 `context` 혹은 `React.cloneElement` 를 통해 구현할 수 있습니다.

간단한 예시를 통해 짧게 분석해보겠습니다.

```tsx
function App() {
  return (
    <Toggle onToggle={(on) => console.log(on)}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}
```

위 예시를 보면 **점(`.`) 표현법**을 통해 참조하여 컴포넌트를 활용하는 것을 확인할 수 있습니다. 데이터를 전달하여 정해진 컴포넌트 형태를 렌더링 하는 것보다 **더 자율성이 부여된 상태에서 컴포넌트 디자인을 할 수 있을 것 같습니다.** 또한 여러 상황을 정의하는 것도 용이할 것 같네요. 위 `Toggle` 컴포넌트는 다음과 같이 설계되어 있습니다.

```tsx
import * as React from 'react'
// this switch implements a checkbox input and is not relevant for this example
import { Switch } from '../switch'

const ToggleContext = React.createContext()

function useEffectAfterMount(cb, dependencies) {
  const justMounted = React.useRef(true)
  React.useEffect(() => {
    if (!justMounted.current) {
      return cb()
    }
    justMounted.current = false
  }, dependencies)
}

function Toggle(props) {
  const [on, setOn] = React.useState(false)
  const toggle = React.useCallback(() => setOn((oldOn) => !oldOn), [])
  useEffectAfterMount(() => {
    props.onToggle(on)
  }, [on])
  const value = React.useMemo(() => ({ on, toggle }), [on])
  return (
    <ToggleContext.Provider value={value}>
      {props.children}
    </ToggleContext.Provider>
  )
}

function useToggleContext() {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`
    )
  }
  return context
}

function On({ children }) {
  const { on } = useToggleContext()
  return on ? children : null
}

function Off({ children }) {
  const { on } = useToggleContext()
  return on ? null : children
}

function Button(props) {
  const { on, toggle } = useToggleContext()
  return <Switch on={on} onClick={toggle} {...props} />
}

// for convenience, but totally not required...
Toggle.On = On
Toggle.Off = Off
Toggle.Button = Button
```

간략하게 설명하자면, `ToggleContext` 를 통해 전역 상태 값을 관리하고 이를 **`Provider` 를 통해 컨테이너 내 컴포넌트들에게 전달**합니다. 그리고 토글을 구성하는 **각 컴포넌트(`On`, `Off`, `Button`)를 점 표기법을 통해 `Toggle` 컴포넌트에 할당**하여 컨테이너 내에서 활용하도록 합니다.

앞에서 말했듯이 좀더 유연한 컴포넌트 사용이 가능하여 다양한 상황을 연출할 수 있다는 점이 장점이지만 단점으로는 많은 자율성 때문에 예상치 못한 **사이드 이펙트가 발생**하거나, **디자이너나 제작한 개발자의 의도가 제대로 전달되지 않기도 합니다.** 그렇기에 이 또한 적절한 상황에서 사용하는 것이 좋습니다. 요약은 다음과 같습니다.

- 여러 컴포넌트가 상태를 공유하고 로직을 처리할 수 있는 간단하고 효율적인 방법을 제공하는 고급 리액트 컨테이너 패턴
- Context API 혹은 `React.cloneElement` 를 통해 구현 가능
- [점 표기법](https://ko.reactjs.org/docs/jsx-in-depth.html#using-dot-notation-for-jsx-type)을 사용하여 하나의 컴포넌트에서 새로운 컴포넌트를 만들어 포함시킬 수 있음

# The Hooks pattern

---

리액트 16.8 버전에서 업데이트 된 **Hooks**는 이젠 대부분의 사람들에게 익숙해진 패턴입니다. 기존에 클래스 컴포넌트에서만 가능했던 생명주기 관련 메서드를 구현할 수 있기 때문에 함수형 컴포넌트로 전환할 수 있게 된 패턴이라고도 할 수 있습니다.

기본적인 내장 훅(`useState`, `useEffect` 등) 외에도 **커스텀 훅**을 통해 **특정 이벤트 핸들러 로직을 재사용 가능하게 만들거나 뷰와 로직 부분을 분리**할 수도 있습니다. 이어지는 [VAC Pattern](#VAC-pattern)에서 이를 자세히 알아보겠습니다.

- 함수형 컴포넌트에서 생명주기 관련 로직을 활용하기 위한 기능
- 클래스형 컴포넌트를 보다 더 깔끔하게 리팩토링 가능

# VAC pattern

---

협업을 진행하면서 우리는 주로 **Git**을 통해 변경사항을 추적하고 작업 사항을 조율합니다. 그렇기 때문에, 작업 영역이 중복되는 경우 **`conflict` 를 해결해야 하는 경우**가 있고 **불가피하게 작업 영역이 겹치는 경우** 또한 종종 존재합니다. 대규모의 기업에서는 이를 원활하게 관리하기 위해 FE 개발을 **UI 개발과 인터랙션 및 기능 개발 영역으로 구분**하여 작업하고자 했습니다.

좀 더 구체적으로 알아봅시다. 리액트로 개발을 하다보면 JSX를 통해 **자바스크립트와 마크업이 혼합된 형태의 결과물**이 나오는데 이를 각 영역(UI와 기능 개발)에서 작업을 진행할 때 영역이 중복되는 경우가 생깁니다. 아래의 코드를 통해 해당 상황을 간단히 알아보겠습니다.

```tsx
const Component = () => {

  ...

  return (
    <div>
      <button className='button1' onClick={firstHandler}>hello world</button>
      <button className='button2' onClick={secondHandler}>hello world</button>
      <div>hello world</div>
    </div>
  );
};
```

예를 들어 위와 같이 작성된 코드에서 `button` 에 **전달된 prop들의 내용을 변경하는 작업**과 **각 `button` 의 위치를 바꾸는 등의 작업**이 있다고 생각해봅시다. 만약 해당 작업을 동시에 진행하여 병합을 진행하고자 할 때, Git은 이를 `conflict` 로 간주하고 수정을 요구할 것이며 이런 병합 작업은 **작업량에 따라 기하급수적으로 늘 수도 있으며** 우리는 어플리케이션 내 모든 코드를 파악할 수 없기 때문에 **병합 작업으로 인한 피로도 또한 상당**할 것입니다. 우리는 이를 위 **VAC 패턴**으로 해결할 수 있습니다.

VAC는 **View Asset Component**의 약자로 **렌더링에 필요한 JSX와 스타일을 관리하는 컴포넌트**를 의미합니다. VAC 패턴은 이러한 VAC에 **추상화 된 props object를 전달하는 방식**을 의미합니다.

```tsx
// View Component
const SpinBox = () => {
  const [value, setValue] = useState(0)

  const props = {
    value,
    onDecrease: () => setValue(value - 1),
    onIncrease: () => setValue(value + 1)
  }

  // JSX를 VAC로 교체
  return <SpinBoxView {...props} />
}
```

위 예시에서 `SpinBoxView` 라는 VAC에 객체 형태의 `props` 가 전달되는 형태입니다. 이렇게 되면 UI 변경사항에 대해서는 `SpinBoxView` 컴포넌트 내에서 작업을 진행하고 기능 개발에 대한 사항은 전달하는 `props` 객체를 수정하는 것으로 분리될 수 있습니다. 이런 객체 형태의 prop 전달 방식은 커스텀 훅에서도 유용하게 사용할 수 있습니다.

```tsx
// Custom hook
const useSpinBox = () => {
  const [value, setValue] = useState(0)

  const props = {
    value,
    onDecrease: () => setValue(value - 1),
    onIncrease: () => setValue(value + 1)
  }

  return { props }
}
```

```tsx
// View Component
const SpinBox = () => {
  const { props } = useSpinBox()

  // JSX를 VAC로 교체
  return <SpinBoxView {...props} />
}
```

개인적으로 작업을 진행하면서 커스텀 훅 내 `return` 영역에서의 객체 형태 반환과 호출 영역에서의 구조 분해 할당에서 **필드가 많아지게 되는 경우**가 종종 있었습니다. 만약 반환할 필요가 없어진 필드가 존재할 때엔 이를 지우지 않고 **불필요한 필드를 그대로 반환하는 경우**가 다수 존재했습니다. 또한 객체 반환값과 구조 분해 할당 영역의 길이가 길어지는 것도 코드 분석에 피로감을 주기도 했던 것 같습니다.

```tsx
const useSpinBox = () => {
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  const firstHandler = {

  };

  const secondHandler = {

  };

  const thirdHandler = {

  };

  ...

  // 예를 들어 각 handler 함수로 분리되어 setValue가 필요 없어졌을 때,
  // 별도의 lint 에러가 발생하지 않기에 이를 인지하기 어렵다.
  return { firstValue, secondValue, setValue, firstHandler ...  };
};
```

```tsx
const SpinBox = () => {
  const {
    firstValue,
    secondValue,
    firstHandler,
    ...
  } = useSpinBox();
  // 호출 영역이 점점 길어짐

  return <SpinBoxView {...props} />;
};
```

하지만 이를 객체 형태 전달 방식으로 수정하는 것으로 수정하고 나서는 **작성 영역이 길어지는 문제**와 **불필요한 prop을 반환하는 경우**도 상당수 해결되었습니다. 사실 불필요한 prop 반환 문제의 경우 **반환값 타입 지정**을 통해 해결할 수도 있지만 개발 과정에서 이를 일일히 타이핑 하는 작업이 리소스가 크다는 점을 감안한다면 이는 좋은 해결 방안이 될 수 있을 것 같습니다. 또한 컴포넌트에 전달되는 prop으로 묶어서 반환하기에 **추상화에 대한 부담이 줄어드는 부분**도 장점이라면 장점일 것 같습니다.

그러나 VAC의 경우에도 주의할 점은 존재합니다. 올바르게 VAC를 사용하려면 VAC는 **상태나 핸들러를 올바르게 바인딩 할 뿐, 직접적으로 무엇을 하는 지에 대해서 관여하지 않아야 합니다.** 이를 관여하게 되면 명확한 작업 영역의 분리가 되지 않기 때문에 본질을 흐트릴 수 있기 때문입니다.

VAC pattern에 대해 요약하면 다음과 같습니다.

- **Why VAC**
  - 대규모의 기업에서 원활한 협업을 위해 FE 개발을 UI 개발과 인터랙션 및 기능 개발 영역으로 구분
  - 리액트로 개발을 진행하면 JS와 마크업이 혼합된 상태로 결과물이 나오고 이를 각 영역에서 수정하는 과정에서 충돌이 발생
  - View 영역과 로직 영역을 분리할 필요성이 제기
- **What VAC**
  - VAC는 View Asset Component의 약자로 렌더링에 필요한 JSX와 스타일을 관리하는 컴포넌트를 의미
  - JSX를 추상화 한 Props Object를 생성하여 VAC에 전달하는 방식
  - 컨테이너 컴포넌트 영역과 VAC 컴포넌트를 분리하여 협업에 용이하게 작업할 수 있음
  - VAC 속성을 정의하면서 사용하여 렌더링에 직관적인 상태 관리도 가능
- **How VAC**
  - 올바른 VAC는 상태나 핸들러를 올바르게 바인딩 할 뿐, 직접적으로 무엇을 하는 지에 대해서 관여하지 않음

# 마무리

---

지금까지 리액트 컴포넌트 설계를 위한 몇 가지 디자인 패턴에 대해 알아봤습니다. 개인적으로 마지막 VAC Pattern이 실제로 적용하는 과정에서 많은 공감을 느꼈기 때문에 가장 인상 깊었던 디자인 패턴이었던 것 같습니다.

이번 디자인 패턴을 학습하면서 개발 스택을 하나 둘 추가하는 것도 중요하지만 하나의 개발 스택을 활용하는 방식에 대해 꾸준히 연구하는 것도 중요하다는 생각이 들었던 것 같습니다. 더 나은 디자인 패턴이나 방법론 등이 생겨나면 이를 적극적으로 반영해보겠다는 생각을 가지면서 해당 포스팅을 마무리 하겠습니다.

## 참고

- [React 공식 홈페이지 : 고차 컴포넌트 외 다수](https://ko.reactjs.org/)
- [Patterns : Design Patterns](https://www.patterns.dev/posts/#design-patterns)
- [워드프레스 : React에서 View의 렌더링 관심사 분리를 위한 VAC 패턴 소개](https://wit.nts-corp.com/2021/08/11/6461)
