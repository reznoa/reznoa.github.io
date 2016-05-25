---
layout: post
title: "Oracle - AUTO INCREMENT 흉내내기"
description: "Oracle에서 AUTO INCREMENT를 흉내내봤다."
category: Developlay
tags: [Oracle, SQL, 코드조각]
---

AUTO INCREMENT는 MySQL을 통해 익숙해진 구문인데, ID 등에 사용하면 값을 증가시키면서 자동으로 유일한 값을 넣어주는 편리한 녀석이다.
그런데, Oracle은 이게 없다.
조금 불편하긴 하지만 훨씬 강력한 SEQUENCE가 있기 때문이다.

그래서, SEQUENCE를 이용해 AUTO INCREMENT를 흉내내는 TRIGER를 등록해 쓰기도 한다만, 사실 굳이 그렇게까지 뻑적지근하게 제대로 만들것 까지는 없다. ID란 절대적으로 유일하지는 않더라도 어쨌든 현 상황에서 겹치지만 않으면 되는 것이기 때문이다.

SEQUENCE와 TRIGER 같은걸 [Max 함수][]를 이용하면 다음처럼 손쉽게 새 ID를 만들어 낼 수 있다:

~~~
INSERT INTO
	targetTable
	(id, ... )
VALUES
	(SELECT To_Number('0' || Max(id))+1 FROM targetTable),
	...
;
~~~

굳이 설명할 것도 없겠지만, 가장 큰 ID값을 가져와 그보다 1 큰 값을 만들어 내는 쿼리를 쓴 것이다.
여기서 [To_Number 함수][]를 쓴게 주요한데, 레코드가 하나도 없을 경우 Max(id)+1은 NULL이 되기 때문이다.

앞에 '0'을 붙인것 역시 레코드가 없을때를 위한거다.
To_Number 함수는 입력값이 비어있을 경우 NULL을 반환하기 때문이다.
그러므로, Max(id)로 값을 얻지 못했을 때에도 올바로 숫자 변환을 하기 위해서는
앞에 '0'을 붙여 늘 숫자를 나타내도록 해야한다.

이 방법은 ID를 1부터 시작하여 언제나 유일한 ID가 생성될 것을 보장하지만, 앞서 말했듯이 '늘 새로운 값' 즉 '절대 유일한 값'을 만들어내는것은 아니다.
예를들어, 새로운 레코드를 삽입한 후 지우면, 다음에 추가하는 레코드가 방금 지운 레코드와 같은 ID를 갖게 되거든.
그러므로 이 ID 값을 이용해 관계를 맺을때는 이 점을 주의해야한다.



[Max 함수]: http://download-west.oracle.com/docs/cd/B10501_01/server.920/a96540/functions70a.htm
[To_Number 함수]: http://download-west.oracle.com/docs/cd/B10501_01/server.920/a96540/functions145a.htm
