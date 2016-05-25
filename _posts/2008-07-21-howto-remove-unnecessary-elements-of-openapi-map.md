---
layout: post
title: "OpenAPI를 이용한 지도에서 불필요한 요소 지우기"
description: "OpenAPI 매시업 지도에서 불필요한 표시 문구를 지워봤다."
category: Developlay
tags: [OpenAPI, Mashup, JavaScript, DHTML]
---

OpenAPI를 이용해 지도를 표시할 수 있도록 해주는곳이라면, 대표적으로 구글과 네이버가 있다.[^1] 이런것들이 나온 후 내가 감탄한 것들이 있는데, 말하자면 매시업(Mashup)이다.

[^1]: 네이버는 지도 데이터가 잘 정리(?)되어있어서 지도 자체를 보거나 길찾기 등을 하는데 편하고, 구글은 (데이터가 없기 때문에) 지도는 별 볼게 없고 위성 사진이 볼만하다.

- 구글맵 ↔ 네이버 지도 변환 
- 구글맵 + 네이버 지도 같이 보기
- 구글맵에 네이버 지도 얹기

나온 순서도 거의 기술한 순서대로다.
이 두가지 지도 '같이 보기'는 filter를 이용해 투명도를 주거나 일부를 완전히 투명하게 한 것인데, filter를 쓰기 때문에 브라우저를 탄다는게 단점이다.


![openmap](https://lh4.googleusercontent.com/-69BNJPEpABU/VNTpO_K_a1I/AAAAAAAAO2Y/hAKVbmzOvBU/s0/openmap.jpg "구글맵에 네이버 지도를 얹은 모습. 위성 사진과 잘 정리된 지도 데이터를 동시에 볼 수 있다.")


또 하나 더 단점을 얘기하자면 하단의 라이센스 표시. 두 곳의 지도를 썼기 때문에 라이센스 표시도 2배로 늘어 참 껄적지근하게 화면을 가린다. 라이센스 표시따위 없어져야 한다는 논리를 펴려는건 아니지만, 지저분해서 거슬리는데 어쩌냐.

그래서 없애봤다.


![지도 API를 이용할 경우 하단에 나타나는 라이센스 표시](https://lh4.googleusercontent.com/-X5aIWFzATd4/VNTpRjZqz3I/AAAAAAAAO2g/idTNaFt-vmM/s0/openmap-before-clear.jpg "두 지도의 매시업은 라이센스 표시로 인한 지저분함을 일으킨다.")


없애는 방법은 의외로 간단하다.
OpenAPI라는것이 결국엔 DHTML을 이용해 객체를 추가하는 것이므로, 거기서 원하는걸 찾아 조작하면 되는거다.

이런 식으로 말이다:

~~~
var nodes = nmapPane.childNodes[1].childNodes;
nodes[0].innerHTML = '';
~~~

몇번 실험을 하면 라이센스 표시 코드가 있는 객체를 찾을 수 있는데, 위와같은 단순한 코드로는 API 업데이트에 대응할 수 없다. API가 생성하는 객체 구조가 바껴도 상관없게 만들려면 라이센스 표시를 위한 텍스트나 이미지 등을 찾아 없애는 식으로 만들어야한다.


![라이센스를 제거한 모습](https://lh6.googleusercontent.com/-Up5rxWJqvDo/VNTpVh6SONI/AAAAAAAAO2o/5lAYN9bzDpc/s0/openmap-after-clear.jpg "라이센스 표시만 지운 모습. 동작은 당연히 잘 된다.")


이것을 조금 응용한다면, 라이센스를 바꿔치기하는것도 가능하다.
자기 사이트 로고나 문구같은걸로 바꾸면 방문자들이 신기해 하지 않을까.
다만, 라이센스 표시는 민감한 부분이므로 재미로만 해보고 실제로 적용할 때는 충분히 검토한 후 괜찮은 정도까지만 반영해야 할 것이다.[^2]

[^2]: 아마 누구도 라이센스 표시 제거를 환영하지는 않을 듯하다. 법적 분쟁까지야 가지 않겠지만, 혹시 이와 관련한 요구나 항의를 받는다면 성실히 대응하는게 좋다.
