---
layout: post
title: "Java를 위한 MySQL 암호화 함수"
description: ""
category: Developlay
tags: [Java, MySQL, 암호화, 코드조각]
---

## 이미 있었다!

처음 시작은 'PHP와 JSP에서 동일하게 사용할 수 있는 단방향 암호화 알고리즘이 없을까'란 생각에서였다. 그래서 일단 검색을 해봤다가 '[MySQL 암호화함수를 큐브리드 JSP로 사용하기](http://www.phpschool.com/link/tipntech/59063)'란 글을 발견했다.[^1] 역시, '내가 생각하는것은 높은 확률로 다른 사람도 생각한다.'는 말은 진실인가보다.

[^1]: 같은 글이 [다른곳](http://cafe.naver.com/studycubrid/32)에도 있다. 닉이 같은걸 보니, 작자가 여러곳에 올린 듯하다.

그런데, 대견해하던것도 찰나. 이게 좀 이상했다.


## 버그란 어디에나 존재하기에 버그인 것.

중복 코드라던가 코딩 스타일은 제쳐두자.
그런건 개인의 성향이니까.

중요한것은 MySQL과 다르다는 거다.
물론, md5와 password는 Java에서 제공하는 알고리즘을 이용하므로 MySQL과 같다.
문제는 old_password다.
이놈은 변환할 값에 한글이 있을 경우 MySQL과 다른 값을 반환했다.

그래서, [MySQL 5.1](http://downloads.mysql.com/archives.php?p=mysql-5.1&amp;v=5.1.23a) 소스를 참고해 다시 구현해보기로했다.


## 문제는?

문제를 정리하면 다음과 같다:

- Java는 unsigned가 없다.[^2]
- 상수와 signed, 상수와 unsignd의 & 연산 결과는 다를 수 있다.
- MySQL에서 old_password를 처리하는 내부 함수 hash_password는 UTF-8 값을 받는다. (추측임;)

[^2]: unsigned 값이 필요하다면 더 큰 단위를 써야한다. unsinged short이 필요하다면 int를 쓰는 식.

그러니, 다음과 같이 수정해야한다:

~~~
bpara = inpara.getBytes( Charset.forName("UTF-8") );

for (int i=0; i < bpara.length; i++) {
	if (bpara[i] == ' ' || bpara[i] == '\t')
		continue;

	nr   ^= (((nr & 63) + ladd) * (0xFF & bpara[i])) + (nr << 8);
	nr2  += (nr2 << 8) ^ nr;
	ladd += (0xFF & bpara[i]);
}
~~~

앞서 기존 코드의 문제점을 언급했으니, 세세한 차이까지 설명하진 않겠다.

여기에 다음처럼 인자 확인 코드까지 넣으면 MySQL과 완전히 동등해진다.

~~~
if( inpara == null )
	return null;
if( inpara.isEmpty() )
	return "";
~~~


## 완성 코드

old_password가 필요할 일이야 크게 없겠다만, 그래도 이정도면 나름 쓸만한 유틸리티 클래스라고 생각하여, 혹시 필요한 사람을 위해 작성한 코드를 붙여둔다.

- [MySQLPassword-Java.zip](https://docs.google.com/uc?id=0BwvGvF1Iv2uASUVSNHZKRlBWTzQ&export=download)

압축 파일에는 MySQL의 단방향 암호화 함수를 Java로 구현한 클래스와 그 테스트용 파일이 들어있다. 테스트는 (귀찮아서) 대충 콘솔로 짰으니, 필요하다면 유닛테스트로 바꿔서 사용하시라.