---
layout: post
title: "DLL Export 방법"
description: "DLL Export를 하는 2가지 방법을 알아본다."
category: Developlay
tags: [DLL, Windows, Visual Studio]
---

## DLL Export란?

코드를 재사용하는 방법에는 코드 자체를 재 사용하는 방법과, 목적 파일을 재사용하는 방법이 있다.

DLL은 목적 파일을 재사용하는 방법 중 하나다. 공통적으로 사용될 만한 함수를 묶어서 *.dll이라는 이름의 파일로 생성하고, 이를 이용하려는 프로그램은 단 하나의 *.dll을 공유하여 그 안에 구현된 함수를 호출하여 사용한다.

DLL은 구현에 사용된 모든 함수를 외부에 드러내지 않는다. 마치 private처럼 DLL 내부에서만 사용되는 함수들은 결코 외부로 드러나지 않으며, DLL은 모든 함수를 기본적으로 드러나지 않는것으로 간주한다.

특정 함수를 드러내려면 다음과 같은 2가지 방법을 이용해 함수를 export해야한다.

 - export할 함수를 DEF 파일에 명시하고 이를 이용
 - __declspec 구문을 이용해 함수를 export 용으로 선언



## DLL Export

### DEF 파일을 이용한 export

Visual Studio는 DEF 파일을 이용하는 방법을 기본으로 한다.
때문에, 새로운 DLL 프로젝트를 만들면 기본적으로 비어있는 DEF 파일을 생성해준다.

DEF 파일의 형식은 다음과 같다.

~~~
LIBRARY "{라이브러리 이름}"

EXPORTS
	{export할 함수 이름}*
~~~

export 하는 방법은 간단하다.
{export할 함수 이름} 부분에 시그니처 없이 함수의 이름만 적어주면 된다.

예를 들어, `int myFunc( int val );`란 함수를 export 하려고 한다면, 다음과 같은 DEF 파일을 사용할 수 있다.

~~~
LIBRARY "mylib"

EXPORTS
	myFunc
~~~

DEF 파일을 이용하면 export 함수가 뭔지 명확하고 그걸 한곳에서 관리할 수 있다는게 좋다.
하지만, 좀 귀찮고 불편하다.

DEF 파일을 쓰려면 프로젝트 속성에서 DEF 파일을 이용하도록 설정해 주어야 하는데, 이게 한꺼번에 할 수 있는게 아니고 각 빌드 구성마다 일일히 설정을 해줘야 한다.
빌드 구성을 추가하면 그 때마다 DEF 파일 설정을 해줘야 한다는 말이다.[^2]

[^2]: VS2005에서도 개선되지 않았다.

[DEF 파일을 꼭 써야하는 경우](http://msdn.microsoft.com/library/KOR/vccore/html/_core_export_functions_from_a_dll_by_ordinal_rather_than_by_name.asp)가 아니라면 썩 땡기지 않는다.


### __declspec 구문을 이용한 export

`__declspec` 구문을 이용한 방법은, 그냥 공개할 함수 선언부 앞에 `__declspec(dllexport)` 키워드를 추가하는 방법이다.

코드 예는 다음과 같다:

~~~
__declspec(dllexport) int myFunc( int val );
~~~

이렇게 만든 [DLL을 가져다가 쓰는 쪽에서는 조금 다른 선언 방식을 사용](http://msdn.microsoft.com/library/KOR/vccore/html/_core_import_into_an_application_using___declspec.28.dllimport.29.asp)해야 해야한다.

~~~
__declspec(dllimport) int myFunc( int val );
~~~

그래서 실제로는 위와같이 함수 앞에 직접 지정자를 달지 않고, 전처리문을 통해서 경우에 따라 적절한 지정자를 붙이도록 한다.
이렇게하면 export용 헤더와 배포용 헤더를 나누지 않아도 되기 때문이다.

~~~
#ifdef __cplusplus
extern "C" {
#endif

#if defined(_WINDLL)
	#ifdef MYLIB_DLLEXPORTS
		#define MYLIB_DLLFUNC __declspec(dllexport)
	#else
		#define MYLIB_DLLFUNC __declspec(dllimport)
	#endif
#else
		#define MYLIB_DLLFUNC /* none */
#endif

MYLIB_DLLFUNC int myFunc( int val );

// ...

#ifdef __cplusplus
}
#endif
~~~

`__declspec`를 이용한 방법은 함수 소스에서 export 여부를 확인할 수 있고, 함수에 `__stdcall`같은 지정자를 쉽게 바꿀 수 있다는게 장점이다.

다만, DEF 파일과 달리 한곳에서 export 함수 목록을 관리할 수 없다는건 좀 불편하다.



## export 함수 확인

DLL을 생성하고 나서, export가 제대로 됐는지 확인하고 싶다면, dumpbin이 한 방법이다.

dumpbin 유틸은 DLL의 export 함수 이름을 확인할 수 있게 해준다. 단, 여기에서 확인할 수 있는것은 함수 이름뿐으로, 시그니처까지는 확인할 수 없다. DLL 만으로 시그니처까지 확인할 수 있도록 하려면, 디버그 모드 처럼 DLL을 빌드할 때 함수 정보를 기록하도록 해야한다.[^1]

[^1]: 일반적으로 DLL을 배포할 때는 반드시 빌드된 DLL과 export 함수 목록이 나타나있는 헤더파일을 함께 배포하여 함수의 시그니처를 알 수 있도록 한다. 만약, 개인적인 용도로만 사용하거나 보안과 관련되어 공개가 꺼린다면, 단순히 헤더파일을 공개하지 않는것 만으로도 사용하기 어렵게 만들 수 있다.

dumpbin을 이용해 DLL의 export 함수를 확인하는 방법은 다음과 같다.

~~~
Microsoft (R) COFF/PE Dumper Version 8.00.50727.762
Copyright (C) Microsoft Corporation.  All rights reserved.


Dump of file C:\Temp\output\bin\release\win32\rezcrypto.dll

File Type: DLL

  Section contains the following exports for rezcrypto.dll

    00000000 characteristics
    4705F0B9 time date stamp Fri Oct 05 17:07:21 2007
        0.00 version
           1 ordinal base
           2 number of functions
           2 number of names

    ordinal hint RVA      name

          1    0 00003C10 SEEDCipher_decrypt
          2    1 00003AD0 SEEDCipher_encrypt

  Summary

        3000 .data
        2000 .rdata
        2000 .reloc
        1000 .rsrc
        A000 .text
~~~


위 결과는 rezcrypto.dll에 `SEEDCipher_decrypt`와 `SEEDCipher_encrypt`라는 export 함수가 있다는것을 보여준다.

만약, export 함수가 없다면 외부 프로그램에서 DLL에 접근할 수 없으므로, 빌드 후에는 반드시 DLL이 올바로 작성되었는지 확인해 주는것이 좋다.
