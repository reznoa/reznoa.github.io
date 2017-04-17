---
layout: post
title: "Oracle Quick Guide"
description: "Oracle을 가볍게 쓸 때 필요한 몇가지 명령들을 정리해본다."
category: Developlay
tags: [Oracle, ODBC]
---

## 표기법

이 문서의 표기는 크게 콘솔, sqlplus, 파일 내용, 결과를 포함한다.

콘솔은 다음과 같이 '`$ `'로 시작한다:

> ~~~
> $ ls
> ~~~

sqlplus에서 수행할 명령은 다음과 같이 '`SQL> `'로 시작한다:

> ~~~
> SQL> select * from dual;
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
$ sqlplus "/as sysdba"

SQL> startup

$ lsnrctl start
~~~

### 종료

~~~
$ sqlplus "/as sysdba"

SQL> shutdown

$ lsnrctl stop
~~~



## scott/tiger 사용하기

테스트 따위를 할 때, 널리 알려져있기 때문에 공유해 쓰기 편한 계정이다.
보통은 이미 만들어져 있으므로 unlock을 해준다.

~~~
$ sqlplus "/as sysdba"

SQL> ALTER USER scott IDENTIFIED BY tiger ACCOUNT UNLOCK;

User altered.
~~~



## 사용자 생성 & 권한 주기

이름을 your_user_name, 비밀번호를 your_password로 할 경우:

~~~
$ sqlplus "/as sysdba"

SQL> CREATE user your_user_name IDENTIFIED BY your_password;

SQL> GRANT connect, resource TO your_user_name;
~~~



## ODBC 사용

**[~/.bash_profile]**

~~~
export ODBCINI=~/.odbc.ini
export ORACLE_HOME=/home1/ora12/db/product/12.1.0/dbhome_1
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:$LD_LIBRARY_PATH
export PATH=$ORACLE_HOME/bin:$PATH
~~~

**[~/.odbc.ini]**

~~~
[ora]
Driver     = /home/ora12/db/product/12.1.0/dbhome_1/lib/libsqora.so.12.1
UserID     = scott
Password   = tiger
ServerName = //192.168.0.1:1521/orcl
~~~

**[testOracleODBC.c]**

~~~
// ...

sRC = SQLDriverConnect( sHdbc, NULL,
                        (SQLCHAR *)"DSN=ora", SQL_NTS,
                        NULL, 0, NULL,
                        SQL_DRIVER_NOPROMPT );

// ...
~~~
