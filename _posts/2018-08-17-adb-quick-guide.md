---
layout: post
title: "adb Quick Guide"
description: "안드로이드 내부를 조작할 수 있게 해주는 adb 사용법과 자주 사용하는 명령을 소개한다."
category: 컴퓨터
tags: [Android, adb]
---

## adb 얻기

- [Android SDK Platform Tools](https://developer.android.com/studio/releases/platform-tools) 다운로드
- adb 관련 파일을 적당한 곳에 복사
  - Windows: adb.exe, AdbWinApi.dll, AdbWinUsbApi.dll
  - Linux: adb
  - Mac: adb
- 파일을 둔 경로를 PATH에 추가하면 편하게 쓸 수 있다.



## 사용법

1. 안드로이드 개발자 모드를 연다.
2. 기기 개발자 옵션에서 USB 디버깅 옵션 활성화
3. PC에 연결 후 기기에서 디버깅 허용
4. adb 서버 시작
5. 명령 수행



## 자주 사용하는 명령

command                                          | description
-------------------------------------------------|-------------------------------
adb start-server                                 | adb 서버를 시작한다.
adb kill-server                                  | adb 서버를 죽인다.
adb devices                                      | 연결된 디바이스를 본다.
adb wait-for-device                              | 디바이스 연결을 기다린다.
adb reboot                                       | 장치를 재시작한다.
adb shell ...                                    | 셸 명령을 수행한다.
adb shell mount -o rw,remount /system            | /system을 읽고 쓸 수 있게 다시 마운트 한다.
adb shell mount -o ro,remount /system            | /system을 읽기 전용으로 다시 마운트 한다.
adb push x.apk /storage/emulated/0/download/     | x.apk를 /storage/emulated/0/download/에 넣는다.
adb pull /storage/emulated/0/download/x.apk      | /storage/emulated/0/download/x.apk를 가져온다.
adb install x.apk                                | x.apk를 설치한다.
adb uninstall {packagename}                      | 패키지를 제거한다.
adb shell pm list packages                       | 설치된 패키지 목록을 본다.
adb shell pm list packages -f                    | 설치된 패키지와 해당 apk 파일 목록을 본다.
adb shell pm uninstall -k --user 0 {packagename} | 패키지 제거. 기본앱도 제거할 수 있으므로 신중히 사용할 것.
adb shell pm hide {packagename}                  | 패키지를 비사용 상태로 만든다.
adb shell pm unhide {packagename}                | 패키지를 비사용 상태에서 푼다.
adb shell am force-stop {packagename}            | 앱 강제 종료
adb shell wm size wm size {width}x{height}       | 화면 크기 변경
adb shell wm density {dpi}                       | 화면 DPI 변경
