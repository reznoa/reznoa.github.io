---
layout: post
title: "adb를 이용한 Android 해상도, dpi 변경"
category: 컴퓨터
tags: [Android, adb, 설정, 해상도]
---

루팅을 하면 해상도와 dpi를 자유롭게 바꿀 수 있으나,
adb를 이용하면 루팅과 상관없이 순정에서도 해상도와 dpi를 바꿀 수 있다.

1.	adb 준비
	1.	[Stand-alone SDK Tools](http://developer.android.com/sdk/index.html#Other) 다운로드
	2.	SDK Manager를 이용, Android SDK Platform-tools 설치
2.	기기에 맞는 USB 드라이버 설치
	-	LG 기기
		-	기기 연결 후 'USB PC 연결'에서 'PC 드라이버 설치' 선택 후 마운트된 이미지에서 드라이버 설치
		-	[LG Mobile : 다운로드센터](https://www.lgmobile.co.kr/lgmobile/front/download/retrieveDownloadMain.dev)에서 'LG United Mobile Driver' 다운로드, 설치
	-	삼성 기기
		-	[삼성 휴대폰 지원센터 - 통합 USB 드라이버](http://local.sec.samsung.com/comLocal/support/down/kies_main.do?kind=usb)에서 다운로드, 설치
3.	USB 디버깅 옵션 켜기
	1.	'개발자 옵션'이 활성화 되어있지 않다면,
		[설정 - 휴대폰 정보 - 소프트웨어 정보]에서 [빌더 번호]를 연속 탭해서 활성
	2.	[개발자 옵션]에서 'USB 디버깅' 항목에 체크
4.	PC와 연결
	-	USB 디버깅으로 연결되면 상단바에 아이콘이 표시됨
	-	USB 디버깅이 활성화 되지 않을 경우, USB 연결을 '충전 전용' 대신 MTP 등으로 변경
5.	콘솔에서 Android SDK Platform-tools 설치 위치(android-sdk/platform-tools)로 이동
6.	기기 찾기: `adb devices`
	-	연결한 기기 표시 옆에 유형이 device로 떠야 한다.
	-	unauthorized로 뜬다면, 기기에 USB 디버깅 허용 팝업이 떠 있을테니 허용을 누르면 된다.
7.	adb 셸 띄우기: `adb shell`
8.	adb 셸에서 해상도와 dpi 변경
	1.	`wm size {width}x{height}`
	2.	`wm density {dpi}`
9.	기기 재부팅

기기 재부팅을 안해도 적용되기는 하지만,
설정이 안전하게 적용된 상태에서 쓰려면 한번 재부팅 해주는게 좋다.
