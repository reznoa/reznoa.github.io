---
layout: post
title: "Feed43으로 RSS 만들기 - 네이버 포스트 (시리즈)"
description: "Feed43으로 네이버 포스트 시리즈를 RSS로 만드는데 필요한 정보를 공개한다."
category: 컴퓨터
tags: [RSS, Feed43, 네이버 포스트]
---

### Definition

Address:
~~~
http://post.naver.com/my/series/detail.nhn?memberNo=?&seriesNo=?
~~~

원하는 포스트 시리즈의 주소

Item (repeatable) Search Pattern:
{% raw %}
~~~
<li class="">{_}<a href="{%}&navigationType=push" class="spot_post_area">{_}<div class="spot_thumb_area ">{_}<img src="{%}" onerror="this.onerror=null;defaultVolumeImageOnerror(this);" alt="본문 사진">{_}</div>{_}<p class="spot_post_date">{%} <span class="lt_bar"><span>{*}</span> 읽음</span></p>{_}<div class="spot_post_name">{_}<span class="ell">{_}{%}</span>{_}</div>
~~~
{% endraw %}

### RSS item properties

Item Title Template:
{% raw %}
~~~
{%4}
~~~
{% endraw %}

Item Link Template:
{% raw %}
~~~
{%1}
~~~
{% endraw %}

Item Content Template:
{% raw %}
~~~
<p>{%3}</p>
<p><img src="{%2}" /></p>
~~~
{% endraw %}
