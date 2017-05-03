---
layout: post
title: "Java에서 Cookie 사용하는 방법"
description: "Java에서 Cookie를 쓰는 방법을 알아본다."
category: Programing
tags: [Java, HTTP, Cookie, 코드조각]
---

HTTP 헤더에는 다양한 정보가 포함되는데 Cookie도 그 중 하나다.
일반적인 경우엔 그냥 URL만으로도 충분하지만,
가끔 URL에 Cookie를 설정해야 할 때가 있다.
예를 들면, Cookie를 이용해 로그인 여부를 판단하는 경우가 이에 해당한다.

URL에는 HTTP 헤더를 설정할 방법이 없다.
그야 당연한 것이, URL은 HTTP만을 위해서 만들어진 것이 아니기 때문이다.
좀 더 범용적으로 쓰이는 놈이기 때문에
HTTP에서만 쓰이는 헤더를 설정할 수 있는 메서드는 지원하지 않는다.
대신 openConnection()을 이용하면, URL을 생성할 때 spec을 "http://~"로 넘긴 경우, HttpURLConnection을 얻어올 수 있다.

HttpURLConnection은 HTTP에 좀 더 특화된 녀석으로, HTTP에만 있는 responseCode라든지 responseMessage 같은 것들을 얻을 수 있는 메서드를 제공한다.

보면, HTTP 헤더 명세에 비하면 HttpURLConnection이 지원하는 메서드는 지나치게 적은데, getRequestProperty(String)와 setRequestProperty(String,String)를 이용해 메서드로 제공하지 않는 속성을 건드릴 수 있다.
이 메서드들은 HttpURLConnection의 상위 클래스인 URLConnection에 정의되어 있으며, 이를 이용하면 HTTP 헤더 값을 모두 조작할 수 있다.

Cookie는 다음처럼 설정한다:

~~~
URL url = new URL("http://whathost/whatquery");
URLConnection urlConn = url.openConnection();
urlConn.setRequestProperty( "Cookie", "Whatever you want" );
InputStream is = urlConn.getInputStream();
// ...
~~~

여기서 urlConn은 실상 HttpURLConnection 객체인데, 사용할 메서드가 URLConnection에 정의된 것이므로 굳이 캐스팅은 하지 않았다.
