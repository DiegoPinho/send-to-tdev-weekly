var properties = 'username';

function save() {
    var username = document.querySelector('#username').value;
    chrome.storage.sync.set({'username' : username,}, function() {
        alert('options successfully updated');
    })
}

function load() {
    alert(chrome);
    chrome.storage.sync.get(properties, function(items) {
        document.querySelector('#username').value = items.username || 'anonymous';
    })
}

document.addEventListener('DOMContentLoaded', function() {
    load();
    document.querySelector('#save-options').addEventListener('click', save);
});
