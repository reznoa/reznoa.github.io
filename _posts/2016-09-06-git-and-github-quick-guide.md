---
layout: post
title: "Git & GitHub Quick Guide"
description: "Git을 가볍게 쓸 때 필요한 몇가지 명령들을 정리해본다."
category: 컴퓨터
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



## Windows의 로컬 저장소 주소

Windows용 git을 쓸 경우:  
`c:\repos\PROJECT.git`

Cygwin을 쓸 경우:  
`/cygdrive/c/repos/PROJECT.git`



## GitHub에 올리기

순서는 다음과 같다:

1. 새 git 저장소 생성
2. base 저장소 생성
3. GitHub에 push
4. 로컬 복사본의 원격 저장소 URL 변경


### 새 git 저장소 생성

~~~
$ cd PROJECT
$ git init
Initialized empty Git repository in PROJECT

$ git add PROJECTFILE
$ git commit -m "COMMITLOG"
~~~


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



## 기본 명령

### checkout HEAD: 변경 내용 취소 (svn revert)

~~~
$ git checkout HEAD PROJECTFILE
~~~

### pull: 최신 내용으로 갱신 (svn update)

~~~
$ git pull
remote: Counting objects: 12, done.
remote: Compressing objects: 100% (12/12), done.
remote: Total 12 (delta 9), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (12/12), done.
From https://github.com/GITHUBID/PROJECT
   f607e78..73106c8  master     -> origin/master
Updating f607e78..73106c8
Fast-forward
 PROJECTFILE | 19 ++++++++++++-------
 1 file changed, 12 insertions(+), 7 deletions(-)

$ git pull
Already up-to-date.
~~~

### add: commit 목록에 추가 (svn add)

~~~
$ git add PROJECTFILE
~~~

add 명령은 현재 변경을 추가하는거다.
add 후 파일을 다시 바꿨다면, 그 내용은 commit되지 않는다.
파일 수정을 완전히 마친 후 commit 직전에 add하는게 좋다.

### commit: 로컬 저장소에 반영 (svn commit - part.1)

~~~
$ git commit -m "COMMITLOG"
~~~

### push: 원격 저장소에 반영 (svn commit - part.2)

~~~
$ git push
Username for 'https://github.com':
Password for 'https://GITHUBID@github.com':
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 2.06 KiB | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To https://github.com/GITHUBID/PROJECT.git
   d13d285..52ab072  master -> master
~~~
