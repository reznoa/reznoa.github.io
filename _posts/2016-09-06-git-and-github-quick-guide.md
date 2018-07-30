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
- PROJECTOWNER: 프로젝트 리파지토리를 소유한 사용자 이름
- GITHUBID: push하는데 사용할 GitHub 사용자 이름

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
$ mkdir PROJECT
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
$ git push --mirror https://github.com/PROJECTOWNER/PROJECT.git
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

$ git remote set-url origin https://github.com/PROJECTOWNER/PROJECT.git

$ git remote -v
origin  https://github.com/PROJECTOWNER/PROJECT.git (fetch)
origin  https://github.com/PROJECTOWNER/PROJECT.git (push)
~~~



## 기본 명령

### 사용자 설정

~~~
$ git config --global user.name "YOUR NAME"
$ git config --global user.email YOUR@EMAIL.com
~~~

commit 할 때 기록할 사용자 정보 설정한다.

'--global' 옵션을 빼고 개별 프로젝트마다 설정할 수도 있다.

개별 설정이 글로벌 설정보다 우선하며,
둘 다 없으면 설정을 요구한다.

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
From https://github.com/PROJECTOWNER/PROJECT
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
To https://github.com/PROJECTOWNER/PROJECT.git
   d13d285..52ab072  master -> master
~~~



## fork 저장소 동기화 하기

GItHub의 다음 두 글 참고:

- [Configuring a remote for a fork](https://help.github.com/articles/configuring-a-remote-for-a-fork/)
- [Syncing a fork](https://help.github.com/articles/syncing-a-fork/)

명령만 모음:

~~~
$ git remote -v
origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)

$ git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git

$ git remote -v
origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)

$ git fetch upstream
remote: Counting objects: 75, done.
remote: Compressing objects: 100% (53/53), done.
remote: Total 62 (delta 27), reused 44 (delta 9)
Unpacking objects: 100% (62/62), done.
From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
 * [new branch]      master     -> upstream/master

$ git checkout master
Switched to branch 'master'

$ git merge upstream/master
Updating a422352..5fdff0f
Fast-forward
 README                    |    9 -------
 README.md                 |    7 ++++++
 2 files changed, 7 insertions(+), 9 deletions(-)
 delete mode 100644 README
 create mode 100644 README.md
~~~

솔직한 심정:
이딴거 정리해서 올리지 말고, 싱크 버튼 좀 추가해!
왜 안하는 거야? ;



## 특정 사용자로 push 하기

git은 따로 지정해주지 않으면 현재 로그인한 사용자 ID를 사용하려 한다.
그러므로 GitHub 사용자 이름과 서로 다르다면,
어떤 사용자 이름을 사용하는지 정해주어야 한다.

~~~
$ git remote set-url origin GITHUBID@github.com:PROJECTOWNER/PROJECT.git
~~~
