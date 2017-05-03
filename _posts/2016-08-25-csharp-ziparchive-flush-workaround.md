---
layout: post
title: "[C#] ZipArchive를 이용한 ZIP 파일 수정이 잘 안될 때"
description: "ZipArchive를 이용해 ZIP 파일을 수정해도 수정내용이 파일에 잘 반영이 안될 때 유용한 코드에 대해 알아본다."
date: 2016-08-25 11:58:31 +0900
category: Programing
tags: [C#, ZIP, Dispose, 코드조각]
---

C#에는 ZIP으로 압축한 파일 패키지를 다루기 위한 클래스로 [ZipPackage](https://msdn.microsoft.com/en-us/library/system.io.packaging.zippackage.aspx "System.IO.Packaging.ZipPackage")가 있다.
별도의 라이브러리 설치가 필요없고 파일 작업도 쉽기 때문에 써보려하게 되는데,
이 놈은 불만스럽게도 늘 ZIP 파일 루트에 "[Content_Types].xml" 파일을 생성한다.
이런 불필요하고 껄끄러운 특징은 아마
ZipPackage가 ZIP 파일 핸들링을 위한 범용 클래스가 아니라 특정 목적을 위한거라서 그런게 아닐까 싶다.

.Net Framework에서 기본으로 제공하는 다른 클래스로는 [ZipArchive](https://msdn.microsoft.com/en-us/library/system.io.compression.ziparchive.aspx "System.IO.Compression.ZipArchive")라는 것도 있다.
ZipPackage와 비교하면 Flush()나 Close()가 없어서 파일을 핸들링 하기 위한건 아닌것 같아 보이는,
일견 ZIP 파일을 읽어 그 내용을 보는 용도로 만든것 같은 놈이다.

실제로 ZipArchive 객체를 만들고 ZipArchiveEntry를 열어 수정한 후,
연결했던 Stream을 파일로 써봐도 바뀐 내용은 반영되어있지 않은 경우가 있다.
특히 압축된 파일 중 일부만 건드린 경우 그러한데,
그럴땐 다음처럼 쓰면 문제를 해결 할 수 있다.

~~~
MemoryStream memStream = new MemoryStream();
// TODO load file to memStream

ZipArchive zip = new ZipArchive(memStream, ZipArchiveMode.Update, true);
// ...
{
	ZipArchiveEntry fileEntry = zip.CreateEntry(newFilePath);
	Stream fileStream = fileEntry.Open();
	// TODO write to fileStream
	fileStream.Close();
}
zip.Dispose();

memStream.Position = 0;
// TODO write memStream to file
~~~

여기서 중요한건 다음 2줄이다:

~~~
ZipArchive zip = new ZipArchive(memStream, ZipArchiveMode.Update, true);

zip.Dispose();
~~~

먼저 ZipArchive를 만들 때, ZipArchiveMode만 Update로 줄게 아니라,
세번째 인자인 leaveOpen을 true로 줘서
memStream을 자동으로 닫지 않게 해야한다.

그리고 작업이 끝난 후 ZipArchive 객체를 Dispose()한다.
이는 작업 내용을 해당 시점에 온전히 memStream으로 Flush 하기 위함이다.
그렇지 않으면 언제 Flush 될 지 알 수 없기 때문에,
그 아래쪽에서 제 아무리 memStream을 저장해봐도 바뀌지 않은 원래 내용만 저장될 수 있다.

보통은 Dispose()하면 Stream도 닫기 때문에 그림의 떡이 될 수 있지만,
앞에서 leaveOpen 인자를 true로 줬기 때문에 Stream은 여전히 살아있다.

이제 할 일은 이 Stream의 내용을 원하는 파일로 쓰는 것 뿐이다.
그리고 볼일 다 본 Stream을 정리해주면 된다.
