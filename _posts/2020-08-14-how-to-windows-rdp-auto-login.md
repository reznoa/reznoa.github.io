---
layout: post
title: "윈도우 원격 데스크탑 자동 로그인"
category: 컴퓨터
tags: [Windows, 원격데스크탑, 자동로그인]
---

### username, password 자동 입력

1.	원격 데스크탑(mstsc) 실행
2.	접속할 원격 컴퓨터 이름 입력
3.	[옵션 표시(&O)]를 누른 다음, [다른 이름으로 저장(V)...] 버튼을 눌러 rdp 파일 생성
4.	생성한 rdp 파일을 열어 다음 내용 추가
	~~~
	username:s:YOURUSERID
	password 51:b:YOUENCRYPTEDPASSWORD
	~~~



### 파워쉘을 이용한 YOUENCRYPTEDPASSWORD 생성 방법

~~~
> powershell
PS> ("YOUPASSWORD" | ConvertTo-SecureString -AsPlainText -Force) | ConvertFrom-SecureString
~~~
