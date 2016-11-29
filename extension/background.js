var WEBHOOK_URL_DEV = 'https://hooks.slack.com/services/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'
var WEBHOOK_URL = 'https://hooks.slack.com/services/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';


var SERVER_URL = 'https://tdevweekly-server.herokuapp.com/';
var API_URL = 'https://tdevweekly-api.herokuapp.com/';

// WEBHOOK_URL = WEBHOOK_URL_DEV;

function sendLinkToTouchDevWeekly(tab, username) {
	var text = username + ' recomendou: \n*' + tab.title + '* \n' + tab.url;
	$.ajax({
		data: 'payload=' + JSON.stringify({
			"text": text
		}),
		dataType: 'json',
		processData: false,
		type: 'POST',
		url: WEBHOOK_URL,
	});

	showNotification('Sua recomendação foi enviada!', tab.title);
}

function saveLinkOnTouchDevWeekly(tab, username) {
	var url = API_URL + 'save';
	var data = {
		username: username,
		title: tab.title,
		url: tab.url,
		date: new Date()
	};

	$.ajax({
		url: url,
		dataType: 'json',
		type: 'POST',
		data: data
	});
}

function showNotification(title, message){
	var notificationOptions = {
		type: "basic",
  		title: title,
  		message: message,
  		iconUrl: "icon.png"
	};

	chrome.notifications.create('notification', notificationOptions);
}

function recoverUsernameAndSendLink(tab, callback) {
	chrome.storage.sync.get('username', function(items) {
		var username = items.username || 'anonymous';
		callback(tab, username);
    })
}

// ========================================================== //

chrome.browserAction.onClicked.addListener(function(tab){
	recoverUsernameAndSendLink(tab, function(tab, username) {
		sendLinkToTouchDevWeekly(tab, username);
		saveLinkOnTouchDevWeekly(tab, username);
	});
})

chrome.runtime.onInstalled.addListener(function (details) {
	var reason = details.reason;
	switch(reason) {
		case 'update':
			var currentVersion = chrome.runtime.getManifest().version;
			showNotification('Nova versão disponível!', 'Sua extensão foi atualizada para a versão ' + currentVersion);
			break;
		case 'install':
			showNotification('Seja bem-vindo!', 'Vá para a página de opções e configure seu usuário antes de enviar seus links!')
			break;
	}
})
