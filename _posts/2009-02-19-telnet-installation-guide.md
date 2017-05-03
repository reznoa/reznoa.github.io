---
layout: post
title: "텔넷(telnet) 서비스 설치 방법"
description: "리눅스에서 텔넷 서비스를 설치하는 방법을 알아본다."
category: 컴퓨터
tags: [telnet, Linux]
---

텔넷을 시도해본다.

~~~
$ telnet localhost
~~~

일반적으로 우분투 데스크탑에는 텔넷 서비스가 설치되지 않는다.

쉘에서 아래의 명령 실행해서 telnetd를 설치.
필요하다면 xinetd도 함께 설치한다.

~~~
$ sudo apt-get install telnetd xinetd
~~~

xinetd를 쓴다면, /etc/xinetd.conf를 열어서 telnet 서비스를 추가.

~~~
$ sudo vi /etc/xinetd.conf
~~~

~~~
service telnet
{
    disable = no
    flags = REUSE
    socket_type = stream
    wait = no
    user = root
    server = /usr/sbin/in.telnetd
    log_on_failure += USERID
}
~~~

xinetd 다시 시작.

~~~
$ sudo /etc/init.d/xinetd restart
~~~

텔넷을 시도해봐서, 로그인 창이 뜨면 됐다.

~~~
$ telnet localhost
~~~

xinetd를 안쓸 때, root 접속을 허용하려면 다음 글 참고:
[[보안] telnet root 접속하기](http://blog.syszone.co.kr/685)
