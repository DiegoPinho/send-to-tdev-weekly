var EMAIL_DEVWEEKLY = 'touchdevweekly@gmail.com';
var FORMSPREE_URL = 'https://formspree.io/' + EMAIL_DEVWEEKLY;

function sendEmailByAJAX(url){
	var httpRequest = new XMLHttpRequest();
	httpRequest.open('POST', 'http://localhost:8080/', true);
	httpRequest.setRequestHeader("Content-type", "application/json");
	httpRequest.responseType = 'json';
	httpRequest.onreadystatechange = function () { 
	    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
	        alert("e-mail enviado com sucesso!");
	    }
	}

	var data = JSON.stringify({
		message: "hello world!"
	});
	
	alert('url: ' + FORMSPREE_URL + '\n url-tab: ' + url);

	httpRequest.send(data);
}

function createFormAndSendEmail() {
	var form = document.createElement('form');
	form.setAttribute('method', 'POST');
	form.setAttribute('action', FORMSPREE_URL);

	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('name', 'url');
	input.setAttribute('value', 'teste');

	form.appendChild(input);

	alert(form);
	form.submit();
}

function test() {
	var queryInfo = {'active':true};
	chrome.tabs.query(queryInfo, function(tabs) {
	    var tabAtiva = tabs[0]; // here we know that's only one
	    // sendEmailByAJAX(tabAtiva.url);
	    createFormAndSendEmail();
	});
}

chrome.browserAction.onClicked.addListener(function(tab){
	test();
})




/**
https://formspree.io/
<form action="https://formspree.io/your@email.com"
      method="POST">
    <input type="text" name="name">
    <input type="email" name="_replyto">
    <input type="submit" value="Send">
</form>


$.ajax({
    url: "https://formspree.io/you@email.com", 
    method: "POST",
    data: {message: "hello!"},
    dataType: "json"
});
**/



// function createFormAndSendEmail() {
// 	var form = document.createElement('form');
// 	form.setAttribute('method', 'POST');
// 	form.setAttribute('action', FORMSPREE_URL);

// 	var input = document.createElement('input');
// 	input.setAttribute('type', 'text');
// 	input.setAttribute('name', 'url');

// 	form.appendChild(input);
// }