var WEBHOOK_URL = 'https://hooks.slack.com/services/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';

function sendLinkToTouchDevWeekly(tab, username) {
	var text = mountText(tab, username);
	$.ajax({
		data: 'payload=' + JSON.stringify({
			"text": text
		}),
		dataType: 'json',
		processData: false,
		type: 'POST',
		url: WEBHOOK_URL,
	});
}

function mountText(tab, username) {
	return username + ' recomendou: \n*' + tab.title + '* \n' + tab.url;
}

function recoverUsernameAndSendLink(tab, callback) {
	chrome.storage.sync.get('username', function(items) {
		var username = items.username || 'anonymous';
		callback(tab, username);
    })
}

chrome.browserAction.onClicked.addListener(function(tab){
	recoverUsernameAndSendLink(tab, function(tab, username) {
		sendLinkToTouchDevWeekly(tab, username);
	});
})
