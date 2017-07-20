var meta = {
	pixelRatio: 1 / window.devicePixelRatio,
	setSize: function() {
		var oHtml = document.getElementsByTagName('html')[0];
		var htmlWidth = oHtml.getBoundingClientRect().width;
//		htmlWidth = htmlWidth > 1620 ? 1620 : htmlWidth;
		oHtml.style.fontSize = htmlWidth / 16 + "px";
	}
};
document.write('<meta name="viewport" content="width=device-width,initial-scale=' + meta.pixelRatio + ',minimum-scale=' + meta.pixelRatio + ',maximum-scale=' + meta.pixelRatio + ',user-scalable=no" />');
meta.setSize();
window.addEventListener("resize", meta.setSize, false);
window.addEventListener("orientationchange", meta.setSize, false);