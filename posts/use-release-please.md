---
title: 'release-please를 통해 배포 기록 어썸하게 관리하기'
date: '2022-11-23'
description: '커밋 컨벤션으로 시작해서 CHANGELOG 업데이트 동기화까지'
tags: ['release-please', 'Release', 'Github Action', 'Change log']
thumbnail: 'thumbnail.jpeg'
---

# 개요

---

안녕하세요, 오늘은 저희 **팀 깃 컨벤션 확립**부터 **사내 서비스 및 패키지에 `release-please` 를 적용한 내용**과 이에 대한 **후기**를 작성해보고자 합니다.

다들 서비스 개발이나 특히 사내 라이브러리 개발을 진행하다 보면 배포된 사항에 대해 전사적으로 공유하기 위해 **릴리즈 내용 기록**을 진행한 경험이 있으실거라고 생각합니다. 배포 버전마다 **어떠한 사항이 업데이트 되었으며, 어떤 문제사항들이 수정되어 반영되었는지를 전달**하고 **배포 전후로 변경점이 잘 적용되었는가를 확인**하기 위해 다양한 방법으로 문서화를 진행하곤 하죠. 또한, **롤백**을 진행할 경우, 어느 지점을 기준으로 롤백을 시킬지에 대해 생각하기 위해선 **문제가 존재하는 버전**을 정확히 파악해야 할 것입니다. 저희 사내 프론트엔드 팀에서는 이를 위해 노션에서 별도로 문서화를 진행하며 관리하고 있었습니다.

그러나, 이 과정에서 다소 문제가 있다고 판단되어 다음과 같은 이유로 개편의 필요성을 느끼게 됩니다.

- 브랜치 병합 및 배포 이후, **업데이트 사항을 직접 반영**해야 하기에 다소 불편하다.
- 병합 및 배포 시점을 기준으로 **업데이트 된 사항(새로운 버전의 업데이트 사항)을 추적하는 방식이 비효율적이다.**

또한, 저희 팀은 깃 관련 컨벤션이 확립되지 않았었고 그래서 그런지 **커밋과 PR 이름만으로 변경사항을 추측하기에 어려움이 있었습니다.** 팀원마다 생각하는 커밋 타입의 의미를 다르게 정할 수 있어 **각자 같은 타입의 커밋을 작성하더라도 실제 커밋의 내용은 다소 차이가 있는 결과**를 보여주기도 했습니다. 그래서 **집단의 동의를 통해 정형화 된 커밋 타입과 커밋을 작성하는 방식**이 필요했습니다.

