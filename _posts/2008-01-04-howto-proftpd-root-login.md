---
layout: post
title: "ProFTPD에서 root의 접근을 허용하기"
description: ""
category: PC
tags: [Linux, ProFTPD, 설정]
---

보통 root를 접근할 수 있도록 하는것은 어리석은 짓이라고들 한다. 보안 때문이다.
하지만, Linux를 개인적으로만 사용할 경우에는 따로 계정을 만드는것이 오히려 번거롭기만 할 뿐.
그냥 root로 ftp든 telnet이든 접속하고 싶은것이 당연하다.

그렇다면, 설정파일을 조금만 바꿔 ProFTPD가 root를 받아들이도록 할 수 있다.

먼저, ftp 접근을 금지한 사용자 목록 파일(보통 /etc/proftpd/ftpusers)에서 root를 제거한다. 지우지 않고 #으로 주석처리해도 된다.

![/etc/proftpd/ftpusers](https://lh3.googleusercontent.com/-kKlKHanpans/VNOYtT_-X0I/AAAAAAAAOy0/aVhnN5TuVPA/s0/proftpd_allow_root_ftpusers.png "금지 목록에서 root 제외")

다음은, ProFTPD 설정 파일(보통 /etc/proftpd/proftpd.conf)에서 root의 접근을 허용하도록 설정해야한다.
설정을 보면 RootLogin이라는 항목이 있는데, 이게 보통은 off로 되어 있을 것이다. 이걸 on으로 만들면 된다.

![/etc/proftpd/proftpd.conf](https://lh6.googleusercontent.com/-PeT62abs0C4/VNOZ3HlCavI/AAAAAAAAOzE/rYYtlXbYXGs/s0/proftpd_allow_root_conf.png "RootLogin 옵션을 켠다.")

마지막으로, 바꾼 설정을 적용하기위해 ProFTPD를 재시작한다.
보통 xinetd와 함께 동작하도록 되어있으므로 xinetd를 재시작하면 된다.

![xinetd restart](https://lh6.googleusercontent.com/-HHPFa0c-wuo/VNOaI2ufyuI/AAAAAAAAOzU/hTkRSGJW2E8/s0/proftpd_allow_root_xinetd_restart.png "xinetd를 재시작한다.")

서버가 다시 뜨면, 이제 root로도 ftp에 접속할 수 있다.
