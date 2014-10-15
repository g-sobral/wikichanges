wikichanges with Bacon.js
===========

This project is a fork of [edsu/wikichanges](https://github.com/edsu/wikichanges) and was created as an exercise on FRP with [Bacon.js](http://baconjs.github.io/index.html).

wikichanges is a node.js library for getting an edit stream from the 37 major language Wikipedias. The Wikipedia MediaWiki installations are configured to log changes in  [specific IRC channels](http://meta.wikimedia.org/wiki/IRC/Channels#Raw_feeds). wikichanges joins all these channels, listens for updates, which it then parses, and sends as Bacon.js event streams. Each change will look something like:

```javascript
{ 
  channel: '#en.wikipedia',
  wikipedia: 'English Wikipedia',
  page: 'Persuasion (novel)',
  pageUrl: 'http://en.wikipedia.org/wiki/Persuasion_(novel)',
  url: 'http://en.wikipedia.org/w/index.php?diff=498770193&oldid=497895763',
  delta: -13,
  comment: '/* Main characters */',
  wikipediaUrl: 'http://en.wikipedia.org',
  user: '108.49.244.224',
  userUrl: 'http://en.wikipedia.org/wiki/User:108.49.244.224',
  unpatrolled: false,
  newPage: false,
  robot: false,
  anonymous: true,
  namespace: 'Article'
  flag: '',
}
```

Usage
-----

Here's a simple example of listening on all Wikipedia channels and printing
out the page that changed along with its URL.

```javascript
var WikiChanges = require("wikichanges").WikiChanges;

var w = new WikiChanges();
w.changes.onValue(function(change) {
  console.log(change.channel + ': ' + change.page + ' [' + change.user + ']')
});
```

If you would like to listen only on a particular channel or channels 
create the wikichanges object like this:

```javascript
var w = new WikiChanges({wikipedias: ["#fr.wikipedia", "#de.wikipedia"]);
```

By default wikichanges picks a IRC nick of `wikichanges-{hostname}` where 
hostname is the hostname for the computer that your program is running.
If you would like to control the IRC nick used by your program use the 
`ircNickname` option:

```javascript
var w = new WikiChanges({ircNickname: 'super-awesome'})
```
