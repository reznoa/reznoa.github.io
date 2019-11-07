---
layout: post
title: "Visual Studio 2010에서 디자이너 화면일 때만 '도구 상자', '속성' 윈도우 보이기"
category: 취미
tags: [Visual Studio, VB]
---

도구 상자처럼 항상 자리를 차지할 필요가 없는 창을
활성화된 문서에 따라 자동으로 감추는 방법을 정리해본다.

1.	"매로크 IDE" 실행
	-	메뉴에서 [도구 - 매크로 - 매로크 IDE]
	-	단축키 Alt+F11
2.	Microsoft Visual Studio Macros가 뜨면
	[프로젝트 탐색기]에서 "EnvironmentEvents" 선택
3.	`Public Module EnvironmentEvents` 끝에 다음 이벤트 코드를 추가하고 저장:
	~~~
		Private Sub WindowEvents_WindowActivated(ByVal GotFocus As EnvDTE.Window, ByVal LostFocus As EnvDTE.Window) Handles WindowEvents.WindowActivated
			activeDocCaption = DTE.ActiveDocument.Windows.Item(1).Caption

			If activeDocCaption.EndsWith(" [Design]") Or activeDocCaption.EndsWith(" [디자인]") Then
				DTE.Windows.Item(Constants.vsWindowKindToolbox).AutoHides = False
				DTE.Windows.Item(Constants.vsWindowKindProperties).AutoHides = False
			Else
				DTE.Windows.Item(Constants.vsWindowKindToolbox).AutoHides = True
				DTE.Windows.Item(Constants.vsWindowKindProperties).AutoHides = True
			End If
		End Sub
	~~~
