var element = $('h2:contains("'+txt+'")');
	if( element == null)
		element = $('p:contains("'+txt+'")');
	if( element == null)
		element = $('div:contains("'+txt+'")');
	if( element == null)
		element = $('li:contains("'+txt+'")');


var url = $(element).closest('.parbase').parent().find("cq").data("path");
window.open("http://localhost:4502/crx/de/index.jsp#"+ encodeURI(url).replace(':','%3A'), "_blank");
