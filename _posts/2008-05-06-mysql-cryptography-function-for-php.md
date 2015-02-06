---
layout: post
title: "PHP를 위한 MySQL 암호화 함수"
description: ""
category: Developlay
tags: [PHP, MySQL, 암호화, 코드조각]
---

## 이번엔 PHP!

'[Java를 위한 MySQL 암호화 함수]({% post_url 2008-04-23-mysql-cryptography-function-for-java %})'에서 말했듯이, MySQL 암호화 함수를 다른 언어로 구현하기 시작한 이유는 'PHP와 JSP에서 동일하게 사용할 수 있는 단방향 암호화 알고리즘이 없을까'하는 거였다.

그래서, 이번엔 PHP다.



## 코드 소개

Java로 MySQL 암호화 함수를 구현할 때 그랬던 것처럼, PHP도 md5와 sha1은 이미 라이브러리에 구현된것을 사용한다.
말하자면, 랩퍼 함수(Wrapper Function)인 셈이다.

~~~
function md5( $str )
{
	if( $str === null )
		return null;

	$password = iconv('EUC-KR', 'UTF-8', $password);
	return md5($str);
}

function password( $password )
{
	if( $password === null )
		return null;
	if( strlen($password) == 0 )
		return '';

	$password = iconv('EUC-KR', 'UTF-8', $password);
	$r = sha1( $password, true );
	$r = sha1( $r );
	return '*'. strtoupper($r);
}
~~~

특이사항으로 iconv를 이용해 값을 변환하는 줄이 있는데, 이는 PHP 파일 인코딩으로 UTF-8을 쓸 경우에는 필요없다. 또, EUC-KR일 때를 기준으로 한 것이므로 다른 인코딩을 쓴다면 자신에게 맞는 케릭터셋으로 바꾸어야한다. (그냥 UTF-8 인코딩 사용을 권장한다.)

old_password는 직접 구현해야하는데, MySQL 원본 코드가 그리 복잡하지 않으므로 손쉽게 구현할 수 있다.
그러나, 이미 MySQL이 password의 구현을 바꾸면서 문제를 겪었던 사람들이 작성해 놓은 코드가 많으므로 나는 그런 떠돌아 다니는 코드를 건져다 썼다.
어차피 같은 코드가 나올거, 굳이 다시 짤 필요가 없거든.[^1]

[^1]: 원본인 MySQL 코드를 그대로 포팅하는 것이라 그렇다. 다를만한 점이라고 해봐야 개인 성향에 따른 코드 스타일 정도? 실제로 얼마나 비슷한가는 직접 원본이나 Java 코드와 비교해보면 알거다.

~~~
function old_password($password)
{
	if( $password === null )
		return null;
	if( strlen($password) == 0 )
		return '';

	$nr  = 1345345333;
	$add = 7;
	$nr2 = 0x12345671;

	$password = iconv('EUC-KR', 'UTF-8', $password);
	$chs = preg_split("//", $password);
	foreach ($chs as $ch) {
		if (($ch == '') || ($ch == ' ') || ($ch == '\t'))
			continue;
		$tmp = ord($ch);
		$nr  ^= ((($nr & 63) + $add) * $tmp) + ($nr << 8);
		$nr2 += ($nr2 << 8) ^ $nr;
		$add += $tmp;
	}

	$nr  &= 0x7fffffff;
	$nr2 &= 0x7fffffff;

	return sprintf( "%08x%08x", $nr, $nr2 );
}
~~~

코드를 완성했으면 class로 묶으면 끝이다.



## 완성 코드

코드가 다 붙어있긴 하지만, 따로 파일 만들어 쓰기 귀찮은 사람을 위해 클래스 파일과 테스트용 파일을 첨부한다.

- [MySQLPassword-PHP.zip](https://docs.google.com/uc?id=0BwvGvF1Iv2uAS2dSZUNtYVh4Wm8&export=download)

MySQLPassword.euc-kr.php는 파일 인코딩이 EUC-KR 일 때의 코드이며, 테스트는 대충 짰으니 필요하면 적당히 수정해서 쓰시라.

이 코드는 PHP5 이상에서 올바른 동작을 보장한다.



## 참고

- [마이그레이션 오류 정리 (zb4 기준)](http://www.zeroboard.com/?mid=mgrc_tip&page=1&document_srl=4218905)
- [PHP로 구현한 MySQL의 password 함수](http://www.phpschool.com/link/tipntech/20331)



[md5()]:http://kr.php.net/manual/en/function.md5.php
[sha1()]:http://kr.php.net/manual/en/function.sha1.php
