---
layout: post
title: "Oracle - PostgreSQL 쿼리 변환 시 주의할 점"
description: "Oracle와 PostgreSQL 간에 쿼리 변환을 할 때, 미묘하게 차이 때문에 실수하기 쉬운 것들을 모아본다."
category: Programing
tags: [Oracle, PostgreSQL]
---

### NULL과 ''(빈 문자열)

Oracle은 ''도 NULL처럼 처리되는 경우가 있다.
ex) `NVL('', 0) = 0`

PostgreSQL은 기본적으로 NULL과 ''를 엄격히 구분한다.
ex) `COALESCE('', 0) = ''`

입력값을 NULL, '' 둘 중 하나로 통일하거나,
값 처리 부분에서 둘 모두를 고려하도록 해야한다.

Oracle              | PostgreSQL
--------------------|--------------------------------------------------------------
`NVL(val, 'false')` | `CASE WHEN val IS NULL OR val = '' THEN 'false' ELSE val END`
                    | `COALESCE(NULLIF(val, ''), 'false')`



### SUBSTR

`SUBSTR(strval, position [, length])` 함수의 position 인자 처리 방식이 다르다.

값   | Oracle                             | PostgreSQL
-----|------------------------------------|---------------------------------------------
양수 | 1부터 시작하는, 앞에서부터의 위치  | 1부터 시작하는, 앞에서부터의 위치
0    | 1과 동일                           | 1과 동일. 단, length에 -1의 영향을 끼침
음수 | -1부터 시작하는, 뒤에서부터의 위치 | 1과 동일. 단, length에 n - 1의 영향을 끼침

Oracle의 것은 나름 정리되어있다만, PostgreSQL의 것은 이상하다.
그것이 다음과 같은 결과를 만든다:

예                               | Oracle  | PostgreSQL
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



### DATE, TIMESTAMP, SYSDATE, CURRENT_DATE, CURRENT_TIMESTAMP, TO_DATE, TO_TIMESTAMP

Oracle의 DATE가 DATETIME(또는 TIMESTAMP)의 약어처럼 쓰이는 것과 달리,
PostgreSQL은 둘을 구분한다.

PostgreSQL에서 DATE 값과 함수는 시, 분, 초를 버리므로
이 값이 필요하다면 반드시 TIMESTAMP 용을 사용해야 한다.

Oracle                                          | PostgreSQL
------------------------------------------------|-----------------------------------------------------
`SYSDATE`                                       | `CURRENT_TIMESTAMP`
`TO_DATE('20211213142345', 'YYYYMMDDHH24MISS')` | `TO_TIMESTAMP('20211213142345', 'YYYYMMDDHH24MISS')`
`TRUNC(SYSDATE)`                                | `CURRENT_DATE`



### REGEXP_REPLACE

함수명은 같지만,
시그니처부터
Oracle은 `REGEXP_REPLACE(source, pattern [, replacement [, position [, occurrence [, flags ]]]])`
PostgreSQL는 `REGEXP_REPLACE(source, pattern, replacement [, flags ])`로 서로 다르다.

기본 동작도 Oracle은 모든 일치 부분을 바꾸지만,
PostgreSQL은 처음 일치 부분만 바꾼다.

반드시 추가인자(Oracle: occurrence, PostgreSQL: flags)로 맞춰줘야 한다.

DB         | SQL                                            | Result
-----------|------------------------------------------------|----------
Oracle     | `REGEXP_REPLACE('aabcabac', 'ab', 'AB')`       | aABcABac
Oracle     | `REGEXP_REPLACE('aabcabac', 'ab', 'AB', 1, 1)` | aABcabac
PostgreSQL | `REGEXP_REPLACE('aabcabac', 'ab', 'AB')`       | aABcabac
PostgreSQL | `REGEXP_REPLACE('aabcabac', 'ab', 'AB', 'g')`  | aABcABac
