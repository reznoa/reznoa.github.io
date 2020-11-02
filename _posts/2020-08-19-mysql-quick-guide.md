---
layout: post
title: "MySQL Quick Guide"
category: Programing
tags: [MySQL]
---

### MySQL 초기화

MySQL HOME 디렉토리에 my.ini 파일 생성

~~~
[mysqld]
basedir=c:/work/mysql-8.0.21-winx64/
datadir=c:/work/mysql-8.0.21-winx64/data
~~~

initialize 수행

~~~
> mysqld --initialize --user=mysql
~~~



### root 비밀번호 변경

mysql-init.txt 파일 생성

~~~
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NEWPASSWORD';
~~~

init-file 수행

~~~
> mysqld.exe --init-file=mysql-init.txt
~~~



### 서비스 설치/제거/시작/종료

~~~
> mysqld.exe --install mydb
~~~

~~~
> mysqld.exe --remove mydb
~~~

~~~
> net start mydb
~~~

~~~
> net stop mydb
~~~



### DB 초기화

root로 로그인

~~~
> mysql -u root -p
Enter password:
~~~

DB 생성

~~~
mysql> CREATE DATABASE mydb;
Query OK, 1 row affected (0.0 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| mydb               |
+--------------------+
5 rows in set (0.0 sec)

mysql> USE mydb;
Database changed
~~~

USER 생성

~~~
mysql> CREATE USER username IDENTIFIED BY 'password';
Query OK, 0 rows affected (0.02 sec)

mysql> GRANT ALL PRIVILEGES ON mydb.* TO username;
Query OK, 0 rows affected (0.01 sec)
~~~
