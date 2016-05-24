---
layout: post
title: "Oracle을 위한 PHP 코드조각"
category: Developlay
tags: [PHP, Oracle, 코드조각]
excerpt_separator: <!--more-->
---

자주 쓰지는 않기에 외우기는 귀찮은, Oracle을 위한 PHP 코드조각이다.
<!--more-->
설명따윈 불필요하므로 코드로 말한다.

~~~
$conn = ociLogon( 'userName','password','dbName' )
	or die( '오라클 서버에 접속할수 없습니다.' . ocierror() );

$stmt = ociParse( $conn, $query );
if( ! ociExecute($stmt) ) {
	// 실패했을 경우
}
else {
	$rowcount = ociFetchStatement($stmt, $rows);
	if( $rowcount == 0 ) {
		// 아무것도 없을 경우
	}
	else
	for( $i=0; $i<$rowcount; $i++ ) {
		// 할거 하슈

		// 필드에 접근하는 방법은 $rows['FIELDNAME'][rowIndex]
		// FIELDNAME : 반드시 대문자를 사용할 것. 필요하다면 strtoupper() 사용.
		// rowIndex : 검색된 행 인덱스. 0부터 시작. $i 사용.
	}
}

ociLogoff( $conn );
~~~
