---
layout: post
title: "Oracle - TNSListener 서비스가 시작되지 않을 때"
description: ""
category: Developlay
tags: [Oracle, Windows]
---

윈도우에서 Oracle의 TNSListener는 서비스로 등록된다.
제어판이나 services.msc를 통하면 등록된 서비스를 확인할 수 있다.

만약 TNSListener가 시작되지 않는다면
HOST 설정이 잘못된 것은 아닌지 의심해볼 필요가 있다.
제공된 관리용 도구를 이용할 수도 있겠지만, 직접 설정 파일을 조작하는것이 훨씬 빠르고 간단하다.


<< IMG : HOST 설정이 올바르지 않을 경우의 에러 메시지 : HOST 설정이 잘못됐을 경우, TNSListener 서비스가 실행되자마자 죽어(끝나)버리는 현상이 생긴다. >>


관련 파일은 다음과 같다.

- ${ORACLE_HOME}/network/admin/listener.ora
- ${ORACLE_HOME}/network/admin/tnsnames.ora

여기서 ${ORACLE_HOME}은 Oracle이 설치된 경로를 의미하며,
보통 오라클을 설치할 때 자동으로 환경변수에 추가된다.

파일을 텍스트 편집기로 열어보면 대충 다음과 같은 구문이 보인다.
(IP는 대충 랜덤으로 친거니까 개의치 마시라.)

~~~
odsn =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 240.102.20.135)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = orcl)
    )
  )
~~~

여기서 HOST 값을 다시 확인해보고 설정해주면 된다.
이 때, IP를 이용하는 것 보다는 호스트 이름을 이용하는것이 여러모로 좋은데,
IP가 변경되더라도 설정 파일을 바꾸지 않아도 되기 때문이다.



참고로, 윈도우에서 호스트 이름을 확인하려면, 명령행에서 hostname이란 명령을 사용하면 된다.


![hostname 명령 실행](https://lh3.googleusercontent.com/-GLdLyPoWnTo/VNTDymwPKKI/AAAAAAAAO1c/C3Md9iruAnM/s0/windows-hostname.png "hostname 명령을 이용하면 호스트 이름을 확인할 수 있다.")


설정을 바꾸고 다시 서비스를 시작하면,
이제 리스너가 제대로 뜨는것을 확인할 수 있을 것이다.