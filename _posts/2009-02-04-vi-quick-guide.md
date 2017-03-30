---
layout: post
title: "vi 쓰기"
description: "vi를 쓸 때 유용한 설정을 정리해본다."
category: PC
tags: [vi, 설정]
---

## vim 설치

Ubuntu에 기본으로 깔리는 vi는 vim-tiny로 기능도 적고(일단 하이라이팅이 안된다),
방향키도 제대로 안먹는 등의 문제가 있다.
그래서 vim을 다시 깔면 편하다.

~~~
sudo apt-get remove vim-tiny
sudo apt-get install vim
~~~


## vi 환경설정

더욱 편하게 하기 위해서 환경 설정도 해보자.
vim의 환경 설정 파일은 `~/.vimrc`다.
만약 파일이 없다면 새로 만들어주면 된다.
취향에 맞는 설정만 골라 넣어준다.

~~~
set nocp         " 방향키를 쓸 수 있게 해준다.
set number       " 라인번호 출력
set tabstop=4    " Tab을 눌렀을 때 8칸 대신 4칸 이동
set bs=2         " allow backspacing over everything in insert mode
set showmatch    " 대치 되는 괄호 보여 주기
set ignorecase   " 검색할때 대소문자 무시
set nowrapscan   " 끝까지 찾았을때 처음부터 다시 찾지 않음
set nofoldenable " disable folding
set mouse=a      " enable automatic visual mode on mouse select
" set mouse=-a   " disable

" 문법 강조 기능 사용
if has("syntax")
    syntax on
endif

" Home/End
map  <Esc>[1~ <Home>
map  <Esc>[4~ <End>
map! <Esc>[1~ <Home>
map! <Esc>[4~ <End>

" PageUp/PageDown
map  <ESC>[5~   <PageUp>
map  <ESC>[6~   <PageDown>
map  <ESC>[5;2~ <PageUp>
map  <ESC>[6;2~ <PageDown>
map  <ESC>[5;5~ <PageUp>
map  <ESC>[6;5~ <PageDown>
map! <ESC>[5~   <PageUp>
map! <ESC>[6~   <PageDown>
map! <ESC>[5;2~ <PageUp>
map! <ESC>[6;2~ <PageDown>
map! <ESC>[5;5~ <PageUp>
map! <ESC>[6;5~ <PageDown>
~~~


## vi 단축키

vi 단축키는 '[Graphical vi-vim Cheat Sheet and Tutorial](http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html)'를 참고한다.
이를 번역한 '[vi/vim 단축키 모음](http://kldp.org/node/102947)'도 있다.


## 참고

* [초보자를 위한 Vim 입문서](https://www.joinc.co.kr/w/Site/Vim/Documents/UsedVim#AEN2)
* [VI 편집기 - 변수설정](http://qaos.com/sections.php?op=viewarticle&artid=109)
* [vi 에서 화살표가 이상하게 나올때.. setnocp](http://n-3.net/blog/sunteq/entry/vi-%EC%97%90%EC%84%9C-%ED%99%94%EC%82%B4%ED%91%9C%EA%B0%80-%EC%9D%B4%EC%83%81%ED%95%98%EA%B2%8C-%EB%82%98%EC%98%AC%EB%95%8C-setnocp)
* [vim 을 제대로 한번 마스터 해볼까나...](http://kicom95.egloos.com/904035)
* [vi 사용법](http://blog.naver.com/justis1/40033055341)
