---
layout: post
title: "DbProviderFactories를 위한 machine.config 변경 방법"
description: "프로바이더 독립적인 코드 사용을 위한 machine.config 변경 방법을 알아본다."
category: logholic
tags: [ADO.NET, Trobleshooting, 설정]
---

.NET Data Provider는 2.0부터 Common 클래스를 제공하면서
프로바이더 독립적인 코드를 만들 수 있게 됐다.

그러면서 기존의 Connection, Command 객체를 생성할 수 있는 Factory 클래스를 추가했고,
각 프로바이더에 맞는 Factory를 얻기위한 클래스로 DbProviderFactories를 제공한다.

예를들어, Altibase의 Factory를 얻어오는 코드는 다음과 같다.

~~~
DbProviderFactory sFactory = DbProviderFactories.GetFactory("Altibase.Data.AltibaseClient");
DbConnection sConn = sFactory.CreateConnection();
// do something..
~~~

그런데 빌드까지 잘 된 코드가, 다음과 같은 에러를 뱉는 경우가 있다.

> 경고: 어셈블리 이름을 비교한 결과 빌드 번호가 일치하지 않습니다.  
> 오류: 어셈블리 설치를 완료하지 못했습니다(hr = 0x80131040). 검색이 종료됩니다.

왜?

문제는, DbProviderFactories가 프로바이더를 찾기위해 뒤지는 설정 파일에 해당 Invariant Name에 설정된 정보와 일치하는 DLL이 없기 때문이다.
보통은 설치 과정에서 이를 처리해주므로, 설치가 제대로 하지 않았거나, 또는 프로바이더 DLL만 가져다 쓰는 경우 이같은 에러가 쉽게 날 수 있다.
이럴땐, 클라이언트를 재설치하거나 벤더에서 제공하는 프로바이더 설치용 유틸을 이용해 문제를 해결할 수 있다.

여의치 않다면, 직접 문제를 해결할 수도 있다.
예를들어, 위 에러 메시지는 DLL의 빌드 번호가 일치하지 않아서 난 것이다.
그러니, DLL로부터 버전 정보를 읽어, 설정을 그에 맞게 바꿔주면 된다.

machine.config에 들은 프로바이더 설정은 다음과 같다:

~~~
<add name="Odbc Data Provider" invariant="System.Data.Odbc" description=".Net Framework Data Provider for Odbc" type="System.Data.Odbc.OdbcFactory, System.Data, Version=2.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"/>
~~~

여기서 Version을 바꿔주면 된다.
PublicKeyToken은 보통 바꾸지 않으므로 건드리지 않아도 될 것이다.