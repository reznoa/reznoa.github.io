---
layout: post
title: "Visual C++ - vcbuild로 콘솔에서 프로젝트/솔루션 빌드하기"
description: ""
category: Developlay
tags: [Visual Studio, 콘솔, 스크립트, 자동화]
---

## devenv가 없다면 vcbuild로

Visual Studio(이하 VS)는 [devenv를 이용한 콘솔 빌드를 지원]({% post_url 2008-08-26-howto-build-project-or-solution-by-devenv-in-console %})한다.
하지만, 그것은 VS를 깐 사람만 쓸 수 있다.
VS-Express에는 devenv가 없기 때문이 다른 방법을 써야한다.

만약 빌드하려는게 C++ 솔루션이라면,
Visual C++에서 제공하는 전용 빌더 vcbuild를 이용해
devenv처럼 콘솔 명령으로 빌드할 수 있다.

환결설정을 위한 vsvars32.bat 호출은 이미 [이전 글]({% post_url 2008-08-26-howto-build-project-or-solution-by-devenv-in-console %})에서 다뤘으므로, 여기서는 생략한다.



## 원클릭 빌드 스크립트의 예

vcbuild를 이용한 스크립트는 대략 다음과 같다:

~~~
@echo off
	setlocal enabledelayedexpansion

:DEF
	call "%VS90COMNTOOLS%\vsvars32.bat"

	set vcb=%VS90COMNTOOLS%\..\..\VC\vcpackages\vcbuild.exe

:RUN
	cd myproject\
	"%vcb%" /useenv myproject.sln "Release|Win32"
	cd ..\

:END
	endlocal
~~~

vcbuild는 devenv와 달리 다른 경로에 있는 솔루션 파일을 지정했을 때 경로를 자동으로 보정하지 않는다.
때문에, 솔루션이 하위 디렉토리에 있다면 반드시 cd 명령으로 이동한 후 빌드를 수행해야한다.
그렇지 않으면 솔루션에서 상대 경로로 지정한 include, lib 경로가 잘못된 경로를 가리킬 수도 있다.

이 방법은 (devenv를 이용한 방법과 달리) VC++Express 뿐 아니라 VS에서도 쓸 수 있다.