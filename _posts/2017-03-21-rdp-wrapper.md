---
layout: post
title: "Windows Home 에디션에 RDP 서비스를 추가해주는, RDP Wrapper"
description: "간단하게 RDP 서비스를 추가해주는 RDP Wrapper를 소개한다."
category: 컴퓨터
tags: [Windows, RDP]
---

## 소개

Windows는 다양한 기능들을 제공하며,
이 기능들의 포함 여부에 따라 몇가지 에디션으로 나누어 팔고있다.
물론, 그에 따라 가격 차이도 난다.
하지만, 대부분의 개인 사용자는 Home 보다 높은 에디션의 기능이 필요하지 않다.
오히려 Home보다 더 적은 최소한의 구성으로 아주 싼 에디션이 있으면 좋겠다 싶을 정도다.

단, 원격 데스크톱은 빼고 말이다.
물론 VNC 등을 쓰는 방법도 있긴 하지만,
역시 이것저것 써보니 Windows엔 RDP만한게 없더라고.

이런 나같은 사람을 위한 유틸이 바로 [RDP Wrapper](https://github.com/stascorp/rdpwrap)다.
RDP Wrapper는 오픈소스로, GitHub를 통해 배보한다.

현재 최신 버전은 [v1.6.1](https://github.com/stascorp/rdpwrap/releases/download/v1.6.1/RDPWrap-v1.6.1.zip)이며,
다음 주소에서 얻을 수 있다:  
<https://github.com/stascorp/rdpwrap/releases>



## 설명

### 설치

압축을 풀고 관리자 권한으로 install.bat를 실행하면 설치한다.
따로 옵션 등 선택해야 할건 없다.

~~~
RDP Wrapper Library v1.6
Installer v2.3
Copyright (C) Stas'M Corp. 2016

[*] Notice to user:
  - By using all or any portion of this software, you are agreeing
  to be bound by all the terms and conditions of the license agreement.
  - To read the license agreement, run the installer with -l parameter.
  - If you do not agree to any terms of the license agreement,
  do not use the software.
[*] Installing...
[*] Terminal Services version: 10.0.14393.0
[+] This version of Terminal Services is fully supported.
[+] TermService found (pid 10160).
[*] Shared services found: CryptSvc, Dnscache, LanmanWorkstation, NlaSvc
[*] Extracting files...
[+] Folder created: C:\Program Files\RDP Wrapper\
[*] Downloading latest INI file...
[+] Latest INI file -> C:\Program Files\RDP Wrapper\rdpwrap.ini
[+] Extracted rdpw64 -> C:\Program Files\RDP Wrapper\rdpwrap.dll
[*] Configuring service library...
[*] Checking dependencies...
[*] Checking CertPropSvc...
[*] Checking SessionEnv...
[*] Terminating service...
[*] Starting CryptSvc...
[*] Starting Dnscache...
[-] StartService error (code 1056).
[*] Starting LanmanWorkstation...
[*] Starting NlaSvc...
[-] StartService error (code 1056).
[*] Starting TermService...
[*] Configuring registry...
[*] Configuring firewall...
확인됨

[+] Successfully installed.
______________________________________________________________

You can check RDP functionality with RDPCheck program.
Also you can configure advanced settings with RDPConf program.

계속하려면 아무 키나 누르십시오 . . .
~~~


### 업데이트

관리자 권한으로 update.bat를 실행하면 새 버전이 있나 확인한다.

~~~
RDP Wrapper Library v1.6
Installer v2.3
Copyright (C) Stas'M Corp. 2016

[*] Checking for updates...
[*] Current update date: 2017.05.29
[*] Latest update date:  2017.05.29
[*] Everything is up to date.

계속하려면 아무 키나 누르십시오 . . .
~~~


### 설치 제거

관리자 권한으로 uninstall.bat을 실행하면 설치 제거한다.

~~~
RDP Wrapper Library v1.6
Installer v2.3
Copyright (C) Stas'M Corp. 2016

[*] Uninstalling...
[+] TermService found (pid 936).
[*] Shared services found: CryptSvc, Dnscache, LanmanWorkstation, NlaSvc
[*] Resetting service library...
[*] Terminating service...
[*] Removing files...
[+] Removed file: C:\Program Files\RDP Wrapper\rdpwrap.ini
[+] Removed file: C:\Program Files\RDP Wrapper\rdpwrap.dll
[+] Removed folder: C:\Program Files\RDP Wrapper\
[*] Starting CryptSvc...
[*] Starting Dnscache...
[-] StartService error (code 1056).
[*] Starting LanmanWorkstation...
[*] Starting NlaSvc...
[-] StartService error (code 1056).
[*] Starting TermService...
[*] Configuring registry...
[*] Configuring firewall...

규칙을 1개 삭제했습니다.
확인됨

[+] Successfully uninstalled.

계속하려면 아무 키나 누르십시오 . . .
~~~


### 설정

옵션을 바꾸거나 설치 및 실행 상태를 확인하려면 RDPConf.exe를 실행한다.
Windows 기본 RDP 서비스에서는 연결 방법 정도만 설정할 수 있고
포트 번호 등은 직접 레지스트리를 고친다던가 해야 했는데,
RDPConf.exe에서는 그런것들도 바로 고칠 수 있어 편리하다.

![윈도우 원격 데스크톱 설정](https://lh3.googleusercontent.com/-gzUzjy-LWE8/WS-L7LyYjJI/AAAAAAAAUR4/lyQoJht0GrQcBSrIFxoRjM34LW-t8i9IwCE0/s0/windows-rdp-conf.png "Windows 기본 RDP 서비스 설정은 단순한것만 있다.")

![RDPConf.exe](https://lh3.googleusercontent.com/-IBMJbLR1Wc4/WS-MFfnGt0I/AAAAAAAAUSI/M7wb-XUklgId5FZ20nA4IHmdQyDi-w_PgCE0/s0/rdpwrapper-conf.png "RDPConf.exe에서는 포트 번호 등을 바로 바꿀 수 있다.")

더 나은 보안을 위해 포트 번호는 자기만의 번호로 바꾸는것을 추천한다.
