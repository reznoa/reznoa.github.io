---
layout: post
title: "내가 작성한 .NET 프로그램, 어떤 버전의 framework를 쓸까?"
description: ""
category: Developlay
tags: [.NET, 버전]
---

대부분이 그렇듯 .NET Framework도 하위 호황성만 유지될 뿐, 상위 호환성은 없다.[^1]
.NET Framework는 상위 버전을 설치하면 하위버전도 같이 깔린다.
.NET Framework만 따로 깔 수도 있다.
MS가 제공하는 IDE인 VS에는 빌드 결과가 어떤 버전의 .NET Framework를 사용하게 되는지 표시해주지 않는다.

[^1]: 상위 호환성은 사실 존재하지 않는다고 봐도 좋다. 새로운것이 예전것을 지원하는게 호환성이므로 낮은 버전이 상위 버전을 지원한다는건 어불성설이기 때문이다. 물론, 아예 안된다는건 아니다. (프로그래밍의 세계에 안된다는건 없다.) 하지만, 그러려면 낮은 버전을 위한 별도의 패치를 제공해야하고 사용자는 그것을 적용해야만 한다. [MS 오피스 호환팩](http://www.microsoft.com/ko-kr/download/details.aspx?id=3)이 그 대표적인 예다.

그러므로 버전 상관없이 쓸 수 있게 하려면 .NET Framework 1.0 기반으로 작성해야 한다.
그러나 현실적이지 않기 때문에 최소 지원 버전을 명시하는데, 이를 위해서라도 자신이 빌드한 프로그램(혹은 라이브러리의) .NET Framework 버전을 확인할 필요가 있다.

MS도 그런걸 잘 알고 있는지, '[설치된 .NET Framework 버전 확인](http://msdn.microsoft.com/ko-kr/library/dc98ytx2.aspx)'에 그 내용을 소개해놨다.

요약하자면 이렇다:

1. 레지스트리 [HKLM\Software\Microsoft\Fusion]으로 이동, ForceLog의 값을 1로 설정한다.
없으면 DWORD 값으로 만든다.
2. Fuslogvw.exe 실행.
3. 만든 프로그램 실행.
4. Fuslogvw에서 Refresh 버튼을 이용해서 로그 갱신.
5. mscorlib 등의 버전을 확인.

이렇게 확인한 mscorlib 버전이 .NET Framework 버전이라고 보면 된다.

- mscorlib 1.0.*: .NET Framework 1.0
- mscorlib 1.1.*: .NET Framework 1.1
- mscorlib 2.0.*: .NET Framework 2.0

코드에서 확인하는 방법도 있다.
System.Environment를 이용하면 된다.

~~~
Console.WriteLine("Version: {0}", Environment.Version.ToString());
~~~

실행하면 다음과 같이 표시된다:

> Version: 1.1.4322.2407

덧붙여, 이 방법은 항상 같은 버전을 나타내지 않는다.
빌드된 어셈블리를 실행하는 .NET Framework의 버전을 표시하는 것이기 때문이다.
그러므로 PC에서는 1.1로 뜨더라도 PDA에서는 1.0이 뜨고 하는식으로 조금씩 다를 수 있다.