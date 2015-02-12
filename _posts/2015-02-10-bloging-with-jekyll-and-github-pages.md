---
layout: post
title: "Jekyll과 GitHub Pages를 이용해 블로깅하기"
description: ""
category: logholic
tags: [블로그, GitHub, Jekyll]
---

## Bloging with Jekyll and GiHub Pages

[GiHub Pages](https://pages.github.com/)는 코드 저장소인 GitHub에서 내놓은 정적 웹 호스팅 서비스다.
정적 웹이란 HTML처럼 완성된 웹 페이지를 말하는 것인데, 블로그처럼 완성된 글을 보여주는 형태의 웹 사이트에 적합하다.
댓글처럼 방문자의 입력이 필요한 요소도 요즘은 이를 위한 별도의 서비스가 있으므로 굳이 웹사이트에 직접 구현하지 않아도 되기 때문이다.

[Jekyll](http://jekyllrb.com/)은 그런 정적 웹 사이트를 만들어주는 툴 중 하나로 가볍고 간단한게 특징이다.
또 기본으로 Markdown과 같은 텍스트 기반 포맷을 지원하는데, 이런 점들 때문인지 GitHub Pages에서 이를 지원하고있다.
GitHub는 자체로 Markdown 에디터도 제공하므로, 결국 별도의 툴 없이도 텍스트 기반 포맷 문서를 이용한 사이트 제작을 할 수 있다는 말이다.

GitHub Pages를 이용해 사이트를 만드는 방법은 간단하다.
GitHub에 가입한 후, 저장소 이름을 `YOURSITEID.github.io`로 하기만 하면 된다.
그러면 이름과 같은 주소로 사이트에 접근할 수 있다.

기본적으로 저장소에 올린 파일은 모두 웹 사이트에 올라가므로, 웹사이트에 올릴 파일을 만들어 저장소에 넣기만하면 곧 실제 사이트로 배포되고 웹에서 볼 수 있다.

Jekyll 사이트도 비슷한데, 다만 Jekyll에서 사용하는 특별한 파일과 디렉토리는 사이트로 배포하지 않는다.
그 외 디렉토리나 파일은 그대로 배포하므로 이미지나 스크립트같은 리소스가 필요하면 그냥 그대로 올리면 된다.

보통은 Jekyll 사이트를 만들더라도 기본부터 만들지 않고, [JekyllBootstrap](http://jekyllbootstrap.com/)처럼 미리 댓글과 같은 기능을 쉽게 적용할 수 있도록 구현해놓은 것이나 다른 사람의 사이트를 fork해서 사용한다. 그게 편하기 때문이다.



## Jekyll

### Jekyll 소개

Jekyll에 대한 간략한 소개와 기본으로 사용하는 디렉토리 및 파일 구조에 대한 설명은 생략한다.



### Jekyll 환경 구축

GitHub 만으로도 충분히 Jekyll을 기반으로 한 사이트를 만들 수 있지만,
그래도 역시 작업 PC에 Jekyll 환경을 구축해두면 편하다.
태그를 수정한다던가 하는 것처럼 여러 파일에 걸친 작업도 할 수 있고,
`git mv`같은 특별한 작업도 가능하며[^4],
무엇보다도 저장소에 올리기 전에 제대로 뜨는지 미리 확인해 볼 수 있기 때문이다.

[^4]: GitHub 사이트에서 직접 이름을 바꾸면 git mv로 처리하지 않는다. 기존 파일을 지우고 새 파일로 추가한다. (왜..;;)

#### Jekyll 설치에 필요한 것들

[Jekyll 설치](http://jekyllrb.com/docs/installation/)에는 다음과 같은 패키지가 필요하다:

- [Ruby](https://www.ruby-lang.org/en/downloads/)
- [RubyGems](https://rubygems.org/pages/download)

운영체제나 설치환경에 따라 다음 패키지가 추가로 필요할 수도 있다:

- curl
- [RVM: Ruby Version Manager](https://rvm.io/)
- [NodeJS](http://nodejs.org/)
- [git](http://www.git-scm.com/) client
- [Python](https://www.python.org/)

요는 RubyGems와 git을 쓰기 위한 것이므로 그에따라 부족한 것들을 설치하면 된다.

#### Jekyll 설치

##### Linux에서 Jekyll 설치

일반적으로 Jekyll은 Linux에서 다음과 같은 순서로 설치한다:

~~~
sudo apt-get install curl nodejs

gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm

rvm install ruby-2.2.0

gem install jekyll
~~~

##### Mac OS에서 Jekyll 설치

Mac OS에서는 다음처럼 한다(Yosemite 기준):

~~~
xcode-select --install

\curl -sSL https://get.rvm.io | bash -s stable
source ~/.rvm/scripts/rvm

rvm install 2.2.0

gem install jekyll
~~~

Mac OS에서 지원하지 않는 툴이 필요하다면 [Homebrew](http://brew.sh/)를 이용하면 편하다.

~~~
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
~~~

사용법은 Linux의 apt-get과 비슷하다.

~~~
brew install wget
~~~

ruby도 Homebrew로 설치할 수 있긴 하지만, 그러려면 Homebrew를 더 복잡한 방법으로 설치해야하므로 차라리 rvm을 이용하는게 더 낫다.

##### Windows에서 Jekyll 설치

Windows에서는 Unix 계열 OS에서 쓸 수 있는 툴(curl이라든지)을 쓰기 어려우므로, 설치가 좀 더 복잡하다.
그러니, VM을 이용하거나 또는 필요 툴들을 모아둔 [PortableJekyll](https://github.com/madhur/PortableJekyll)을 쓰는게 낫다.
PortableJekyll 설치는 저장소에서 [[Download ZIP]](https://github.com/madhur/PortableJekyll/archive/master.zip) 한 후 적당한 곳에 압축을 풀기만 하면 된다.

쓰기 전에는 반드시 setpath.cmd를 실행해 환경설정을 해줘야 하는데,
주로 PATH 설정이므로 아예 Windows 환경설정에 넣어도 된다.
아니면, 콘솔을 띄울때 이를 실행해주도록 Jekyll용 명령 프롬프트를 만들어도 되는데, 개인적으로는 후자를 더 선호한다.

~~~
%windir%\system32\cmd.exe /k c:\app\dev\JekyllPortable\setpath.cmd
~~~

PortableJekyll에 포함된 패키지를 저장소 관리자가 계속 업데이트하지 않으므로, 업데이트는 필요하면 개인이 직접 해야한다. 이 작업은 시간이 꽤 걸린다.

~~~
gem update

gem uninstall html-pipeline-1.10.0
~~~

update 후에는 경우에 따라 패키지 충돌이 일어날 수도 있는데, 그럴땐 일부 패키지를 정리해야 한다. 내 경우, jekyll-2.5.3 에서 쓰는 html-pipeline-1.9.0이 html-pipeline-1.10.0과 충돌했으므로 (더 새 버전이지만) html-pipeline-1.10.0을 제거했다. 이런 작업이 귀찮고 따로 gem을 추가하지 않을거라면 그냥 처음 받은걸 그대로 써도 된다.

[^1]: 기본 바이너리 구성에는 포함되어있지 않으며, gem update를 수행했을 때 받은 것이다.

##### Koding에서 Jekyll 설치

[Koding](https://koding.com/)이라는 웹브라우저에서 사용 가능한 VM 환경을 쓰는 방법도 있는데,
여기서 제공하는 운영체제는 Linux Ubuntu이므로, 앞서 소개한 Linux에서의 설치 방법에 따르면 된다.

Koding을 이용하면 언제 어디서나 블로깅을 위한 시스템을 쓸 수 있다는게 장점이다.
하지만, 외국 서비스라선지 한글을 제대로 표시하지 못해 불편하다.
ssh를 지원하므로 직접 붙으면 되긴 하겠다만, ssh에 익숙하지 않은 사람에겐 상당히 까다로울 것이다.

무엇보다도 쓸수 있는 디스크양이 지나치게 적다. 오죽하면 gem update도 못하겠나.
기본으로 3G를 제공하는데 gem만 설치해도 거의 다 차기 때문에, 글 몇개 안써도 금세 디스크 부족 메시지를 보게 될 것이다.[^2]

[^2]: 아, 물론, 유료서비스를 이용한다면 얘기가 다르다. 하지만, 블로그때매 Koding을 유료 결제할거면 차라리 유료 호스팅을 쓰는 낫지; 5GB 정도만 됐어도 쓸만했을지 모르겠다.

결론적으로, Koding은 Jekyll을 깔아 쓰기에는 그리 적합하지 않다.



## 툴 사용법

### 주요 콘솔 명령

다음은 Jekyll과 GitHub를 쓸 때 유용한 콘솔 명령을 몇가지를 정리해본 것이다.
[~]로 감싼것은 옵션으로, 필요에 따라 넣으면 된다.

명령                                               | 설명
---------------------------------------------------|------------------------------------------------
jekyll new YOUR_SITE_ID                            | 새 Jekyll 소스를 만든다.
jekyll serve [--port WEBSERVER_PORT] [-d DEST_DIR] | 사이트를 생성하고, 이를 위한 웹서버를 시작한다.
git clone YOUR_REPO [DEST_DIR]                     | 저장소를 복제한다.
git pull                                           | 저장소에서 새로운 내용은 받아온다.
git add [FILES...]                                 | commit 할 파일 목록에 추가한다.
git commit [-m COMMIT_MESSAGE]                     | add한 파일을 commit한다.
git push                                           | commit한 내용을 저장소에 보낸다.

### GitHub 클라이언트

git가 어렵다면 GitHub 클라이언트를 써도 된다.
GitHub 클라이언트는 git 개념이나 명령어 사용법을 알 필요 없이, 그냥 적당히 쓰다가 commit 메시지를 남기고, Sync를 누르기만 하면 된다.
그 외에는 아무것도 없어서 정말 간단하고 직관적이며, 그렇기 때문에 편하다.

- [GitHub for Windows 7, 8 & 8.1](https://windows.github.com/)
- [GitHub for Mac OS X 10.9 or later](https://mac.github.com/)

![GitHub for Windows](https://windows.github.com/images/screenshot-overview@2x.png "간단하다! 편하다!! 멋지다!!!")

GitHub를 쓴다면 추천한다.



## GitHub Pages

### GitHub Pages에서 개인 도메인 쓰기

GitHub Pages는 커스텀 도메인을 지원하는데,
설정 방법도 간단해서 그냥 텍스트로 CNAME이란 파일을 만들고 거기에 자기 도메인을 넣으면 된다.

예를들어, 내 CNAME 내용은 다음과 같다.

~~~
reznoa.wo.tc
~~~

그리고 도메인 서비스에서 '호스트 IP(A)' 설정으로, 호스트 이름을 '192.30.252.153'로 지정한다.
그러면 잠시 후 도메인이 GitHub Pages로 연결된다.

### Jekyll + GitHub Pages의 한계

GitHub Pages는 Jekyll을 지원하지만, 온전하게 지원하는건 아니다.
Jekyll이 정적 웹을 만드는 간단한 툴이지만 유용하게 쓸 수 있는 이유 중 하나는
루비 스크립트를 이용해 다양한 추가 구현(플러그인)을 붙여 쓸 수 있기 때문이다.
하지만, GitHub Pages에서는 보안상의 이유 때문에 이를 지원하지 않는다.

대신 [GitHub Pages에서 미리 붙여둔 4가지 플러그인만 사용할 수 있다](https://help.github.com/articles/using-jekyll-plugins-with-github-pages/).

- jekyll-mentions
- jemoji
- jekyll-redirect-from
- jekyll-sitemap

카테고리나 태그의 퍼머링크를 만들어주는 플러그인[^3]은 지원하지 않기 때문에, 단일 페이지에서 앵커(Anchor)를 이용한 바로가기를 만들어야 한다.
아니면 로컬 Jekyll에서 생성한 결과물을 GitHub에 올리던가. (쩝)

[^3]: 예를들어, 태그 퍼머링크 플러그인이라면 [jekyll-tagging](https://github.com/pattex/jekyll-tagging)이 있다. pretty 형태를 지원하기 때문에 동적 웹처럼 멋진 퍼머링크를 만들 수 있다. `gem install jekyll-tagging` 명령을 통해 손쉽게 설치할 수 있다.

GitHub Pages에서 보다 많은 플러그인을 지원해줬으면 좋겠다.
어차피 보안 문제라는건 사용자가 플러그인 자체를 추가할 수 없는 한, 일어날 수 없는것 아닌가.
