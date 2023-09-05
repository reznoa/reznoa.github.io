---
layout: post
title: "IntelliJ IDEA Quick Guide"
description: "IntelliJ IDEA를 쓸 때 유용한 정보들을 정리해본다."
category: Programing
tags: [PuTTY, SSH]
---

### Tomcat 사용

Community Edition는 Application server integration를 지원하지 않는다.

- [Smart Tomcat](https://plugins.jetbrains.com/plugin/9492-smart-tomcat) 사용




### spring boot active profile 설정

실행 설정에서 다음 중 하나 선택해 설정(local 프로필을 사용할 경우):
- VM options: `-Dspring.profiles.active=local`
- Environment variables: `spring.profiles.active=local`



### unmappable character for encoding MS949

UTF-8을 쓰고 있다면,

1.	인코딩 설정 변경
	-	설정에서 Encoding 검색
	-	인코딩 설정을 모두 UTF-8로 변경
2.	실행 옵션 변경
	-	메뉴에서 Help > Edit Custome VM OPtions...
	-	편집기가 뜨면, 다음 내용 추가
		~~~
		-Dfile.encoding=UTF-8
		-Dconsole.encoding=UTF-8
		~~~
	-	재실행
