function sendContextRecomendation(info, tab) {
    recoverUsernameAndSendLink(tab, function(tab, username) {
        sendLinkToTouchDevWeekly(tab, username);
    });
}

var contexts = ["all"];
for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var title = "Send To Touch Dev Weekly";
    var id = chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": sendContextRecomendation});
}
