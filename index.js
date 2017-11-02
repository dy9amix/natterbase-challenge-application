var path = require('path');
var funcs = require('./funcs');
var encodeName = funcs.encodName;

var session = {
  username: process.argv[2],
  lastMessageHash: process.argv[3]
};

if (!session.username || !session.lastMessageHash) {
  console.log('Usage: node index.js <username> <hash>');
  process.exit(0);
}

// 1. load the database
var dbFile = path.join(__dirname, 'db', 'index.json');
funcs.loadDb(dbFile, function (err, db) {

  var encoded = funcs.encodeName(session.username);
  var inbox = funcs.findInbox(db, encoded);
  var nextMessage = funcs.findNextMessage(inbox, session.lastMessageHash);
  console.log(nextMessage);
})
