---
layout: post
title: "Oracle - 명령행에서 간단한 쿼리 바로 실행하기"
category: Developlay
tags: [Oracle, 스크립트]
---

콘솔에서 Oracle에 질의할 때는 주로 sqlplus를 쓰는데, 간단한 쿼리를 쓸때는 좀 번거롭게 느껴질때가 있다.
예를들어, 간단한 SELECT 하나 날려보려고 할 때.
그냥 명령행에서 쿼리만 줘서 할 순 없을까?

리디렉션을 이용하면 손쉽게 가능하다.

예를들면 이런 식이다:

~~~
$ sqlplus scott/tiger < test.sql
~~~

다만, 이건 실행할 쿼리를 담은 *.sql이 있을 때 얘기고, 그냥 쿼리를 쳐서 결과를 보고 싶을때는 echo를 이용하면 된다.

~~~
$ echo "SELECCT * FROM dual" | sqlplus scott/tiger
~~~

출력 결과를 자동 테스트 따위에서 비교하려면 결과를 좀 만져줘야한다. sqlplus가 날짜와 시간도 출력하기 때문이다. [substring]({% post_url 2009-02-20-howto-substring-in-linux-shell %})으로 간단하게 잘라낼 수 있다.

~~~
REZ_STR=`echo "$2" | sqlplus $1`
REZ_STR=${REZ_STR#*SQL> }
REZ_STR=${REZ_STR%SQL> *}
echo -e "$REZ_STR"
~~~

이걸 스크립트로 저장해두고 쓰면, 다음과 같이 쿼리를 수행해 결과를 확인할 수 있다:

~~~
$ sqlora scott/tiger "SELECT * FROM dual"
~~~

더 한다면 id/pwd도 아예 박아두거나 할 수도 있다.
그러면 쓸때 쳐야하는걸 더 줄일 수 있다.
