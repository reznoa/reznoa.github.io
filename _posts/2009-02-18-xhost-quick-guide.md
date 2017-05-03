---
layout: post
title: "강력한 원격 솔루션, xhost"
description: "리눅스의 강력한 원격 솔루션인 xhost에 대해 알아본다."
category: 컴퓨터
tags: [xhost, 원격, Linux]
---

## xhost?

리눅스의 가장 멋진 점 중 하나

원격 서버에서 실행하는 x-window용 프로그램을 내 x-window에 띄워서 작업

프로그램도, 파일도 물론 서버의 것을 사용

심지어 File - Open 같은 메뉴마저도 자유롭게 사용 (물론 서버의 것!)

원격 데스크탑보다 더 높은 점수를 주겠으!



## 방법

~~~
your$ xhost +

your$ telnet remote_ip

...

remote$ export DISPLAY=your_ip:0
~~~

당연히 your_ip는 자기가 데스크탑의 IP
(설마 your_ip를 그대로 따라 쓰진 않겠지;)

대부분 검색해보면 "your_ip:0.0"이라고 하라는데, 나는 그렇게 해서 실패했던 경험이 있다.
혹시나.. 싶으면 둘 다 해볼 것.



## 안될 때

ping도 잘 들어가고 xhost도 했는데도 다음과 같은 에러가 뜰 수 있다.

> Error: Can't open display: your_ip:0

이럴땐 보안상의 이유로 TCP를 허용하지 않게 되어있는지 확인해봐야한다.

1. /etc/X11/xinit/xserverrc  
   "-nolisten tcp"이 있으면 제거
2. gdm 속성 변경
   - /etc/gdm/gdm.schemas (예전 버전)  
     "DisallowTCP" 속성을 false로 설정
   - /etc/gdm/custom.conf (natty가 적용된 Ubuntu 최신 버전)  
     [security] 섹션에서 DisallowTCP=false (섹션과 속성은 없으면 없으면 생성)
3. 재시작

만약을 위해 꼭 설정을 백업해 놓으시라.



## 단점

보안이 약하다네;

그래서 ssh를 이용해서 연결하는 방법도 있으니 참고.



## 참고

- [Using xhost with Ubuntu](http://davesource.com/Solutions/20070912.Ubuntu-xhost.html)
- [Ubuntu Dapper에서 리모트 X 어플리케이션 실행하기](http://blog.jinbo.net/papyrus/?pnum=8)
- [How do I get remote X-display on this machine?](http://askubuntu.com/questions/57001/how-do-i-get-remote-x-display-on-this-machine)
