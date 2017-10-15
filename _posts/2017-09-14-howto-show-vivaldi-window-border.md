---
layout: post
title: "Vivaldi Browser에 윈도우 테두리 주는 방법"
description: "Vivaldi Browser에 윈도우 테두리 주는 법을 소개한다."
category: 컴퓨터
tags: [Vivaldi, 테마, CSS, 커스터마이징]
---

비발디는 기본적으로 윈도우 테두리가 없다.
그래서 흰 바탕인 웹페이지를 볼 때는 경계가 없어 기묘하게 망가진 느낌도 들고,
윈도우 크기 조절도 쉽지 않다.

왜 이렇게 한건지;

다행히 Vivaldi 스타일을 바꿔 테두리를 넣을 수 있다.

1.	다음 파일을 연다:  
	`$VIVALDI_HOME\Application\1.11.917.43\resources\vivaldi\style\common.css`
	- '$VIVALDI_HOME'은 설치 경로를, '1.11.917.43'은 버전을 의미한다.
	- 버전은 설치 버전에 따라 달라질 수 있다.

2.	맨 끝에 다음처럼 보더 스타일을 추가한다:

	~~~
	body {
		border: 1px solid var(--colorAccentBg)
	}
	~~~

3.	재시작한다.

여기서 colorAccentBg는 Vivaldi의 강조색을 의미하는 것으로,
간단하게 타이틀바 색이라고 생각하면 된다.
만약, '테마'에서 '창에 강조 색상 적용' 옵션을 켰다면
웹 페이지에 따라 바뀌는걸 볼 수 있다.

이 방법은 Vivaldi 프로그램의 리소스 일부를 수정하는 것이므로
새 버전으로 업데이트하면 날아가버리는게 단점이다.
업데이트 후에는 다시 적용해줘야 한다.
