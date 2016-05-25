---
layout: post
title: "아웃룩 2003에서 보안상의 문제로 첨부파일을 다운로드 받을 수 없을 때"
description: "아웃룩 2003에서 보안문제로 첨부파일을 다운로드 받을 수 없을 때 해결법을 알아본다."
category: PC
tags: [아웃룩, 보안, 설정]
---

아웃룩 2003을 쓰다보면 보안상의 문제라면서 첨부파일을 다운로드 받을 수 없을 때가 있다. 실행파일인 exe 파일가 그렇다. 하지만, 실제로는 exe 파일이라고 다 보안문제가 있는것도 아니고, 필요에 의해 주고받기도 한다. 그럴때 다운 못한다고만 나오면 아주 짜증이 나지.

그럴땐, 아웃룩의 보안 옵션을 끄면 된다.

~~~
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\Office\11.0\Outlook\Security]
"Level1Remove"="exe"
~~~

위 레지스트리는 exe 파일에 대한 보안을 끄는 것이다.
만약 여러개를 지정하고 싶다면 환경변수를 지정하듯이 `;`으로 구분해주면 된다.

다시 옵션을 켤때는 추가한 값을 지우면 된다.

~~~
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\Office\11.0\Outlook\Security]
"Level1Remove"=-
~~~

이것은 원래 아웃룩 익스프레스에서 옵션으로 조절할 수 있는 기능이었다. 하지만, 첨부파일을 통한 보안문제가 많았기 때문인지, 그 이후엔 사라져 레지스트리를 직접 건드려야만 조정할 수 있게 바뀐 것이다.

하지만, 뭐.. 완전 막은건 아니어서 그나마 다행이다.
