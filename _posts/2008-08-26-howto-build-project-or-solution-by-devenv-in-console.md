---
layout: post
title: "Visual Studio - devenv로 콘솔에서 프로젝트/솔루션 빌드하기"
description: "devenv로 콘솔에서 프로젝트/솔루션 빌드하는 방법을 알아본다."
category: Programing
tags: [Visual Studio, 콘솔, 스크립트, 자동화]
---

## 왜?

Visual Studio(이하 VS) 프로젝트는 보통 IDE로 열어 사용하지만, devenv에 실행인자를 주면 콘솔에서 바로 빌드할 수도 있다.
IDE가 없어도 빌드할 수 있어야 자동화가 쉬우므로 콘솔 빌드 방법은 알아두면 좋다.



## 콘솔 실행을 위한 환경설정

VS에서 제공하는 실행파일을 사용하려면 먼저 이를 위한 환경이 설정되어있어야 한다. 다행히 VS는 이를 쉽게 할 수 있도록 다음과 같은 배치 파일을 제공한다:

- c:\Program Files\Microsoft Visual Studio 9.0\Common7\Tools\vsvars32.bat

이 배치파일의 위치는 VS 버전이나 설치 경로에 따라 달라질 수 있다.
위 예는 VS2008을 기본 경로에 설치했을 때의 것으로,
여기서 `c:\Program Files\Microsoft Visual Studio 9.0`가 VS2008의 설치 경로다.

이 경로는 VS용 환경변수를 이용해 다음처럼 쓸 수도 있다.

~~~
%VS90COMNTOOLS%\vsvars32.bat
~~~

환경변수의 이름 중 버전을 나타내는 90도 설치한 VS 버전에 따라 80, 90, 100 등으로 다르니 자기에게 맞는설 찾아 써야한다.



### 프로젝트/솔루션 빌드 방법

환경 설정이 끝났다면 devenv를 이용해 다음처럼 프로젝트/솔루션을 빌드할 수 있다:

~~~
devenv myproject.sln /build "Release|Win32"
~~~

명령은 build 외에도 clean, rebuild 등 여러가지가 있는데, 더 자세한것은 /? 옵션을 통해 확인하면 된다.
만약, 아무런 옵션도 주지 않으면 IDE가 뜨므로 주의하시라.



### 원클릭 빌드 스크립트의 예

다음은 실행시 솔루션을 빌드하는 스크립트의 한 예다.

~~~
@echo off
	setlocal enabledelayedexpansion

:DEF
	call "%VS90COMNTOOLS%\vsvars32.bat"

:RUN
	devenv myproject/myproject.sln /build Release

:END
	endlocal
~~~

call을 이용해 환경설정과 솔루션 빌드를 한번에 할 수 있도록 했으므로, 따로 콘솔을 띄울 필요 없이 스크립트를 클릭해 실행하기만 하면 된다.
