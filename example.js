/*
 
This example will log into the irc server with the nickname
wikidatachangestest and monitor changes in all wikipedia channels.
The messages will be filtered using Bacon to create new streams
of changes in english and portuguese wikipedia channels.

The two channels are merged and the result is logged to the console.

*/

var WikiChanges = require("./wikichanges").WikiChanges;

var w = new WikiChanges({
  ircNickname: 'wikidatachangestest', 
  //wikipedias: ['#fr.wikipedia', '#de.wikipedia']
});

//w.changes.onValue(function(change) {
//    console.log(change.channel + ': ' + change.page + ' [' + change.user + ']')
//});

var ptChanges = w.changes.filter(function(change) {
	if (change.channel === '#pt.wikipedia') {return change};
});

var enChanges = w.changes.filter(function(change) {
	if (change.channel === '#en.wikipedia') {return change};
});

ptChanges.merge(enChanges).onValue(function(change) {
    console.log(change.channel + ': ' + change.page + ' [' + change.user + ']')
});