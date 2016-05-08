function injectMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js'}, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function getBgColors (tab) {

  injectMethod(tab, 'getBgColors', function (response) {
    var colors = response.data;
    if (colors && colors.length) {
      var url = 'http://colorpeek.com/#' + colors.join(',');
      chrome.tabs.create({ url: url });
    } else {
      alert('No background colors were found.');
    }
    alert('Elements in tab: ' + response.data);
    return true;
  });
}

chrome.browserAction.onClicked.addListener(getBgColors);
