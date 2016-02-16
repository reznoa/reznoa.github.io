---
layout: post
title: "G3를 위한 해상도, dpi 설정 참고값"
description: ""
category: PC
tags: [Android, LG, G3, 설정, 해상도]
---

G3는 무리하게 WQHD를 달고 나오는 바람에 여러모로 안습이 된 비운의 기기다.
성능과 배터리 등 거의 모든 면에서 그렇다.
반면에 WQHD의 장점을 느낄만한것은 희박해서,
많은 사람들이 FHD 지원을 바라마지 않는다만 ~~헬지~~LG가 과연 지원해줄지…….

그 전까진 루팅이나 [adb를 이용하여 해상도를 변경]({% post_url 2016-02-16-howto-change-resolution-and-dpi-of-android-device-using-adb %})해 쓰는것도 한 방법이다.

설정 값은 다음을 참고한다:

| name   | resolution | dpi | generalized |
|:-------|-----------:|----:|:-----------:|
| WQHD   |  1440x2560 | 640 |      O      |
| G3-528 |  1188x2112 | 528 |      X      |
| QWXGA  |  1152x2048 | 512 |      X      |
| FHD    |  1080x1920 | 480 |      O      |
| WXGA   |   720x1280 | 320 |      O      |

주의할것은, dpi가 527 미만일 경우 기본앱(전화, 주소록 등)이 제대로 실행되지 않는다는거다.
이는 해당 앱들이 그보다 낮은 dpi를 지원하지 않기 때문이다.
큰 문제를 일으키지 않는 선에서는 G3-528이 최적값이다.

다만, dpi를 바꾸면 실행은 되더라도 일부 스프라이트가 해상도에 안맞게 크게 보이는 문제가 생길 수 있다.
이는 설정한 dpi가 안드로이드가 미리 정해둔 dpi에 속하지 않을 경우 그보다 큰 dpi 크기를 쓰기 때문이다.
예를들어, 528 dpi는 미리 정해둔 dpi가 아니므로 그 위에있는 640 dpi에 따른 크기를 쓴다는 얘기.

참고로, 안드로이드에서 미리 정해둔 dpi는 다음과 같다:

| name    | description            | dpi range |
|:--------|------------------------|----------:|
| ldpi    | low                    |  ~ 120dpi |
| mdpi    | medium                 |  ~ 160dpi |
| hdpi    | high                   |  ~ 240dpi |
| xhdpi   | extra-high             |  ~ 320dpi |
| xxhdpi  | extra-extra-high       |  ~ 480dpi |
| xxxhdpi | extra-extra-extra-high |  ~ 640dpi |

해상도와 dpi에 대한 더 자세한 정보는 다음을 참고한다:

- [컴퓨터 디스플레이 표준](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%93%A8%ED%84%B0_%EB%94%94%EC%8A%A4%ED%94%8C%EB%A0%88%EC%9D%B4_%ED%91%9C%EC%A4%80)
- [Android Developers - Supporting Multiple Screens](http://developer.android.com/intl/ko/guide/practices/screens_support.html)
- [안드로이드 DP 계산기(해상도별, px, dp)](http://lime.so/6)
