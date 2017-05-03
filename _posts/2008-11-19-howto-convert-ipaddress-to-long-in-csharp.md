---
layout: post
title: "C# - IPAddress를 long으로 변환하기"
description: "C#에서 IPAddress를 long으로 변환하는 방법을 알아본다."
category: Programing
tags: [C#, Byte Ordering, 코드조각]
---

C#은 대부분을 클래스로 캡슐화했는데, 이게 편하기도 한 반면 때로는 자잘한 정보를 제대로 얻을 수 없어 지랄같을 때도 있다.[^1]

[^1]: 예전에 struct 였던 자료들이 없어진 것이 대표적이다. WinAPI를 직접 호출하면 얻을 수 있긴 하지만, 그것을 C#에서 지원하는 것이라고 하기는 어려울 것이다.

IP를 다양한 형태로 얻는것도 다 쓸데가 있다.
예를 들어, [in_addr structure](https://msdn.microsoft.com/en-us/library/aa366055.aspx)는 WinAPI에서 IPv4를 나타내는데 사용하는 구조체인데, 이녀석을 이용하면 각 자리의 값을 얻거나 설정할 수 있고, long값으로 얻거나 설정할 수도 있다. 주로 [inet_addr(const char*)](https://msdn.microsoft.com/en-us/library/ms738563.aspx)같은 함수를 이용해 in_addr을 설정할 때 long값을 이용한다.

C#에서는 [IPAddress 클래스](https://msdn.microsoft.com/en-us/library/system.net.ipaddress.aspx)를 IP 표현하는데 사용한다. 이녀석은 C#답게 Property를 이용해서 개별 값을 얻을 수 있다. 그 중 [IPAddress.Address](https://msdn.microsoft.com/en-us/library/system.net.ipaddress.address.aspx)가 long 값으로 표현된 ip 주소를 나타내는데, 왜 그런지 Obsolete 됐다. 대신 [IPAddress.GetAddressBytes()](https://msdn.microsoft.com/en-us/library/system.net.ipaddress.getaddressbytes.aspx)를 이용해서 byte[]를 얻으라고 한다. (한숨)

..맘에 안들지만, 뭐, 별 수 있나. 만들어 쓰는 수밖에.

~~~
byte[] addrByte = dest.GetAddressBytes();
long addr =  addrByte[0]
          + (addrByte[1] <<  8)
          + (addrByte[2] << 16)
          + (addrByte[3] << 24);
~~~

코드는 간단하다.

이런 코드를 만들 때 주의할것은, byte[]는 big-endian 기준으로 변환해야한다는거다. IPAddress 변환도 검색질을 해보면 little-endian 기준으로 변환한 코드를 소개하는 글<!--(http://choiwonwoo.egloos.com/575358)-->이 있는데, MSDN에도 [byte[]는 최상위 바이트가 0번째 위치에 오는 네트워크 바이트 순서](http://msdn.microsoft.com/ko-kr/library/t4k07yby.aspx)라는 내용이 있으므로 실수한 것으로 보인다. 실제로도 관련 함수에 값을 넘겨 쓸 때에 big-endian으로 변환한 값이 아니라면 제대로 동작하지 않는다.
