---
layout: post
title: "Git & GitHub Quick Guide"
description: "Git을 가볍게 쓸 때 필요한 몇가지 명령들을 정리해본다."
category: Developlay
tags: [Git, GitHub]
---

## 표기법

콘솔은 다음과 같이 '`$ `'로 시작한다:

> ~~~
> $ git status
> ~~~

변수는 다음처럼 사용한다:

- PROJECT: 프로젝트 이름 및 프로젝트 코드를 담은 디렉토리 이름
- GITHUBID: GitHub 사용자 이름

이 값들은 각자에 맞는 값으로 바꿔 사용해야한다.



## 기존 저장소, GitHub에 올리기

순서는 다음과 같다:

1. base 저장소 생성
2. GitHub에 push
3. 로컬 복사본의 원격 저장소 URL 변경


### bare 저장소 생성

~~~
$ git clone --bare PROJECT
Cloning into bare repository 'PROJECT.git'...
done.
~~~


### GitHub에 기존 저장소 올리기

~~~
$ cd PROJECT.git
$ git push --mirror https://github.com/GITHUBID/PROJECT.git
~~~

~~~
$ cd ..
$ rm -rf PROJECT.git
~~~


### 로컬 복사본의 원격 저장소 URL 변경

~~~
$ cd PROJECT
$ git remote -v
origin  c:\repos\PROJECT.git (fetch)
origin  c:\repos\PROJECT.git (push)

$ git remote set-url origin https://github.com/GITHUBID/PROJECT.git

$ git remote -v
origin  https://github.com/GITHUBID/PROJECT.git (fetch)
origin  https://github.com/GITHUBID/PROJECT.git (push)
~~~