그리고 좋은 레포지토리 손민수 하고자 서핑을 진행하다가, `CHANGELOG` 에 각 배포 버전의 업데이트 내용이 기록된 [Toss의 Slash 라이브러리](https://github.com/toss/slash)를 발견하게 되었고 이와 더불어 [**Conventional Commits 1.0.0**](https://www.conventionalcommits.org/en/v1.0.0/)이라는 컨벤션은 저에게 꽤나 매력적으로 다가왔습니다. 그리고 이와 함께 시너지를 만들 수 있는 패키지인 **`release-please`** 를 저희 서비스에 적용하고자 팀원들의 동의를 구하고 이를 진행했습니다.

# 컨벤셔널 커밋

---

우선 이번 적용 내용의 기본이 되는 **컨벤셔널 커밋**은 **커밋 메시지에 곁들이는 가벼운 컨벤션**으로, 명확한 커밋 히스토리 생성을 위한 간단한 규칙을 제공합니다.

본 컨벤션의 내용 중 [**유의적 버전**](https://semver.org/lang/ko/)과 연관이 있는 부분은 주로 **공유 라이브러리**를 기준으로 되었다고 판단되어 유의적 버전에 대한 내용은 서비스 외 패키지에만 적용하도록 하고, 컨벤셔널 커밋의 작성 방식만을 적용하기로 했습니다.

## 기본 구조

---

컨벤셔널 커밋의 기본 구조는 다음과 같습니다.

```sh
<타입>[적용 범위(선택 사항)]: <설명>

[본문(선택 사항)]

[꼬리말(선택 사항)]
```

또한, 컨벤셔널 커밋의 **구조적 요소**는 다음과 같습니다.

- `fix` : 코드베이스에서 **버그 패치**의 기능을 하는 커밋
- `feat` : 코드베이스에서 **새 기능이 추가**되는 커밋
- `BREAKING CHANGE` / `<type>!` 혹은 `<scope>!` : **단절적 API 변경**이 있다는 것을 의미합니다.
- 이외에도, **다른 타입**들이 허용되며 [**이어지는 `release-please` 과 관련된 내용**](https://www.notion.so/a137090b9bc2407eb22706ac4675d382)에서 확인하실 수 있습니다.

> 자세한 예시는 [**컨벤셔널 커밋 예제**](https://www.conventionalcommits.org/ko/v1.0.0/#%EC%98%88%EC%A0%9C)를 참고바랍니다.

## 추가 타입

---

저희 팀에선 이와 더불어 다음의 타입들을 추가적으로 정의하였습니다.

```json
[
  { "type": "chore", "section": "Others", "hidden": false },
  { "type": "revert", "section": "Reverts", "hidden": false },
  { "type": "feat", "section": "Features", "hidden": false },
  { "type": "fix", "section": "Bug Fixes", "hidden": false },
  { "type": "improvement", "section": "Feature Improvements", "hidden": false },
  { "type": "docs", "section": "Docs", "hidden": false },
  { "type": "style", "section": "Styling", "hidden": false },
  { "type": "refactor", "section": "Code Refactoring", "hidden": false },
  { "type": "perf", "section": "Performance Improvements", "hidden": false },
  { "type": "test", "section": "Tests", "hidden": false },
  { "type": "build", "section": "Build System", "hidden": false },
  { "type": "ci", "section": "CI", "hidden": false },
  { "type": "setting", "section": "Configuration Settings", "hidden": false }
]
```

위 타입들을 포함하여 컨벤셔널 커밋 형식에 맞춰 커밋을 작성하면 개개인별로 개인적인 해석이 추가되는 부분을 차단하여 **팀 전부가 이해할 수 있는 하나의 커밋**이 만들어 질 수 있습니다. 이제 업데이트 로그인 `CHANGELOG` 업데이트 동기화와 관련된 패키지를 알아볼 차례입니다.

# CHANGELOG 업데이트 동기화

---

위 컨벤셔널 커밋을 채택하게 되면서 `CHANGELOG` 파일을 커밋 병합과 동기화 시켜 업데이트 시킬 수 있는 패키지들을 적용할 수 있게 되었습니다. 그 중 두 가지 선택지가 있었는데, 하나는 `standard-version`, 나머지는 `release-please` 입니다.

그 중 저희 팀은 `release-please` 를 채택하기로 했고 그 이유는 각 패키지에 대해 설명하면서 함께 작성하도록 하겠습니다. 그리고 해당 포스팅에선 **패키지의 기본적인 적용**에 중점을 두어 작성하고, 이외 배포 프로세스에서 추가할 수 있는 부가적인 작업들에 대해선 추후에 별도로 포스팅하도록 하겠습니다.

### `standard-version`

---

`standard-version` 은 커밋 메시지를 읽고 커밋 타입 별로 **`CHANGELOG` 파일에 업데이트 사항을 기록**해주며 **`git` 태그를 생성**해주는 기능이 있습니다.

`standard-version` 을 적용하기 위해선 앞에서 언급한 **컨벤셔널 커밋의 형태를 준수**하면서 작성해야 하고, 추가적인 커밋 타입을 정의하기 위해서 `.versionrc` 파일을 추가할 수 있습니다.

일단 다음 명령어로 `standard-version` 을 프로젝트 패키지에 추가합니다.

```sh
yarn add -D standard-version
```

패키지에 추가했으면 `package.json` 에 버전 업데이트를 위한 명령어를 추가합니다.

```json
{
  "scripts": {
    "update": "standard-version"
  }
}
```

해당 명령어는 다음과 같이 활용할 수 있으며, 버전 업데이트를 [**유의적 버전**](https://semver.org/)에 기반하여 진행할 수도 있습니다.

```sh
# initial release
yarn standard-version --first-release

# release command
yarn standard-version # 0.0.1(patch)
yarn standard-version --release-as minor # 0.1.0 (minor)
yarn standard-version --release-as major # 1.0.0 (major)
yarn standard-version --release-as [version-to-release]
```

하지만 해당 패키지 레포지토리를 자세히 살펴보니 다음 문장이 적혀있는 것을 뒤늦게 확인하고 말았습니다.

> **standard-version is deprecated.** If you're a GitHub user, I recommend release-please as an alternative. I encourage folks to fork this repository and, if a fork gets popular, I will link to it in this README.

네, 이해하신대로 **더 이상 해당 패키지는 사용되지 않는다**라고 기재되어 있으며, 테스트 했을 때 정상적으로 작동하긴 했지만 해당 안내를 보고나서 마냥 무시하고 해당 패키지를 사용할 수는 없게 되었습니다. 그 대신 위 안내에서 권장하고 있는 `release-please` 에 대해 찾아보기로 하며 다음 테스트를 진행하고자 했습니다.

### `release-please`

---

[**`release-please`**](https://github.com/googleapis/release-please) 는 구글에서 만든 릴리즈 버전 관리 서비스이며 다음의 역할을 수행합니다.

- **`CHANGELOG`** 를 생성하고 업데이트 합니다.
- **Git Tag**와 **Github Releases**를 생성합니다.

그리고 `release-please` 는 앞에서 잠깐 언급한 **유의적 버전**에 기반하여 **버전을 자동으로 업데이트** 합니다. 유의적 버전을 간단하게 이해해보자면 다음과 같이 버전 업데이트가 진행됩니다.

- `fix:` : **버그 수정**과 같은 내용을 포함하며 유의적 버전의 **PATCH**와 관련이 있습니다.
- `fix:` : **기존 버전과 호환**되는 기능 개발과 같은 내용을 포함하며 유의적 버전의 **MINOR**와 관련이 있습니다.
- `<type>!:` : **기존 버전과 호환되지 않은 변경사항**에 해당하며, 유의적 버전의 **MAJOR**와 관련이 있습니다.

위와 같은 규칙으로 `release-please` 는 각 커밋 로그를 해석하여 버전 업데이트를 진행합니다.

**버전을 명시**해서 특정 버전으로 업데이트 하는 것도 가능합니다. 다음과 같이 멀티라인 커밋에 꼬리말을 추가하여 업데이트 하고자 하는 버전을 명시할 수 있습니다.

```sh
feat(feature-name): Add feature

# Update to x.x.x version
Release-As: x.x.x
```

그리고 `release-please` 는 **Github Actions**을 추가하여 브랜치 병합이 진행되면 자동으로 릴리즈 PR을 작성하도록 할 수 있습니다. 이를 위해선 프로젝트 내 `workflows` 디렉토리에 추가적인 설정을 필요로 합니다.

```yml
# .github/workflows/release-please.yml

name: release-please
on:
  push:
    branches:
      - main # main 브랜치에 병합되었을 때 실행
jobs:
  release-please:
    runs-on: ubuntu-latest # 우분투 최신 버전으로 실행
    steps:
      - uses: google-github-actions/release-please-action@v3
        with:
          release-type: node # 언어 타입 Node
          default-branch: main # 기본 브랜치 main 설정
          # 추가적인 커밋 타입들 설정
          changelog-types: '[{"type": "chore","section": "Others","hidden": false},{"type": "revert","section": "Reverts","hidden": false},{"type": "feat","section": "Features","hidden": false},{"type": "fix","section": "Bug Fixes","hidden": false},{"type": "improvement","section": "Feature Improvements","hidden": false},{"type": "docs","section": "Docs","hidden": false},{"type": "style","section": "Styling","hidden": false},{"type": "refactor","section": "Code Refactoring","hidden": false},{"type": "perf","section": "Performance Improvements","hidden": false},{"type": "test","section": "Tests","hidden": false},{"type": "build","section": "Build System","hidden": false},{"type": "ci","section": "CI","hidden": false},{"type": "setting","section": "Configuration Settings","hidden": false}]'
```

위와 같이 `yml` 파일을 추가하면 **`main` 브랜치에 병합**이 진행되었을 때, **깃허브 액션을 통해 `release-please` 를 실행**시키고 추가적인 커밋 타입들에 따라 **라벨링이 되어 새로운 릴리즈 PR을 생성합니다.**

이렇게 사전 설정이 마무리 한 뒤에 저희는 다음과 같이 PR 프로세스를 정리하였습니다.

# PR 프로세스 정리

---

![프로젝트 브랜치 병합 경로](/images/posts/use-release-please/branch-structure.png)

크게 `main`, `develop`, `feature`, `hotfix` 로 구성되는 저희 프로젝트의 일반적인 병합 경로는 크게 **세 가지**로 구분됩니다.

- `feature` ⇒ `develop`
- `hotfix` ⇒ `main`
- `develop` ⇒ `main`

그리고 위 세 가지 병합 경로는 저희 프로젝트에서 크게 **두 가지의 흐름**으로 구분될 수 있습니다.

- **버전 업데이트 미발생** : develop`⇒`main`
- **버전 업데이트 발생** : 그 외

각 흐름은 다음과 같이 진행될 수 있습니다.

## 버전 업데이트 미발생

---

**버전 업데이트가 발생하지 않는 경우**로 `feature` 에서 `develop` 으로 병합되는 경우가 이에 해당합니다.

### PR 생성

---

![PR 생성시 마주하는 화면](/images/posts/use-release-please/non-change-1.png)

위 단계에서 다음 사항을 준수하여 작성합니다.

- PR 제목은 [컨벤셔널 커밋](https://www.conventionalcommits.org/en/v1.0.0/)에 기반하여 작성합니다.
- 마지막으로 진행한 커밋은 반드시 **기준 브랜치로 `rebase` 를 진행합니다.**
  - 일반 `rebase` 및 인터랙티브 `rebase` 여부는 무관합니다.

![병합 준비가 완료된 상태](/images/posts/use-release-please/non-change-2.png)

빌드 테스트 성공적으로 마무리 되었다면 다음과 같은 화면을 확인하실 수 있습니다.

### 병합 커밋 작성

---

![Squash and merge 버튼을 클릭하면 나타나는 Multi-line commit form](/images/posts/use-release-please/non-change-3.png)

다음 사항을 준수하며 멀티라인 커밋을 작성합니다.

- 병합 버튼을 누르면 위와 같이 커밋을 작성할 수 있는 입력란이 등장합니다.
- 이때, 첫 번째 **커밋의 제목**이 앞에서 의도한 PR 제목과 다르다면 이를 수정하여 반영합니다.
- 이어지는 아래 설명란은 [**컨벤셔널 커밋**](https://www.conventionalcommits.org/en/v1.0.0/)에 기반하여 작성합니다.

### 결과 확인

---

![`develop` 브랜치의 `README.md` 커밋 로그를 보면 반영한 `feat: example` 커밋이 추가된 것을 볼 수 있다](/images/posts/use-release-please/non-change-4.png)

위와 같이 PR이 변경사항이 발생한 커밋에 추가되면 성공입니다.

## 버전 업데이트 발생

---

**버전 업데이트가 발생하는 경우**로 `develop` 과 `hotfix` 에서 `main` 으로 병합되는 경우가 이에 해당합니다.

> 💡 앞의 PR 생성의 경우, 버전 업데이트 미발생의 경우와 동일하게 진행하시면 됩니다.

### 병합 커밋 작성

---

![업데이트 버전을 명시한 릴리즈 커밋](/images/posts/use-release-please/change-1.png)

- 버전 업데이트가 발생하는 경우, 위와 같이 `chore` 타입으로 릴리즈 버전과 함께 커밋 제목을 작성합니다.
- 이어지는 아래 설명란에는 [**컨벤셔널 커밋**](https://www.conventionalcommits.org/en/v1.0.0/)에 기반하여 `main` 브랜치에 병합되는 이전 PR 리스트(PR 커밋들)를 작성합니다.
- 마지막으로, `Release-As: x.x.x` 형태의 명령어를 작성 함으로 업데이트 되는 버전을 명시해줍니다.

### 릴리즈 PR 병합

---

![성공적으로 `main` 에 병합되었다면 다음과 같이 깃허브 액션이 동작하고,](/images/posts/use-release-please/change-2.png)

![깃허브 액션이 성공하면 다음과 같이 새로운 릴리즈 PR PR이 생긴다.](/images/posts/use-release-please/change-3.png)

PR은 방금 깃허브 액션을 동작시킨 PR의 이름과 같습니다.

![`CHANGELOG.md` 파일을 업데이트 시켜줄 PR 생성](/images/posts/use-release-please/change-4.png)

위 PR을 보면 앞에서 추가했던 `feature/example` 커밋을 포함하여 배포 커밋까지 표기된 내용을 확인할 수 있습니다.

- 해당 PR은 `main` 으로 병합되면서 `CHANGELOG` 를 업데이트 합니다.
  - 이때도, 역시 **Squash and merge** 를 진행합니다.

## 결과 확인

---

![배포와 함께 업데이트 된 파일이 마지막 커밋과 함께 반영되었다.](/images/posts/use-release-please/change-5.png)

![`CHANGELOG` 가 업데이트 되었다.](/images/posts/use-release-please/change-6.png)

위와 같이 병합 사항이 반영된 파일에 커밋이 작성되고 `CHANGELOG` 가 업데이트 되었다면 성공입니다.

이렇게 기본적인 깃 컨벤션 확립과 업데이트 로그 동기화를 반영할 수 있었습니다.

# 후기

---

개인적인 소감으로는 **정형화된 프로세스의 확립이 주는 안정감**을 경험하게 되어 좋은 경험이었다는 생각을 했습니다. 해당 포스팅에서는 작성하지 않았지만, 위 컨벤션을 적용하는 과정에서 **기본적인 코드 컨벤션 또한 함께 정립**하였고 지속적으로 정형화하는 과정이 진행 중에 있습니다.

이전까지는 사내 컨벤션이 명확하게 확립되지 않은 상황이었기에 **개인 개성의 영역과 정형화되어야 하는 부분**에 대해 명확히 구분할 수 없는 저로서는 **코드 리뷰에 있어서나 품질 향상을 위한 논의에 있어서도 다소 어려움**이 있었습니다. 정답이 없는 영역이라고 말할 수도 있기에 서로가 기준이 다른 리뷰는 개발 과정에서도 **때로는 소모적인 토론이 진행**되기도 했고, 정립되지 않는 기준때문에 **코드 분석에 있어 피로도가 증가**한다는 문제점도 파악할 수 있었죠.

그런 입장에서 정형화된 컨벤션은 적어도 저에게 좋은 시스템이라고 생각합니다. 물론 팀원들과 함께 충분한 의사소통을 진행하였고, 비교적 작은 규모의 프론트엔드 팀인 저희 팀이었기에 각 팀원들의 의견을 최대한 존중하자는 의미에서 **단 한 명의 반대라도 존재하는 컨벤션은 논의를 통해 해결할 수 없다면, 이를 수용하지 않는다**는 일념 하에 컨벤션을 만드는 것을 기본으로 하였습니다.

컨벤션이 항상 왕도일 수는 없다고 생각합니다. 때로는 불합리한 컨벤션이 팀 내 개발 프로세스를 지연시키거나 불필요한 과정을 추가하게 되어 비효율을 불러 일으키기도 할 것입니다. 그렇기에 이를 더 가다듬고 문제 의식을 잊지 않으며 계속해서 수정해나가는 방식을 앞으로 당장은 적용하고자 합니다.

### 참고

- [Github Repository : toss/slash](https://github.com/toss/slash)
- [Github Repository : conventional-changelog/standard-version](https://github.com/conventional-changelog/standard-version)
- [Github Repository : googleapis/release-please](https://github.com/googleapis/release-please)
- [Official Documents : Sementic Version](https://semver.org/lang/ko/)
- [JOHNNY DEV : standard-version을 이용한 배포, 롤백 전략](https://johnny-mh.github.io/post/standard-version-%EA%B8%B0%EB%B0%98-%EC%84%9C%EB%B9%84%EC%8A%A4-%EB%B0%B0%ED%8F%AC%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4/)
