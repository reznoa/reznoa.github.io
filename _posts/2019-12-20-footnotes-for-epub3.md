---
layout: post
title: "epub3를 위한 주석 달기"
category: 컴퓨터
description: "epub 책을 보다가 거지같은 주석에 빡쳐서 정리해본다. 앞으론 이렇게 하라고."
tags: [epub, 주석]
---

### xmlns:epub 속성 넣기

epub 태그를 쓰기 위해서 `<html>` 태그에 `xmlns:epub="http://www.idpf.org/2007/ops"`를 추가한다.

~~~
<html
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:xml="http://www.w3.org/XML/1998/namespace"
	xmlns:epub="http://www.idpf.org/2007/ops"
	xml:lang="ko">
~~~



### noteref 넣기

주석을 달 단어에 `<sup>`과 `<a>` 대그를 붙인다.
이 때, `epub:type` 속성과 `href`, `id` 값 매칭에 주의한다.

~~~
<a epub:type="noteref" id="nr010201" href="#fn010201">SF<sup>1)</sup></a>
<a epub:type="noteref" id="nr010202" href="#fn010202">판타지<sup>2)</sup></a>
<a epub:type="noteref" id="nr010203" href="#fn010203">미스터리<sup>3)</sup></a>
<a epub:type="noteref" id="nr010204" href="#fn010204">소설<sup>4)</sup></a>
<a epub:type="noteref" id="nr010205" href="#fn010205">만화<sup>5)</sup></a>
<a epub:type="noteref" id="nr010206" href="#fn010206">에세이<sup>6)</sup></a>
~~~

개인적으로 주석은 fn, 되돌아올 곳은 nr을 prefix로 하고
그 뒤에 section, part, foonote 번호를 붙여 유일값을 만든다.
예를 들어, 1부 1장의 첫번째 주석이라면 fn010101 처럼 만드는 식이다.

기존에 주석을 위한 `<a>` 태그는 `<sup>`에만 붙이는게 일반적이었는데,
그렇게 할 경우 모바일에서 잘못된 곳을 누르기 쉽고
팝업 주석에서 해당 부분만 타이틀로 표시되므로
epub 주석에서는 그리 좋지 않다.

주석을 달 단어까지 `<a>` 태그로 묶으면
모바일에서도 누르기 쉽고,
무엇에 대한 주석인지도 명확하게 표시되므로 주석 역할에도 잘 맞다.



### footnote 넣기

주석 설명은 `<aside>`와 `<a>` 태그로 달아준다.
이 때, `epub:type` 속성과 `id`, `href` 값 매칭에 주의한다.

~~~
<p>...</p>
<p>&nbsp;</p>
<div class="footnote">
<p class="footfncaption">註.</p>
<aside epub:type="footnote" id="fn010201"><a href="#nr010201">1)</a> Science Fiction. 과학적인 지식을 토대로 하여 시간과 공간의 테두리를 벗어난 일을 가상하여 만든 이야기</aside>
<aside epub:type="footnote" id="fn010202"><a href="#nr010202">2)</a> 가공의 세계를 배경으로 하거나 초현실적인 존재 또는 사건을 다루는 문학 장르</aside>
<aside epub:type="footnote" id="fn010203"><a href="#nr010203">3)</a> 괴기스럽고 비밀스러운 사건을 추리해 나가는 과정을 중심으로 구성한 작품</aside>
<aside epub:type="footnote" id="fn010204"><a href="#nr010204">4)</a> 사실이나 허구의 이야기를 작가의 상상력과 구성력을 가미하여 산문체로 쓴 문학의 한 갈래</aside>
<aside epub:type="footnote" id="fn010205"><a href="#nr010205">Fn. 5)</a> 여러 장면으로 이어져 이야기 형식을 가진 그림</aside>
<aside epub:type="footnote" id="fn010206"><a href="#nr010206">Footnote 6.</a> 형식에 얽매이지 않고 듣고 본 것, 체험한 것, 느낀 것 따위를 생각나는 대로 쓰는 산문 형식의 짤막한 글 <a href="#nr010201">↩</a></aside>
</div>
~~~

주석 번호만 `<a>` 태그로 묶으면 모바일에 누르기 어려운 것은 여기서도 마찬가지이나,
대부분의 epub 뷰어가 팝업 주석을 지원하므로 여기서는 전체 내용을 묶지 않았다.

팝업 주석을 지원하지 않는 뷰어를 자주 사용한다면 전체를 묶거나,
'Footnote 1.'처럼 prefix를 달아 길게 만들면 누르기 편하다.
주석 끝에 회귀를 위한 링크를 추가하는 것도 좋다.
끝에 붙일 회귀 링크를 위한 문자는 '↩'나 '⮌' 정도면 적당하다.

주석이 담긴 `<div>`나 `<aside>`에는 따로 `margin`, `padding` 등의 스타일을 주지 않는 게 좋은데,
팝업 주석을 지원하는 뷰어 중에는 해당 스타일까지도 팝업에 적용해 보여주는 게 있기 때문이다.
위 예에서 본문과 주석의 간격 조절을 위해 굳이 `<p>&nbsp;</p>`를 사용한 것도 그 때문이다.

주석 달 단어를 감싼 `<a>` 태그의 id 속성과
주석 내용을 담은 `<aside>` 태그 내의 복귀를 위한 `<a>` 태그는
'팝업 주석'이나 '이전 위치로 돌아가기' 등을 지원하지 않는 뷰어를 위한 것이다.
그러므로 이것들은 생략해도 주석 기능에는 문제가 없으나,
뷰어에 따라 자칫 불편을 초래할 수 있으므로 가능한 넣어두는 것을 권한다.
