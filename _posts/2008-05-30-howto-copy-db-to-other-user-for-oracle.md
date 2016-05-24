---
layout: post
title: "Oracle - DB를 다른 사용자로 복사하기"
category: Developlay
tags: [Oracle, 백업, 복구]
---

[exp](http://www.psoug.org/reference/export.html), [imp](http://www.psoug.org/reference/import.html)는 DB를 백업하고 복원할 수 있는 툴이다.
보통은 그냥 그런 용도로 쓰는데, 옵션을 약간 손보면 다른 사용자에게 DB를 넣어줄 수도 있다.

예를들어, originalUserId의 것을 targetUserId로 복사하려면 다음과 같이 하면 된다:

~~~
$ exp system/systempwd owner=originalUserId file=dumpfile.dmp
$ imp userid=system/systempwd file=dumpfile.dmp fromuser=originalUserId touser=targetUserId
~~~

테스트 데이타를 각자가 사용할 사용자로 복사할 때 유용하다.
