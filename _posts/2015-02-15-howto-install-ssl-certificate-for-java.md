---
layout: post
title: "Java에서의 SSL 연결을 위한 인증서 추가 방법"
category: Programing
tags: [Java, SSL, Troubleshooting]
---

Java에서 HTTPS처럼 SSL을 쓰는 주소로 접속하려고 할 때, 다음과 같은 에러가 나는 경우가 있다: "Unable to Find Valid Certification Path to Requested Target"

이 에러는 SSL 접속을 위한 인증서가 없어서 그런거다.
그러니, 인증서 파일(jssecacerts)을 만든 다음 'jre/lib/security/' 밑에 넣어주면 된다.

인증서 파일은 'InstallCert'라는 Java 프로그램으로 손쉽게 만들 수 있는데,
지금은 <https://java-use-examples.googlecode.com/svn/trunk/src/com/aw/ad/util/InstallCert.java>에서 얻을 수 있으니 이를 받아서 쓰면 된다.

InstallCert 사용법은 다음처럼 간단하다.

~~~
java InstallCert TARGET_ADDR
~~~

그러면 SSL 핸드셰이크를 통해 인증서를 확인하고, 그 객수와 종류를 뿌려준다.
그러면 거기에서 원하는 인즈서를 선택해 인증서 파일에 추가할 수 있는데,
보통은 그냥 1번을 선택하면 된다.
만약, 1번으로 인증이 제대로 안된다면 2번, 3번.. 식으로 확인해보시라.

인증 성공여부 역시 InstallCert로 확인할 수 있는데,
위와같이 실행했을 때 다음과 같은 메시지가 뜬다면 인증서가 이미 잘 추가된 것이다.

> No errors, certificate is already trusted

많이 쓰진 않겠지만, 웹사이트로부터 정보를 가져오거나 수집하는 프로그램을 만든다면 유용할 것이다.
