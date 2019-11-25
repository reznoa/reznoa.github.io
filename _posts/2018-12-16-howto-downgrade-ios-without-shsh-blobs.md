---
layout: post
title: "iPad 3 (WiFi)를 살려주는 iOS 다운그레이드"
description: "느려터져 못써먹을 것이 되어버린 iPad 3를 살리기 위한 iOS 다운그레이드 방법을 정리해본다."
category: 컴퓨터
tags: [iOS, iPad, 다운그레이드]
---

## 준비

1. 가능하면 DFU 복원을 통해 깨끗한 상태 초기화
   - 설정이나 파일 찌꺼기가 남아 꼬이는 경우가 있기 때문.
2. [Phoenix jailbreak](https://phoenixpwn.com/)를 이용해 9.3.5 탈옥

## 9.3.5 ==> 8.4.1 다운그레이드

iFile 등을 설치해
`/System/Library/CoreServices/SystemVersion.plist` 파일의 버전 정보를 하위 버전으로 수정한다.

예를 들어, iPad 3 (WiFi)는 다음과 같이 바꾸면 된다.

항목                | 원본  | 수정
--------------------|-------|-------
ProductVersion      | 9.3.5 | 5.1
ProductBuildVersion | 13G36 | 9B176

만약, 다른 기기 다운그레이드를 시도한다면 [IPSW Downloads](https://ipsw.me/#!/version) 등을 참고한다.

파일 수정, 저장을 확인한 후 리부트한다.

리부트 후 '설정'을 열고 [일반 > 소프트웨어 업데이트] 메뉴에서 OTA를 실시한다.
6.1.3이 가능하면 좋겠지만, 아쉽게도 iPad 3는 8.4.1만 설치 가능하다.

설치가 완료되면 '설정'을 열고 [일반 > 재설정] 메뉴에서
'모든 콘텐츠 및 설정 지우기'를 다시한번 수행해준다.

## 탈옥

탈옥이 필요하다면 [etasonJB](https://etasonjb.tihmstar.net/)를 이용한다.

데이터 새로 고침 중 <repo666.ultrasn0w.com> 때문에 에러가 난다면 제거해도 좋다.
언락을 위해 사용하던 소스였으나, etasonJB에서는 딱히 이를 필요로하지 않기 때문이다.

iOS 8에서 사용할 수 있는 유용한 무료 트윅들은 다음과 같다:

name                    | pacakage                         | description
------------------------|----------------------------------|------------------------------------------
ShowCase                | jp.ashikase.showcase             | 키보드 대소문자를 제대로 표시해줌
iFile                   | eu.heinelt.ifile                 | 최고의 파일 관리 앱
FlipControlCenter       | com.rpetrich.flipcontrolcenter   | 제어센터 토글 버튼을 조작할 수 있게 해줌
OpenSSH                 | openssh                          | 컴퓨터에서 콘솔 접속을 할 수 있게 해줌
SSH Connect             | com.officialscheduler.sshconnect | 설정에 SSH 항목 추가
SSH Switch              | com.jamied360.switch.ssh         | 제어센터에서 SSH를 켜고 끌 수 있게 해줌
APT 0.7 Strict          | apt7                             | 콘솔에서 apt-get을 사용할 수 있게 해줌
Vi IMproved             | vim                              | 콘솔용 텍스트 파일 편집기
adv-cmds                | adv-cmds                         | 콘솔용 유틸 모음(finger, fingerd, last, lsvfs, md, ps)
FullForce               | com.booleanmagic.fullforce       | iPhone용 앱을 iPad 화면에 맞게 늘려줌. 다 되진 않음.
HideMe8 (iOS 8)         | com.cpdigitaldarkroom.hideme8    | 아이콘을 비롯한 다양한 UI를 감출 수 있게 해주는 트윅

<!--
https://www.redmondpie.com/jailbreak-ios-9.3.5-32-bit-devices-with-phoenix-ipa-heres-how-download/
https://www.redmondpie.com/downgrade-ios-9.3.5-to-8.4.1-6.1.3-without-shsh-blobs-on-any-32-bit-device-and-untether-jailbreak/
http://onehundredpanda.blogspot.com/2017/11/etc-ipad3rd-generation-935-to-841.html
http://osxdaily.com/2011/11/10/ios-ota-update-not-working-fix/
https://blog.bypass.sh/1113
-->
