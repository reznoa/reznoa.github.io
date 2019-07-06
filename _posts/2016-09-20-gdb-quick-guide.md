---
layout: post
title: "디버깅을 위한 gdb Quick Guide"
description: "gdb를 이용해 디버깅을 할 때 유용한 몇가지 명령들을 정리해본다."
category: Programing
tags: [gdb]
---

## backtrace, 콜스택 보기

~~~
(gdb) bt
#0  odbc_stmt_param_hook (stmt=0x10a22e0, param=0x7fffffffa660, event_type=PDO_PARAM_EVT_NORMALIZE) at /home/reznoa/work/php-5.3.21/ext/pdo_odbc/odbc_stmt.c:279
#1  0x00000000005d0b87 in really_register_bound_param (param=0x7fffffffa660, stmt=0x10a22e0, is_param=1) at /home/reznoa/work/php-5.3.21/ext/pdo/pdo_stmt.c:386
#2  0x00000000005d4f56 in zim_PDOStatement_bindValue (ht=3, return_value=0x10a9618, return_value_ptr=0x0, this_ptr=0x10a9528, return_value_used=0)
    at /home/reznoa/work/php-5.3.21/ext/pdo/pdo_stmt.c:1656
#3  0x0000000000831a2a in zend_do_fcall_common_helper_SPEC (execute_data=0x7ffff7ec65d8) at /home/reznoa/work/php-5.3.21/Zend/zend_vm_execute.h:320
#4  0x00000000008320b1 in ZEND_DO_FCALL_BY_NAME_SPEC_HANDLER (execute_data=0x7ffff7ec65d8) at /home/reznoa/work/php-5.3.21/Zend/zend_vm_execute.h:425
#5  0x0000000000830f03 in execute (op_array=0x10a4d40) at /home/reznoa/work/php-5.3.21/Zend/zend_vm_execute.h:107
~~~



## breakpoint와 watchpoint


### 목록 보기

~~~
(gdb) info breakpoints
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x00007ffff629a3d0 in SQLDescribeParam at SQLDescribeParam.c:214
2       hw watchpoint  keep y                      *0x1103610

(gdb) info b
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x00007ffff629a3d0 in SQLDescribeParam at SQLDescribeParam.c:214
2       hw watchpoint  keep y                      *0x1103610

(gdb) i b
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x00007ffff629a3d0 in SQLDescribeParam at SQLDescribeParam.c:214
2       hw watchpoint  keep y                      *0x1103610

(gdb) info watchpoints
Num     Type           Disp Enb Address            What
2       hw watchpoint  keep y                      *0x1103610

(gdb) i wat
Num     Type           Disp Enb Address            What
2       hw watchpoint  keep y                      *0x1103610
~~~


### 특정 주소에 읽고 쓰는것 감시

- watch: 쓸 때 중단 (단, 값이 바뀔때만)
- rwatch: 읽을 때 중단
- awatch: 읽거나 쓸 때 중단

~~~
0x00007ffff629eed5 in SQLExecute (statement_handle=0x11f3720) at SQLExecute.c:324
324	        statement -> state = STATE_S4;
(gdb) p &(statement->state)
$66 = (int *) 0x11f3b30
(gdb) watch *(int *)0x11f3b30
(gdb) c
Continuing.
Hardware watchpoint 25: *(int *)0x11f3b30

Old value = 3
New value = 4
~~~


### 시그널 제어

gdb는 기본적으로 모든 시그널을 받을 때마다 멈추는데,
멀티 스레드, 멀티 프로세스 프로그램에서 발생하는 SIGPIPE 등은 무시해도 되는 경우가 있다.
그런 경우엔 handle 명령을 사용한다.

~~~
(gdb) handle SIGPIPE nostop
(gdb) handle SIGPIPE noprint
~~~

지정할 수 있는 동작은 다음과 같다:

동작   | 비동작   | 설명
-------|----------|--------------------------------------------------
stop   | nostop   | 멈추고 디버거로 들어갈지 여부
print  | noprint  | 출력 여부
pass   | nopass   | 프로그램에서 인식할 수 있게 신호를 전달할지 여부
ignore | noignore | pass의 반대 (ignore = nopass, noignore = pass)
