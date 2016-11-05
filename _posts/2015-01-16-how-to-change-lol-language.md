---
layout: post
title: "League of Legend - 한국어 활성화 방법"
description: "League of Legend 외국 클라이언트에서 한국어를 사용하는 방법을 알아본다."
category: Game
tags: [게임, 리그오브레전드, 한국어패치]
---

## 한국어 활성화, 왜?

League of Legend는 다양한 국가에서 각자의 언어로 서비스하고있다. 당연히 한국에서도 한국어 서비스를 한다. 그렇다면, 왜 한국어 활성화가 필요한걸까.
이는 몇가지 이유로 여전히 많은 사람들이 외국 서버에서 게임을 하기 때문이다.

그럴때, 게임 내 문구가 한글이면 쉽게 알아볼 수 있기 때문에 게임하는데 도움이 된다. 이미 완벽하게 외우고있는 사람이라면 영어로 나오든 중국어로 나오든 크게 상관은 없겠지만 말이다.



## 정식 클라이언트의 한국어 활성화 방법

### 원하는 서버의 지원 언어에 한국어 추가하기

다음 파일을 연다[^1]:
`${LOL_HOME}\Rads\projects\lol_patcher\managedfiles\0.0.0.48\regions.txt`

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

다음 파일을 연다[^1]:
`${LOL_HOME}\RADS\projects\lol_patcher\managedfiles\0.0.0.48\languages.txt`

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



## 새로운 Alpha 클라이언트의 한국어 활성화 방법

현재(2016-11-05 기준) 알파 테스트 중인 새 클라이언트는 txt가 아닌 yaml 파일을 사용한다.

고칠 파일은 다음과 같다[^2]:
`${LOL_HOME}\RADS\projects\league_client\releases\0.0.0.29\deploy\system.yaml`

열어보면 접속 서버와 사용 가능한 언어가 다음과 같이 설정되어있다:

~~~
  NA:
    available_locales:
    - en_US
    default_locale: en_US
~~~

원하는 서버를 찾아 available_locales 항목에 한국어를 추가해주면 한국어를 사용할 수 있다.

예를들어, 북미 서버에 한국어를 추가한다면 다음처럼 수정한다:

~~~
  NA:
    available_locales:
    - en_US
    - ko_KR
    default_locale: en_US
~~~

그리고 다시 실행하면 '지역/언어' 옵션에서 한국어를 선택할 수 있다.

![2016 Alpha 클라이언트에서 한국어를 활성화한 모습](https://lh3.googleusercontent.com/QKEnZXKJILYT-DOLgUVsoXD-mbhMF_0H5e-z0skVN_iOPlHnv9gETsjuU7qQ_5eXhy-NRBjJ0w=s600 "방법은 다르지만 새 Alpha 클라이언트도 한국어를 쓸 수 있다.")



## 알려진 문제

게임을 실행하기전에 런처에서 언어를 바꾸면 언어 파일을 업데이트하고, 곧 지정한 언어로 표시된다.
게임 내에서도 글귀는 물론 음성까지 모두 한글로 잘 나온다.

![북미서버를 한국어로 접속한 모습](https://lh4.googleusercontent.com/-_e2nu0JZ5sA/VI7qy0KKFbI/AAAAAAAAN9s/elK9gdL5rKI/s600/lol-kr-3.jpg "로비에서 콘텐츠를 로딩하지 못할 수도 있다.<br />보여주더라도 그 내용은 한국 서버를 기준으로 한다.")

다만, 홈 화면에는 아무것도 뜨지 않을 수 있다.
뜨더라도 한국 서버를 기준으로 한 내용이 뜨므로, 실제 자신이 접속한 서버와는 다른 알림 내용이 나타날 수 있다.
이는 내부에서 사용하는 플래시 파일과 정보를 가져오는 주소가 한국어를 기준으로 한 것이라서 그런  듯하다.
한국어로 보기 위해서는 감수해야 할 점이다.



[^1]: 버전(예에서는 0.0.0.48)은 다를 수 있다.
[^2]: 버전(예에서는 0.0.0.29)은 다를 수 있다.
