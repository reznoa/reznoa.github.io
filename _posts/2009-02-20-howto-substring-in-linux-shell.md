---
layout: post
title: "Linux 셸에서 문자열 자르는 방법"
category: PC
tags: [Linux, 스크립트, 문자열조작]
---

Linux shell에서 간단하게 substring을 하는 방법은 다음과 같다.

~~~
s="this is test string."
echo \${s#* }\  = ${s#* }   #is test string.
echo \${s##* }  = ${s##* }  #string.
echo \${s% *}\  = ${s% *}   #this is test
echo \${s%% *}  = ${s%% *}  #this
~~~

\#는 string.left(), %는 string.right() 같은 기능을 한다고 보면 되며, 일반적인 substring과는 '구분자'를 기준으로 자른다는 점이 약간 다르다.

4가지 substring 방법은 전략, 후략을 나타내기 위해 *를 사용하며 자세한 의미는 다음과 같다:

op  | desc
----|-----
\#  | 첫 delm 왼쪽 문자열 삭제
\## | 끝 delm 왼쪽 문자열 삭제
%   | 끝 delm 오른쪽 문자열 삭제
%%  | 첫 delm 오른쪽 문자열 삭제