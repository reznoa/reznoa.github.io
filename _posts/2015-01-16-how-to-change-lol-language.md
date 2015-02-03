---
layout: post
title: "League of Legend - 한국어 활성화 방법"
description: ""
category: Game
tags: [게임, 리그오브레전드, 한국어패치]
---
{% include JB/setup %}



## 한국어 활성화, 왜?

League of Legend는 다양한 국가에서 각자의 언어로 서비스하고있다. 당연히 한국에서도 한국어 서비스를 한다. 그렇다면, 왜 한국어 활성화가 필요한걸까.
이는 몇가지 이유로 여전히 많은 사람들이 외국 서버에서 게임을 하기 때문이다.

그럴때, 게임 내 문구가 한글이면 쉽게 알아볼 수 있기 때문에 게임하는데 도움이 된다. 이미 완벽하게 외우고있는 사람이라면 영어로 나오든 중국어로 나오든 크게 상관은 없겠지만 말이다.



## 한국어 활성화 방법

### 원하는 서버의 지원 언어에 한국어 추가하기

다음 파일을 연다:
`${LOL_HOME}\Rads\projects\lol_patcher\managedfiles\0.0.0.0\regions.txt`

내용은 다음과 같다(편의상 공백은 일부 제거했다):

~~~
na,   na,   en_US,                               A
br,   br,   pt_BR,                               A
tr,   tr,   tr_TR,                               A
euw,  euw,  en_GB|de_DE|es_ES|fr_FR|it_IT,       A
eune, eune, en_GB|cs_CZ|el_GR|hu_HU|pl_PL|ro_RO, A
ru,   ru,   ru_RU,                               A
la1,  la1,  es_MX,                               A
la2,  la2,  es_MX,                               A
oc1,  oc1,  en_AU,                               A
~~~

원하는 서버에 ko_KR을 추가한다.

예를들어, 북미 서버에서 한글로 하고싶다면 북미서버 줄을 다음과 같이 고친다(편의상 공백은 일부 제거했다):

~~~
na,   na,   en_US|ko_KR,                         A
~~~

이걸로 이제 한국어를 고를 수 있게 됐다.



### regions.txt 수정 결과

regions.txt 파일을 고치면 게임할 때 한국어를 사용할 수는 있지만, 런처에서 언어 선택할 때 한국어가 제대로 표시되지 않는다.
라벨없이 얇은 줄로 표시되는데, 그래도 그걸 선택하면 한국어가 제대로 나온다.

![languages.txt 패치 전 한국어 표시 모습](https://lh3.googleusercontent.com/-uHUdHiwORFg/VI7qRSrzX9I/AAAAAAAAN9M/jDuphEUBgic/s600/lol-kr-1.jpg "한국어는 빈 항목으로 표시된다.")

![한국어가 나오는 모습](https://lh6.googleusercontent.com/-iS6TqaQPF14/VI7qdxPsqJI/AAAAAAAAN9c/KmngNjLRddo/s600/lol-kr-2.jpg "북미 서버지만 확실히 한국어로 나오는걸 확인할 수 있다.")

그런데, 하나를 더 고치면 런처의 언어 선택 목록에서도 한국어를 제대로 표시할 수 있다.



### 런처에서 한국어 나오게 하기

다음 파일을 연다:
`${LOL_HOME}\RADS\projects\lol_patcher\managedfiles\0.0.0.9\languages.txt`

내용은 다음과 같다:

~~~
English, en_US
Português, pt_BR
Türkçe, tr_TR
English, en_GB
Deutsch, de_DE
Español, es_ES
Français, fr_FR
Italiano, it_IT
Čeština, cs_CZ
Ελληνικά, el_GR
Magyar, hu_HU
Polski, pl_PL
Română, ro_RO
Русский, ru_RU
Español, es_MX
English, en_AU
~~~

맨 위에 다음 내용을 추가한다:

~~~
한국어, ko_KR
~~~


### languages.txt 수정 결과

이제 런처를 실행하고 언어 선택 목록 상자를 보면 한국어가 제대로 표시되는걸 볼 수 있다.

![languages.txt 패치 후 한국어 표시 모습](https://lh3.googleusercontent.com/-uXizWa5Z6CQ/VLj6U3xX5uI/AAAAAAAAOiU/kc2LbMfnW0M/s600/lol-kr-2-fix.jpg "런처에서도 한국어가 잘 나온다.")



## 알려진 문제

게임을 실행하기전에 런처에서 언어를 바꾸면 언어 파일을 업데이트하고, 곧 지정한 언어로 표시된다.
게임 내에서도 글귀는 물론 음성까지 모두 한글로 잘 나온다.

![북미서버를 한국어로 접속한 모습](https://lh4.googleusercontent.com/-_e2nu0JZ5sA/VI7qy0KKFbI/AAAAAAAAN9s/elK9gdL5rKI/s600/lol-kr-3.jpg "글귀와 음성 모두 잘 나오지만, 홈 화면엔 아무것도 안뜬다.")

다만, 아쉽게도 홈 화면에는 아무것도 뜨지 않는다.
공식으로 지원하지 않는 언어를 쓸 수 있게 만든거라서 그런 모양인데, 정확한 원인은 모르겠다.

이것도 위에서처럼 설정을 담고있는 파일을 바꾸면 해결할 수 있을지도 모르겠다만, 아직 그 방법을 찾지 못했다.
