---
layout: post
title: "MySQL Quick Guide"
category: Programing
tags: [MySQL]
---

### 초기화

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



### DB 생성

root로 로그인

~~~
> msql -u root -p
Enter password:

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
