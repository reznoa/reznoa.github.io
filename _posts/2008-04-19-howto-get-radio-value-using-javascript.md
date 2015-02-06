---
layout: post
title: "JavaScript - 선택된 라디오 버튼 값 얻기"
description: ""
category: Developlay
tags: [JavaScript, 코드조각]
---

라디오 버튼은 form 변수에 단일값을 정하기 위한 방법 중 하나다.
그런데, 단일값을 정하는 것임에도 불구하고, 그 값을 name.value 처럼 가져올 수가 없다.
체크박스처럼 라디오 버튼을 이루는 input 요소를 모두 확인해서 checked 속성 값을 확인해야만 한다.
왜 이렇게 불편하게 만들어놓은건지.. 쯧.

하지만, 뭐, 별 수 있나.
함수라도 만들어서 써야지.

~~~
<script type="text/javascript">
	function getRadioValue( radioElms ) {
		for (var i = 0; i < radioElms.length; i++) {
			if( radioElms[i].checked == true ) {
				return radioElms[i].value;
			}
		}
		// return undefined;
	}
</script>

<form name="testForm">
	<input type="radio" name="testRadio" value="1"/> Value 1
	<input type="radio" name="testRadio" value="2"/> Value 2
	<input type="radio" name="testRadio" value="3"/> Value 3
</form>

<input type="button" value="AlertRadioValue!" onclick="alert( getRadioValue(document.testForm.testRadio) );" />
~~~
