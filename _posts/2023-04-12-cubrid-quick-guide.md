---
layout: post
title: "CUBRID Quick Guide"
description: "CUBRID를 가볍게 쓸 때 필요한 몇가지 명령들을 정리해본다."
category: Programing
tags: [CUBRID]
---

## 표기법

이 문서의 표기는 크게 콘솔, csql, 파일 내용, 결과를 포함한다.

콘솔은 다음과 같이 '`$ `'로 시작한다:

> ~~~
> $ ls
> ~~~

csql에서 수행할 명령은 다음과 같이 '`csql> `'로 시작한다:

> ~~~
> csql> select * from dual;
> ~~~

파일 내용은 다음처럼 '**[ ... ]**'로 감싼 파일명으로 시작하며,
이 후 처음 나오는 블럭이 해당 파일의 내용이다:

> **[fileName.c]**
>
> ~~~
> printf("Hello, Oracle!\n");
> ~~~

그 외의 것들은 모두 결과다.
결과는 문서의 단순화를 위해 과감히 생략하거나 일부 변형할 수 있다.



## 시작/종료

### 시작

~~~
$ cubrid service start
~~~

### 종료

~~~
$ cubrid service stop
~~~



## DB 생성

~~~
$ mkdir "/cubrid/databases/cdb"

$ cubrid createdb -F "/cubrid/databases/cdb" cdb ko_KR.utf8 
~~~

**[conf/cubrid.conf]**

~~~
[service]
service=server,broker,manager
server=cdb
~~~


## DB 삭제

~~~
$ cubrid deletedb cdb
~~~



## 사용자 생성 & 권한 주기

이름을 your_user_name, 비밀번호를 your_password로 할 경우:

~~~
$ csql cdb --user dba
Enter Password :

csql> CREATE USER your_user_name;
csql> ALTER USER your_user_name PASSWORD 'your_password';

csql> GRANT ALL PRIVILEGES ON tb_test TO your_user_name;
csql> REVOKE ALL PRIVILEGES ON tb_test FROM your_user_name;

csql> ;exit
~~~



## 정보 확인

### 버전

~~~
csql> SELECT Version();

   version()
======================
  '10.2.10.8925'
~~~

### 문자셋

~~~
csql> SELECT Charset('');

   charset('')
======================
  'utf8'
~~~
