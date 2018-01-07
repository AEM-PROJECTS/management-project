var url = $($(window.getSelection().focusNode.parentElement).closest('.parbase').parent().find("cq")[0]).data("path");

if(url== undefined)
	window.open(redirect, "_blank");
else
	window.open("http://localhost:4502/crx/de/index.jsp#"+ encodeURI(url).replace(':','%3A'), "_blank");
