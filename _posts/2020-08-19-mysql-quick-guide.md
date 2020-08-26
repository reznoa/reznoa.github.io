---
layout: post
title: "MySQL Quick Guide"
category: Programing
tags: [MySQL]
---

### �ʱ�ȭ

MySQL HOME ���丮�� my.ini ���� ����

~~~
[mysqld]
basedir=c:/work/mysql-8.0.21-winx64/
datadir=c:/work/mysql-8.0.21-winx64/data
~~~

initialize ����

~~~
> mysqld --initialize --user=mysql
~~~



### root ��й�ȣ ����

mysql-init.txt ���� ����

~~~
ALTER USER 'root'@'localhost' IDENTIFIED BY 'NEWPASSWORD';
~~~

init-file ����

~~~
> mysqld.exe --init-file=mysql-init.txt
~~~



### DB ����

root�� �α���

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
