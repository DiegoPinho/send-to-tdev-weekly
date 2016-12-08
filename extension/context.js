function sendContextRecomendation(info, tab) {
    recoverUsernameAndSendLink(tab, function(tab, username) {
        sendLinkToTouchDevWeekly(tab, username);
		saveLinkOnTouchDevWeekly(tab, username);
    });
}

var contexts = ["all"];
for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Send this to Touch Dev Weekly";
    var id = chrome.contextMenus.create({
        "title": title,
        "contexts":[context],
        "onclick": sendContextRecomendation
    });
}
