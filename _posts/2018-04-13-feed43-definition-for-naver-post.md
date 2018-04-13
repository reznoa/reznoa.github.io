---
layout: post
title: "Feed43로 RSS 만들기 - 네이버 포스트 (전체)"
description: "Feed43으로 네이버 포스트를 RSS로 만드는데 필요한 정보를 공개한다."
category: 컴퓨터
tags: [RSS, Feed43, 네이버 포스트]
---

### Definition

Address:
~~~
http://post.naver.com/async/my.nhn?fromNo=1&totalCount=32&memberNo=?
~~~

? = 해당 네이버 포스트의 memberNo

Item (repeatable) Search Pattern:
{% raw %}
~~~
<li class=\"_cds check_visible\" paramName=\"fromNo\" cursor=\"1\" volumeNo=\"{*}\" id=\"feed_element_{*}\">\n<div class=\"inner_feed_box\">\n<div class=\"feed_head\">\n<div class=\"feed_info_area\">\n<div class=\"writer_area\">\n<\/div>\n\n<div class=\"info_post\">\n<time class=\"date_post\">\n{%} <\/time>\n<span class=\"view_post\">{*} 읽음<\/span>\n<\/div>\n<\/div>\n<\/div>\n<div class=\"feed_body \">\n<div class=\"text_area\">\n<a href=\"{%}\" class=\"series_title\"\nonclick=\"mug.common.nclick(this, \'.series\', \'\', \'\', window[\'g_nclick_prefix\']);\">\n<div class=\"ell\">\n<i class=\"ico_label\">시리즈<\/i> {%}<\/div>\n<\/a>\n<a href=\"{%}\"\nclass=\"link_end\" onclick=\"mug.common.nclick(this, \'.text\', \'\', \'\', window[\'g_nclick_prefix\']);\">\n<strong class=\"tit_feed ell\">\n{%}<\/strong>\n<p class=\"text_feed ell\">{%}<\/p>\n<\/a>\n\n<\/div>\n\n<div class=\"image_area\">\n<a href=\"{*}\"\nclass=\"link_end\" onclick=\"mug.common.nclick(this, \'.text\', \'\', \'\', window[\'g_nclick_prefix\']);\">\n<img src=\"{%}\" onerror=\"this.onerror=null;this.src=\'{*}\'\" alt=\"본문 사진\">
~~~
{% endraw %}

### RSS item properties

Item Title Template:
{% raw %}
~~~
{%5}
~~~
{% endraw %}

Item Link Template:
{% raw %}
~~~
http://post.naver.com{%4}
~~~
{% endraw %}

Item Content Template:
{% raw %}
~~~
<p>{%1}</p>
<p>시리즈: <a href="http://post.naver.com{%2}">{%3}</a></p>
<p><img src="{%7}" /></p>
<p>{%6}</p>
~~~
{% endraw %}
