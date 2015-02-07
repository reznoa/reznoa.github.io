---
layout: post
title: "lib를 dll로 만드는 방법"
description: ""
category: Developlay
tags: [DLL, LIB]
---

lib는 static link library, dll은 dinamic link library다. 라이브러리를 위해 작성한 코드는 빌드할 때 옵션에 따라서 lib 또는 dll로 만들 수 있다.
그런데, 자기가 소스를 가지고 있는 경우라면 그렇지만, 만약 배포받은 lib를 dll로 만들어 쓰고 싶으면 어떻게 해야할까.

결론부터 얘기하자면, lib는 dll로 만들 수 없다.
lib의 함수를 dll로 노출시키려면 dll export용 랩핑 함수(Wrapping Function)를 만들어야 한다.

~~~
extern "C" int libfunc(char *a);

extern "C" __declspec(dllexport) int dllfunc(char *a) {
	return libfunc(a);
}
~~~

[Create DLL from LIB - HowTo ?](http://social.msdn.microsoft.com/Forums/en-US/Vsexpressvc/thread/e3a22b64-24e5-4d71-beb0-4779d6df22f4/)에 따르면 이렇다:

> This is because the library and the dll have different linkage. I tried giving dllexport linkage to the lib version but it loses it along the way, so the only way to get this to work is to wrap it so there is one physically in the dll and it has export linkage.

이 방법을 이용하면 lib를 이용해 dll을 만들 수는 있지만, dll로 노출되는 함수의 이름이 lib의 원래 이름과 달라진다.
아쉬우나마 배포용 헤더에 define이나 inline 함수를 추가해 사용할 때는 차이가 없도록 하는 수밖에 없다.

~~~
#define libfunc(a) dllfunc(a)
~~~
