---
layout: post
title: "PuTTY Quick Guide"
description: "PuTTY를 쓸 때 유용한 설정방법 등을 정리해본다."
category: Programing
tags: [PuTTY, SSH]
---

### 리모트 시작 위치 지정

PuTTY Configuration에서
Connection > SSH 화면의 Remote command: 항목을 다음처럼 지정:

~~~
cd /home/reznoa/test; /bin/bash
~~~

접속하면 `/home/reznoa/test` 위치에서 bash 셸을 띄워줌.



### SSH 자동 로그인

1.	서버 SSH 키 파일(`id_rsa`, `id_rsa.pub`) 생성
	~~~
	$ ssh-keygen
	Generating public/private rsa key pair.
	Enter file in which to save the key (/home/reznoa/.ssh/id_rsa):
	Enter passphrase (empty for no passphrase):
	Enter same passphrase again:
	Your identification has been saved in /home/reznoa/.ssh/id_rsa.
	Your public key has been saved in /home/reznoa/.ssh/id_rsa.pub.
	The key fingerprint is:
	SHA256:oCGxU6yU9B820turJk7PsSkHtY9FQGfwgIwgI6SYopA reznoa@localhost.localdomain
	The key's randomart image is:
	+---[RSA 2048]----+
	|*+o=.o+.o        |
	|=++=+..=         |
	|E.+.+ *..        |
	|+ .o *.*.        |
	|.   ..ooS        |
	|    . . ..       |
	|    ...+.        |
	|   .oo+=.        |
	|   ..=*          |
	+----[SHA256]-----+
	~~~
2.	`id_rsa.pub` 파일을 `authorized_keys`로 설정
	~~~
	$ cd ~/.ssh/
	$ mv id_rsa.pub authorized_keys
	~~~
3.	`id_rsa` 파일 다운로드
4.	`puttygen.exe`으로 `id_rsa` 파일 변환: [Load], [Save private key]
5.	PuTTY Configuration에서
	1.	Connection > Data 화면의 Auto-login username 설정
	2.	Connection > SSH > Auth 화면의 Private key file for authentication: 항목에 위에서 변환했던 private key 파일 지정
	3.	Session 화면에서 [Save]
