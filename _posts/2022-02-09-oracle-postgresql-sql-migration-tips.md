---
layout: post
title: "Oracle - PostgreSQL 쿼리 변환 시 주의할 점"
description: "Oracle와 PostgreSQL 간에 쿼리 변환을 할 때, 미묘하게 차이 때문에 실수하기 쉬운 것들을 모아본다."
category: Programing
tags: [SQL, Oracle, PostgreSQL]
---

### NULL과 ''(빈 문자열)

Oracle은 ''도 NULL처럼 처리되는 경우가 있다.

ex               | Result
-----------------|---------
`NVL('', 0)`     | 0
`'' IS NULL`     | true
`'' IS NOT NULL` | false

PostgreSQL은 기본적으로 NULL과 ''를 엄격히 구분한다.

ex                | Result
------------------|---------
`COALESCE('', 0)` | ''
`'' IS NULL`      | false
`'' IS NOT NULL`  | true

PostgreSQL에서는
입력값을 NULL, '' 둘 중 하나로 통일하거나,
값 처리 부분에서 둘 모두를 고려하도록 해야한다.

Oracle              | PostgreSQL
--------------------|--------------------------------------------------------------
`NVL(val, 'false')` | `CASE WHEN val IS NULL OR val = '' THEN 'false' ELSE val END`
                    | `COALESCE(NULLIF(val, ''), 'false')`



### SUBSTR

`SUBSTR(strval, position [, length])` 함수의 position 인자 처리 방식이 다르다.

Val | Oracle                             | PostgreSQL
----|------------------------------------|---------------------------------------------
> 0 | 1부터 시작하는, 앞에서부터의 위치  | 1부터 시작하는, 앞에서부터의 위치
0   | 1과 동일                           | 1과 동일. 단, length에 -1의 영향을 끼침
< 0 | -1부터 시작하는, 뒤에서부터의 위치 | 1과 동일. 단, length에 n - 1의 영향을 끼침

Oracle의 것은 나름 정리되어있다만, PostgreSQL의 것은 이상하다.
그것이 다음과 같은 결과를 만든다:

SQL                              | Oracle  | PostgreSQL
---------------------------------|---------|------------
`SUBSTR('123456789dcba', 4, 3)`  | `'456'` | `'456'`
`SUBSTR('123456789dcba', 3, 3)`  | `'345'` | `'345'`
`SUBSTR('123456789dcba', 2, 3)`  | `'234'` | `'234'`
`SUBSTR('123456789dcba', 1, 3)`  | `'123'` | `'123'`
`SUBSTR('123456789dcba', 0, 3)`  | `'123'` | `'12'`
`SUBSTR('123456789dcba', -1, 3)` | `'a'`   | `'1'`
`SUBSTR('123456789dcba', -2, 3)` | `'ba'`  | `''`
`SUBSTR('123456789dcba', -3, 3)` | `'cba'` | `''`
`SUBSTR('123456789dcba', -4, 3)` | `'dcb'` | `''`

...차라리 에러를 뱉지 그래?



### DATE, TIMESTAMP, SYSDATE, CURRENT_DATE, CURRENT_TIMESTAMP, CLOCK_TIMESTAMP, TO_DATE, TO_TIMESTAMP

Oracle의 DATE가 DATETIME(또는 TIMESTAMP)의 약어처럼 쓰이는 것과 달리,
PostgreSQL은 둘을 구분한다.

PostgreSQL에서 DATE 값과 함수는 시, 분, 초를 버리므로
이 값이 필요하다면 반드시 TIMESTAMP 용을 사용해야 한다.

Oracle                                          | PostgreSQL
------------------------------------------------|-----------------------------------------------------
`SYSDATE`                                       | `CURRENT_TIMESTAMP`
`TO_DATE('20211213142345', 'YYYYMMDDHH24MISS')` | `TO_TIMESTAMP('20211213142345', 'YYYYMMDDHH24MISS')`
`TRUNC(SYSDATE)`                                | `CURRENT_DATE`

하나 더,
PostgreSQL은 성능을 위해 한 트랜잭션 내의 `CURRENT_TIMESTAMP`이 모두 같은 값을 반환한다.

<table>
<tr>
<th>DB</th>
<th>Test SQL</th>
<th>Result</th>
</tr>
<tr>
<td>Oracle</td>
<td><pre>
BEGIN
	DBMS_OUTPUT.PUT_LINE('S=' || TO_CHAR(SYSDATE, 'MI:SS'));
	DBMS_LOCK.Sleep(1);
	DBMS_OUTPUT.PUT_LINE('E=' || TO_CHAR(SYSDATE, 'MI:SS'));
END;
</pre></td>
<td><pre>
S=53:38
E=53:39
</pre></td>
</tr>
<tr>
<td rowspan="2">PostgreSQL</td>
<td><pre>
DO $$
DECLARE
	v_tmp VARCHAR;
BEGIN
	RAISE INFO 'S=%', TO_CHAR(CLOCK_TIMESTAMP(), 'MI:SS');
	SELECT Pg_Sleep(1) INTO v_tmp;
	RAISE INFO 'E=%', TO_CHAR(CLOCK_TIMESTAMP(), 'MI:SS');
END $$;
</pre></td>
<td><pre>
S=53:38
E=53:39
</pre></td>
</tr>
<tr>
<td><pre>
DO $$
DECLARE
	v_tmp VARCHAR;
BEGIN
	RAISE INFO 'S=%', TO_CHAR(CURRENT_TIMESTAMP, 'MI:SS');
	SELECT Pg_Sleep(1) INTO v_tmp;
	RAISE INFO 'E=%', TO_CHAR(CURRENT_TIMESTAMP, 'MI:SS');
END $$;
</pre></td>
<td><pre>
S=53:38
E=53:38
</pre></td>
</tr>
</table>

만약, Oracle `SYADATE`처럼 매번 새로운 값을 얻어야 한다면
`CURRENT_TIMESTAMP` 대신 `CLOCK_TIMESTAMP()`를 사용해야 한다.



### REGEXP_REPLACE

함수명은 같지만,
시그니처부터 Oracle과 PostgreSQL은 다음처럼 서로 다르다:

DB         | Signature
-----------|------------------------------------------------------------------------------------------
Oracle     | `REGEXP_REPLACE(source, pattern [, replacement [, position [, occurrence [, flags ]]]])`
PostgreSQL | `REGEXP_REPLACE(source, pattern, replacement [, flags ])`

기본 동작도 Oracle은 모든 일치 부분을 바꾸지만,
PostgreSQL은 처음 일치 부분만 바꾼다.

반드시 추가인자(Oracle: occurrence, PostgreSQL: flags)로 맞춰줘야 한다.

occ | Oracle                                         | PostgreSQL
----|------------------------------------------------|----------------------------------------------
\*  | `REGEXP_REPLACE('aabcabac', 'ab', 'AB')`       | `REGEXP_REPLACE('aabcabac', 'ab', 'AB', 'g')`
1   | `REGEXP_REPLACE('aabcabac', 'ab', 'AB', 1, 1)` | `REGEXP_REPLACE('aabcabac', 'ab', 'AB')`
