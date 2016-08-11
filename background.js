var WEBHOOK_URL = 'https://hooks.slack.com/services/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';

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
	});
})
