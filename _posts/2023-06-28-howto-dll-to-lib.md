---
layout: post
title: "dll 파일에서 lib 파일 만들기"
description: "dll 파일에서 lib 파일을 만드는 방법을 알아본다."
category: Programing
tags: [DLL, Windows, Visual Studio]
---

### 수동

1.	"Developer Command Prompt for VS 2022"를 실행
	또는 콘솔에서 `C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat` 실행
	(Visual Studio 버전에 따라 다를 수 있음)
2.	def 파일 생성
	1.	dumpbin을 이용해 exports
		~~~
		$ dumpbin /EXPORTS "libtarget.dll" > libtarget.exports
		~~~
	2.	함수 이름 추출
	3.	def 파일 생성  
		~~~
		LIBRARY "libtarget.dll"
		EXPORTS
		assuan_accept
		assuan_begin_confidential
		...
		~~~
3.	lib 파일 생성
	~~~
	$ lib /def:libtarget.def /machine:x64
	~~~
	-	32bit가 필요하면 `/machine:x86` 옵션 사용



### 자동 스크립트

genlib.bat

~~~
@echo off
setlocal

set libname=%1

call "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\Tools\VsDevCmd.bat" > nul

echo LIBRARY %libname%> %libname%.def
echo EXPORTS>> %libname%.def
for /f "skip=19 tokens=4" %%f in ('dumpbin /exports %libname%.dll') do echo %%f>> %libname%.def

lib /nologo /def:%libname%.def /out:%libname%.lib /machine:x64

endlocal
~~~

사용 예:

~~~
$ ls
genlib.bat  libtarget.dll

$ genlib libtarget
   libtarget.lib 라이브러리 및 libtarget.exp 개체를 생성하고 있습니다.

$ ls
genlib.bat  libtarget.def  libtarget.dll  libtarget.exp  libtarget.lib
~~~
