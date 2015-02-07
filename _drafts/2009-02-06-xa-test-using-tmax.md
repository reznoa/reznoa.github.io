---
layout: post
title: "Tmax 5.0를 이용한 XA 테스트"
description: ""
category: Developlay
tags: [Tmax, XA]
---

## 설치

서버에 접속한다.

~~~
$ telnet 192.168.1.28
~~~

uname을 이용해 서버의 버전을 확인하고, 해당 버전에 맞는 Tmax를 다운받는다. 다운받기 위해서는 가입 절차가 필요하나, 생년월일과 이메일주소만 있으므로 부담스럽지 않다.

~~~
$ uname -a
~~~

다운 받은 파일을 ftp를 이용해 올린다. binary 모드로 올리지 않으면 깨질 수 있으므로 주의.

~~~
ftp> binary
200 Type set to I.
ftp> put
(local-file) Tmax5_0_Fix1_Solaris8_Sparc_64.bin
(remote-file) Tmax5_0_Fix1_Solaris8_Sparc_64.bin
local: /home/reznoa/바탕화면/TMAX/Tmax5_0_Fix1_Solaris8_Sparc_64.bin remote: Tmax5_0_Fix1_Solaris8_Sparc_64.bin
200 PORT command successful.
150 Binary data connection for Tmax5_0_Fix1_Solaris8_Sparc_64.bin (192.168.3.159,55090).
226 Transfer complete.
73968220 bytes sent in 6.48 secs (11148.7 kB/s)
ftp> exit
221 Goodbye.
~~~

실행 권한을 주고 실행시킨다. 인스톨러가 실행되고, 대부분은 ENTER만 치면서 넘어가면 된다.

~~~
$ chmod u+x Tmax5_0_Fix1_Solaris8_Sparc_64.bin 
$ ./Tmax5_0_Fix1_Solaris8_Sparc_64.bin 
Preparing to install...
Extracting the JRE from the installer archive...
Unpacking the JRE...
Extracting the installation resources from the installer archive...
Configuring the installer for this system's environment...

Launching installer...

Preparing CONSOLE Mode Installation...

...
~~~



## 환경설정

Tmax를 위한 환경변수가 .bash_profile에 설정된다. 이를 적용한다.

~~~
$ . ./bash_profile
~~~

또는

~~~
$ source ./bash_profile
~~~

env를 이용해 환경변수가 잘 적용되었는지 확인한다.

~~~
env | grep TMAX
~~~

라이센스 파일을 얻기 위해 ncpu 유틸을 실행한다.

~~~
$ $TMAXDIR/license/ncpu > sysinfo.txt
~~~

생성된 파일은 다음과 같다:

~~~
HOST NAME1: v880
HOST NAME2: v880
HOSTID: 8368198B
H/W SERIAL: 2204637579
NCPUS: 8
UNAME: SunOS v880 5.8 Generic_117350-57 sun4u sparc SUNW,Sun-Fire-880
~~~

라이센스를 즉시 발급받기 위하여 [TmaxSoft Technical Network](http://technet.tmax.co.kr/kr/index.do)에 들어간다.
로그인 후 [다운로드 > 라이센스 신청[으로 들어간다.
'제품명' 필드에서 TMAX를 선택하면 Host ID가 Host Name으로 바뀐다. 설치하려는 앞에서 확인한 host name을 넣는다. 그 후 나머지를 채운 다음 확인을 하면, 이메일로 라이센스 파일이 전송된다.

이렇게 해서 받은 라이센스 파일을 license에 넣는다.

~~~
$ mv license.dat $TMAXDIR/license/
~~~

이 후 과정은 'Tmax Installation Guide.pdf'의 '1.7.5.1 기본 환경 설정' 이후를 참고한다.



## 테스트 계획

1. 일반 서비스

sample 실행을 대체



2. DB 서비스

DB를 이용해 간단한 정보를 INSERT, SELECT, UPDATE, DELETE

~~~
-- db1
CREATE TABLE bankbook {
	no NUMBER PRIMARY KEY,
	money NUMBER
};

INSERT INTO bankbook VALUES (1, 2000);
-- 성공 확인
INSERT INTO bankbook VALUES (1, 2000);
-- 실패 확인
UPDATE bankbook SET money = money + 1000 WHERE no = 1;
-- 성공 확인
SELECT * FROM bankbook WHERE no = 1;
-- 성공 확인, money == 3000 확인
DELETE bankbook WHERE no = 1;
-- 성공 확인
SELECT * FROM bankbook WHERE no = 1;
-- 실패 확인
~~~


3. 1DB XA 서비스

테스트2에 xa 함수를 추가로 사용.



4. 2DB XA 서비스

2개의 DB를 이용해 간단한 온라인 이체를 흉내.

~~~
-- db1
CREATE TABLE bankbook {
	no NUMBER PRIMARY KEY,
	money NUMBER
};

INSERT INTO bankbook VALUES (1, 2000);

-- db2
CREATE TABLE passbook {
	no NUMBER PRIMARY KEY,
	money NUMBER
};

INSERT INTO passbook VALUES (2, 500);
~~~

-- 이체 성공 case

1. 1000원 빼기 : bankbook.1.money -= 1000
2. 1000원 더하기 : passbook.2.money += 1000
3. 성공 여부와 commit 확인 : bankbook.1.money == 1000, passbook.2.money == 1500

-- 이체 실패 case 1

1. 3000원 빼기 : bankbook.1.money -= 3000
2. 실패 여부와 rollback 확인 : bankbook.1.money == 2000, passbook.2.money == 500

-- 이체 실패 case 2

1. 1000원 빼기 : bankbook.1.money -= 1000
2. passbook.2 is not found
2. 실패 여부와 rollback 확인 : bankbook.1.money == 2000



## 참고

실행: tmboot
종료: tmdown

altibase를 위한 tms 생성

altibase_home
heerock/altibase3_home
raysiasd/work/altibase_trunk/altibase_home
et16



## Troubleshooting

### shared memory open error로 tmdown에 실패하는 경우


1. Tmax 관련 프로세스를 모두 찾아서 죽인다.

   ~~~
   ps -e | egrep "tmm|tlm|cll|clh|sdltest|tms_" | grep -v grep| awk '{print $1}'
   ~~~
2. `ipcs -m | grep tmax`으로 공유 메모리 현황을 확인
3. `ipcrm -m {shmid}`로 남아있는 공유 메모리를 제거


### 실행시 ld.so.1에서 에러가 나는 경우

컴파일 옵션에 -R$(TMAXLIBDIR) 추가

~~~
export TMAXLIBDIR=$(TMAXDIR)/lib64
~~~

[[답변]OS 의 shared library 설정 (SUN 인경우 가끔 발생)](http://technet.tmax.co.kr/kr/inquiry/qna/tmax/readBoardForm.do?bbsCode=qna_tmax&fc=inquiry&sc=inquiry_qna&tc=inquiry_qna_tmax&currentPage=1&range=10&seqNo=16099&searchType=ALL&searchText=ld.so.1&tailId=&cmd=&productCode=) 참고.
