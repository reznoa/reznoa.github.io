---
layout: post
title: "Visual C++ - _MSC_VER 이용하기"
description: "_MSC_VER 이용 예와 VC 버전별 값을 알아본다."
category: Developlay
tags: [Visual Studio, 전처리, 버전]
---

## _MSC_VER와 VC 버전

컴파일러에 따른 처리가 필요하다면 _MSC_VER를 쓰면 된다.
이놈은 VC에서 미리 정의해놓은 값으로, 버전마다 값이 다르다.

~~~
#if _MSC_VER >= 1500
	// VC9, VC 2008
#elif _MSC_VER >= 1400
	// VC8, VC 2005
#elif _MSC_VER >= 1310
	// VC7.1, VC 2003
#elif _MSC_VER > 1300
	// VC7, VC 2002
#elif _MSC_VER > 1200
	// VC6, VC 6.0
#elif _MSC_VER > 1000
	// VC5, VC 5.0
#endif
~~~

_MSC_VER 값은 간한가게 printf해서 얻을수도 있지만, cl.exe 정보를 확인해서 얻을 수도 있다.
예를 들어, VS2008SP1의 경우 버전 정보가 '15.00.30729.01(80x86)'처럼 나오는데, 여기서 앞의 숫자 4개인 1500이 _MSC_VER 값이다.



## _MSC_VER의 사용 예: 안전한 함수

_MSV_VER를 이용하는 예를 하나 들자면, 안전한 함수가 있다.
안전한 함수란 값에 따라 메모리를 접근하던 함수의 개선판으로, 접근할 메모리의 한계를 정해줌으로써 값이 잘못되어있더라도 메모리를 넘어서 건드리지 않도록 만든 것이다.
strcat_s 같은 것들이 그거다.

개선한 것이므로 다 바꾸면 좋겠다 생각하겠지만, 배포 문제로 예전 컴파일러로도 빌드해야 한다면? 그럴때 컴파일러 버전에 따른 처리를 하는거다.

~~~
#if _MSC_VER < 1300
	#define strcat_s(DES, MAXDESLEN, SRC)	strcat((DES), (SRC))
#endif
~~~

예전 컴파일러에는 빌드할 수 있도록 새로 생긴 함수를 define해서 포워딩한거다.

이 방법의 단점은, 컴파일러에 따라 프로그램의 동작이 달라질 수 있다는거다.

예를들어 위 예시는 DES의 공간이 충분하지 않을 경우, 안전한 함수를 지원하는 컴파일러에서는 나머지를 무시하지만, 안전한 함수를 지원하지 않는 컴파일러에서는 buffer overflow 문제를 일으킬 것이다.

어떻게 처리해야 문제가 없는지 충분히 생각해서 처리하고, 가능한 이런 코드가 없도록 하는게 좋다.