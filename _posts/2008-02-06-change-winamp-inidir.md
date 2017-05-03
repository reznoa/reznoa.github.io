---
layout: post
title: "Winamp 설정 파일을 위치 바꾸기"
description: "백업과 관리 편의를 위해 Winamp 설정 파일의 위치를 바꾸는 법을 알아본다."
category: 컴퓨터
tags: [Winamp, 설정]
---

Winamp가 언젠가부터 `%APPDATA%\Winamp`에 설정파일을 만든다.
전에는 Winamp 디렉토리에 만들었는데 말이다.

여러 프로그램들이 `%APPDATA%` 같은걸 쓰기 시작한건 다중 사용자 환경에서 사용자마다 서로 다른 설정을 가질 수 있도록 하기 위해서다. 하지만, 보통 컴퓨터는 혼자 쓰지 않는가. 그런 사람들에겐 이렇게 따로 뗴어놓을 필요가 없다. 오히려 관리하기 귀찮기만하다.

다행히 이를 조정할 수 있는 방법이 있는데, 바로 설정파일 위치를 담은 paths.ini 파일이다.

paths.ini는 보통 다음처럼 생겼다.
여기서 `{26}`이 `%APPDATA%`를 가리키는 듯하다.

~~~
[Winamp]
inidir={26}\Winamp
~~~

여기서 inidir 값을 원하는 위치로 바꾸면 된다.
그리고, 기존 설정 파일들을 옮겨주면 이제 앞으로는 지정한 위치에서 설정 파일을 읽는다.

주의할것은, 이 경로에는 winamp.ini 뿐 아니라 winamp.m3u, winamp.m3u, Winamp.m3u8, Winamp.pic, Winamp.q1, 심지어는 Plugins 디렉토리까지 많은 파일들을 담는다는거다.
그러니, Winamp 설치 디렉토리 말고 다른데를 지정하는게 좋다.

나는 Winamp 설치 디렉토리 밑에 Config라는 디렉토리를 만들고 그걸 inidir로 지정했다.
