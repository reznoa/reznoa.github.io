---
layout: post
title: "서울 지하철 정기권 반환금 계산기"
category: 도서
tags: [지하철, 환불]
---

검색으로도 나오지 않는 환불 규정은 '승차권의 반환''이라는 이름으로
[여객운송약관(1~8호선)](http://www.seoulmetro.co.kr/kr/page.do?menuIdx=528)에 나와있다.

> 제33조(미사용 승차권의 반환)  
> ① 여객은 승차권(교통카드 제외)이 불필요하게 되었을 때에는 도시철도 구간의 각 역에 다음 각 호의 운임 반환을 청구할 수 있습니다. 다만, 1회권 및 단체권은 여행 시작 이전의 유효한 승차권에 한합니다.  
>    3. 정기권 : 사용일수와 사용횟수를 적용하여 산출한 금액 중 적은 금액을 반환하며, 카드 대금은 반환하지 않습니다. 다만, 반환 당일 사용하지 않은 경우에는 사용일수 계산시 반환당일은 제외합니다.  
>       가. 사용일수 기준 반환금액 = 정기권여객운임 - (사용일수 × 별표3에 정한 종별 교통카드운임 × 2회)  
>       나. 사용횟수 기준 반환금액 = 정기권여객운임 - (사용횟수 × 별표3에 정한 종별 교통카드운임)

여기서 말하는 사용일수는 정확한 의미가 불명하긴 한데,
상식적으로 생각한다면 정기권으로 지하철을 이용한 날만을 셈한 것이리라 본다.
즉, 출퇴근에 이용했다면 대게 '사용일수 = 사용횟수/2'라는 말이다.
추가로 더 이용을 했더라도 사용횟수 기준보다 사용일수 기준이 더 낮은 반환금액으로 계산될 일은 거의 없을 거다.

다음은 환불 규정을 반영한 계산기다:

<style>
#SeoulmetroRefund { width: 25em; margin: auto; }
#SeoulmetroRefund > table { width: 100%; }
#SeoulmetroRefund > table th { width: 4.5em; }
#SeoulmetroRefund > table table { margin: 0; padding: 0; }
</style>
<div id="SeoulmetroRefund">
<table>
<tr><th>
정기권
</th><td>
<select id="SeoulmetroRefund_Cost">
	<option value="[1450,  55000]"> 1종 : 충전  55,000원, 운임 1,450원</option>
	<option value="[1550,  58000]"> 2종 : 충전  58,000원, 운임 1,550원</option>
	<option value="[1650,  61700]"> 3종 : 충전  61,700원, 운임 1,650원</option>
	<option value="[1750,  65500]"> 4종 : 충전  65,500원, 운임 1,750원</option>
	<option value="[1850,  69200]"> 5종 : 충전  69,200원, 운임 1,850원</option>
	<option value="[1950,  72900]"> 6종 : 충전  72,900원, 운임 1,950원</option>
	<option value="[2050,  76700]"> 7종 : 충전  76,700원, 운임 2,050원</option>
	<option value="[2150,  80400]"> 8종 : 충전  80,400원, 운임 2,150원</option>
	<option value="[2250,  84200]"> 9종 : 충전  84,200원, 운임 2,250원</option>
	<option value="[2350,  87900]">10종 : 충전  87,900원, 운임 2,350원</option>
	<option value="[2450,  91600]">11종 : 충전  91,600원, 운임 2,450원</option>
	<option value="[2550,  95400]">12종 : 충전  95,400원, 운임 2,550원</option>
	<option value="[2650,  99100]">13종 : 충전  99,100원, 운임 2,650원</option>
	<option value="[2750, 102900]">14종 : 충전 102,900원, 운임 2,750원</option>
</select>
</td></tr>
<tr><th>
사용일수
</th><td>
<input type="text" id="SeoulmetroRefund_UsedDay" /><br />
</td></tr>
<tr><th>
사용횟수
</th><td>
<input type="text" id="SeoulmetroRefund_UsedCnt" /><br />
</td></tr>
<tr><th valign="top">
<button id="SeoulmetroRefund_Calc">계산</button>
</th><td>
<div id="SeoulmetroRefund_Result"></div>
</td></tr>
</table>
<script>
document.getElementById("SeoulmetroRefund_Calc").onclick = function()
{
	var costs = eval(document.getElementById("SeoulmetroRefund_Cost").value);
	var usedDay = document.getElementById("SeoulmetroRefund_UsedDay").value;
	var usedCnt = document.getElementById("SeoulmetroRefund_UsedCnt").value;
	var dayResult = costs[1] - (usedDay * costs[0] * 2);
	var cntResult = costs[1] - (usedCnt * costs[0]);
	var minResult = Math.max(0, Math.min(dayResult, cntResult));
	document.getElementById("SeoulmetroRefund_Result").innerHTML = "<table>"
		+"<tr><td>사용일수 기준 반환금액</td><td align=right>"+ dayResult.toLocaleString('en-US') +"원</td></tr>"
		+"<tr><td>사용횟수 기준 반환금액</td><td align=right>"+ cntResult.toLocaleString('en-US') +"원</td></tr>"
		+"<tr><td>최종 예상 반환금액</td><td align=right>"+ minResult.toLocaleString('en-US') +"원</td></tr>"
		+"</table>";
};
</script>
</div>

간단하게 반환금을 추정해보고 싶을 때 유용하다.
