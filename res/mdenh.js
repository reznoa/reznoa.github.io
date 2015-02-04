var MarkdownEnhancer =
{
	footnotes : null,

	loadFootnote : function(handler)
	{
		if (this.footnotes)
			return;

		this.footnotes = [];
		var sups = document.getElementsByTagName('sup');
		for (var i = 0; i < sups.length; i++)
		{
			var fnSup = sups[i];
			if (!fnSup['id'])
				continue;

			var fnLink = fnSup.childNodes[0];
			if (!fnLink)
				continue;

			var fnLinkValue = fnLink['href'];
			if (!fnLinkValue)
				continue;

			var fnID = decodeURI( fnLinkValue.substr(fnLinkValue.indexOf('#')+1) );
			var fnContent = document.getElementById(fnID);
			if (!fnContent)
				continue;

			var fnBackLinks = [];
			var fnBackLinks = fnContent.getElementsByTagName('a');
			for (var j = 0; j < fnBackLinks.length; j++) {
				if (!fnBackLinks[j].href)
					continue;
				var fnBackLinkValue = fnBackLinks[j].href.toString();
				if (fnBackLinkValue.substr(0, 6) == '#fnref')
					fnBackLinks[fnBackLinks.length] = fnBackLinks[j];
			}

			this.footnotes[this.footnotes.length] = {
				id: fnID,
				sup: fnSup,
				link: fnLink,
				backlinks: fnBackLinks,
				content: fnContent,
			};
		}
	},
};

MarkdownEnhancer.footnotePopup = function()
{
	var INDLEFTPAD = 10;
	var BACKREFLINK = /<a href="#fnref[^"]+" [^>]+>[^<]+<\/a>/g;
	var baseClassName;
	var footnotePopupInUse = false;

	function getArticleBody(parent, className)
	{
		while (parent.className != className)
		{
			parent = parent.parentNode;
		}
		return parent;
	}

	function footnotePopupMouseOverEventHandler(event)
	{
		var fnIdx = parseInt(this.getAttribute('footnote-index'));
		var baseElm = getArticleBody(this.parentNode, baseClassName);
		var basePos = getElementAbsolutePos(baseElm);
		var ptrPos = getElementAbsolutePos(this);
		var fnPopupPos = {x: basePos.x, y: (ptrPos.y + this.offsetHeight)};

		footnotePopupInUse = false;
		var fnPopup = document.getElementById('footnote-popup');
		if (fnPopup) {
			fnPopup.parentNode.removeChild(fnPopup);
		}
		fnPopup = document.createElement('div');
		fnPopup.id = 'footnote-popup';
		fnPopup.style.position = 'absolute';
		fnPopup.style.left = (fnPopupPos.x) + 'px';
		fnPopup.style.top = (fnPopupPos.y) + 'px';
		fnPopup.style.minWidth = '40px';
		fnPopup.style.width = 'auto';
		fnPopup.style.textAlign = 'left';
		fnPopup.innerHTML = MarkdownEnhancer.footnotes[fnIdx].content.innerHTML.toString().replace(BACKREFLINK, '');

		fnPopup.addEventListener('mouseover', function(event){
			footnotePopupInUse = true;
		}, true);

		fnPopup.addEventListener('mouseout', function(event){
			footnotePopupInUse = false;
			footnotePopupMouseOutEventHandler(event);
		}, true);

		document.body.appendChild(fnPopup);

		// parent보다 작게 조정
		if (fnPopup.clientWidth > baseElm.clientWidth) {
			fnPopup.style.maxWidth = (baseElm.clientWidth * 0.9) + 'px';
		}

		// 모양이 깨지지않게 위치 조정
		var popupIndLeft = (ptrPos.x - basePos.x);
		var markMidPos = popupIndLeft - (fnPopup.clientWidth / 2);
		var scrMidPos = ((baseElm.clientWidth - fnPopup.clientWidth) / 2);
		// 1. 화살표를 가운데 둘 수 있는 경우
		if (0 < markMidPos && markMidPos + fnPopup.clientWidth < baseElm.clientWidth) {
			fnPopupPos.x += markMidPos;
			popupIndLeft -= markMidPos;
		}
		// 2. 화면 가운데 둘 수 있는 경우
		else if (scrMidPos < popupIndLeft && popupIndLeft < (scrMidPos + fnPopup.clientWidth - 25)) {
			var adjustWidth = scrMidPos - (fnPopupPos.x - basePos.x);
			fnPopupPos.x += adjustWidth;
			popupIndLeft -= adjustWidth;
		}
		// 3. 화살표가 오른쪽으로 삐져나간 경우
		else if (fnPopup.clientWidth < popupIndLeft) {
			var adjustWidth = (popupIndLeft - fnPopup.clientWidth) + 25;
			fnPopupPos.x += adjustWidth;
			popupIndLeft -= adjustWidth;
		}
		// 4. 화살표가 왼쪽으로 삐져나간 경우
		else if (fnPopup.clientLeft > (popupIndLeft - INDLEFTPAD)) {
			fnPopupPos.x -= INDLEFTPAD;
			popupIndLeft += INDLEFTPAD;
		}
		fnPopup.style.left = (fnPopupPos.x) + 'px';
		var popupStyle = document.createElement('style');
		popupStyle.appendChild(document.createTextNode('#footnote-popup:before, #footnote-popup:after { left: '+ (popupIndLeft - INDLEFTPAD) + 'px;}'));
		fnPopup.appendChild(popupStyle);
	}

	function footnotePopupMouseOutEventHandler(event)
	{
		var fnPopup = document.getElementById('footnote-popup');

		window.setTimeout(function(){
			if (fnPopup && !footnotePopupInUse && fnPopup.parentNode) {
				fnPopup.parentNode.removeChild(fnPopup);
			}
		}, 150);
	}

	return function(className)
	{
		baseClassName = (!className) ? 'content' : className;

		MarkdownEnhancer.loadFootnote();

		for (var i = 0; i < MarkdownEnhancer.footnotes.length; i++)
		{
			var sFootnote = MarkdownEnhancer.footnotes[i];
			sFootnote.sup.setAttribute('footnote-index', i);
			sFootnote.sup.addEventListener('mouseover', footnotePopupMouseOverEventHandler, true);
			sFootnote.sup.addEventListener('mouseout', footnotePopupMouseOutEventHandler, true);
		}
	};
}();

MarkdownEnhancer.imageBlock = function()
{
	return function(baseElm)
	{
		if (!baseElm)
			baseElm = document.getElementByTagName('body');

		var imgs = baseElm.getElementsByTagName('img');
		for (var i = imgs.length - 1; i >= 0; i--)
		{
			if (!imgs[i].title)
				continue;

			var imgParent = imgs[i].parentNode;

			var imgPane = document.createElement('div');
			imgPane.className = 'imageblock';
			imgPane.maxWidth = imgs[i].clientWidth;
			imgPane.style = 'text-align: center;';

			var imgCaption = document.createElement('p');
			imgCaption.className = 'imagecaption';
			imgCaption.innerHTML = imgs[i].title;

			if (imgParent.tagName == 'A') {
				imgParent = imgParent.parentNode;
				imgPane.appendChild(imgs[i].parentNode);
			} else {
				imgPane.appendChild(imgs[i]);
			}
			imgPane.appendChild(imgCaption);

			imgParent.appendChild(imgPane);
		}
	}
}();
