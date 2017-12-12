---
layout: post
title: "League of Legend, NA 등 외국 서버에서 한국어로 보는 방법"
description: "League of Legend 외국 서버에서 한국어를 사용하는 방법을 소개한다."
category: Game
tags: [게임, 리그오브레전드, 한국어패치]
---

## 한국어 활성화, 왜?

League of Legend는 다양한 국가에서 각자의 언어로 서비스하고있다. 당연히 한국에서도 한국어 서비스를 한다. 그렇다면, 왜 한국어 활성화가 필요한걸까.
이는 몇가지 이유로 여전히 많은 사람들이 외국 서버에서 게임을 하기 때문이다.

그럴때, 게임 내 문구가 한글이면 쉽게 알아볼 수 있기 때문에 게임하는데 도움이 된다. 이미 완벽하게 외우고있는 사람이라면 영어로 나오든 중국어로 나오든 크게 상관은 없겠지만 말이다.



## 라이엇에게 불만

롤에는 크게 2가지 클라이언트가 있다.
글로벌 클라이언트와 한국 클라이언트.
왜 굳이 이렇게 나뉘어 있는지 모르겠는데,
혹시 외국과 달리 개인 인증을 해야하는 한국의 특이함 때문은 아닐까 짐작해본다.
(사실 정말로 그렇다고 해도, 비겁한 변명에 불과하다.)

그래도 다행히 언어 설정을 바꾸면 한국어를 손쉽게 쓸 수 있었는데,
대체 뭐가 불만이었는지 한국어를 아예 사용할 수 없도록 막아버렸다.

대체, 왜 그러는가.



## 한국어 클라이언트를 이용해 외국 서버에서 게임하기

다행히 한국 클라이언트와 글로벌 클라이언트는
서버 목록과 언어 설정을 제외하고는
기본적으로 같다.

그리고 설정 파일은 `system.yaml`라는 이름의 yaml 파일로 저장되어있다.
yaml은 간단한 규칙을 가진 텍스트 파일이라
notepad나 vi 등으로 열어 쉽게 수정할 수 있다.

위치는 다음과 같다:
`${LOL_HOME}\RADS\projects\league_client\releases\0.0.0.113\deploy\system.yaml`

여기서 `0.0.0.113`는 버전 넘버라
새 패치가 적용되면 바뀔 수 있다.
그럴경우 가장 큰 값 아래에 있는 놈이 실제 사용하는 파일이다.

이걸 조금만 손보면 한국 클라이언트로 외국 서버에 접속해 게임할 수 있다.

다음은 NA 서버에 접속할 수 있도록 바꾼 것이다:

~~~
  KR:
    available_locales:
    - ko_KR
    default_locale: ko_KR
    rso_platform_id: NA1
    servers:
      chat:
        allow_self_signed_cert: false
        chat_host: chat.na2.lol.riotgames.com
        chat_port: 5223
      discoverous_service_location: lolriot.pdx2.na1
      email_verification:
        external_url: https://prod.email-verification.accounts.riotgames.com/api
      entitlements:
        entitlements_url: https://entitlements.auth.riotgames.com/api/token/v1
      lcds:
        lcds_host: prod.na2.lol.riotgames.com
        lcds_port: 2099
        login_queue_url: https://lqak.na2.lol.riotgames.com/login-queue/rest/queues/lol
        use_tls: true
      license_agreement_urls:
        terms_of_use: http://na.leagueoflegends.com/{language}/legal/termsofuse
      payments:
        payments_host: https://plstore2.na.lol.riotgames.com
      prelogin_config:
        prelogin_config_url: https://prod.config.patcher.riotgames.com
      rms:
        rms_heartbeat_interval_seconds: 60
        rms_url: wss://us.edge.rms.si.riotgames.com:443
      service_status:
        api_url: https://status.leagueoflegends.com/shards/na/synopsis
        human_readable_status_url: https://status.leagueoflegends.com/#na
      store:
        store_url: https://store.na2.lol.riotgames.com
    web_region: na
~~~

위 내용은 글로벌 서버의 NA 항목에서 가져온 것이다.
다만, available_locales와 default_locale만을 ko_KR로 바꿨다.

이걸 기존 KR 항목과 바꿔친다.
그러면 클라이언트에서는 서버 항목이 'KR'로 뜨지만,
실제로는 NA로 접속한다.



## 주의사항

만약 서버 주소가 바뀌거나,
패치 반영 시기가 다르다면
제대로 접속되지 않을 수 있다.

그럴때는 한국과 원하는 국가(위에서는 NA)의 패치 버전이 같은지 확인하고,
같다면 글로벌 클라이언트의 최신 `system.yaml` 내용을 이용해
한국 클라이언트의 설정을 바꾸면 다시 잘 될 것이다.

적어도 라이엇이 다시 막기 전까지는 말이다.
