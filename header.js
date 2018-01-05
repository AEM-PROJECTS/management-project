

setTimeout(function(){ 
	if(window.location.href.indexOf("editor.html") != -1){
		document.getElementsByClassName("editor-GlobalBar js-editor-PanelHeader editor-panel-header")[0].style.borderTop="10px solid " + color;
	}else if(window.location.href.indexOf("crx/de/index.jsp") != -1){
		document.getElementsByClassName("x-box-inner")[0].style.borderTop="10px solid " + color;
	}else{
		document.getElementsByTagName("coral-shell")[0].style.borderTop="10px solid " + color;coral-shell
	}


}, 3000);

