// ==UserScript==
// @name                MicrosoftDocsSwitchingLanguage
// @name:zh-CN          微软文档中英切换
// @name:zh-TW          微軟文檔中英切換
// @description         switch Chinese/English language in Microsoft docs websites.
// @description:zh-CN   在微软文档中切换中文 / 英文
// @description:zh-TW   在微軟文檔中切換中文 / 英文
// @version             1.1

// @author              dangoron
// @contributor         ladit
// @namespace           https://greasyfork.org/zh-CN/scripts/33209
// @homepageURL         https://github.com/ladit/MicrosoftDocsSwitchingLanguage
// @supportURL          https://github.com/ladit/MicrosoftDocsSwitchingLanguage
// @grant               none

// @match               http*://msdn.microsoft.com/en-us/*
// @match               http*://msdn.microsoft.com/zh-cn/*
// @match               http*://docs.microsoft.com/en-us/*
// @match               http*://docs.microsoft.com/zh-cn/*
// ==/UserScript==

var switcher = document.createElement('span');
switcher.style.cssText = 'opacity: 0.5; color: black; cursor: pointer;position: fixed;bottom: 80%;left: 24%;z-index: 9999;';
switcher.innerHTML = '中文 / English 切换';

switcher.addEventListener('mouseover', function () {
  switcher.style.opacity = 1;
}, false);
switcher.addEventListener('mouseout', function () {
  switcher.style.opacity = 0.3;
}, false);

switcher.addEventListener('click', function () {
  if (document.URL.search(/\/en-us\//) != -1) {
    window.location.replace(url.replace(/\/en-us\//, '\/zh-cn\/'));
  }
  if (document.URL.search(/\/zh-cn\//) != -1) {
    window.location.replace(url.replace(/\/zh-cn\//, '\/en-us\/'));
  }
}, false);

document.body.appendChild(switcher);