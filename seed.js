var Room = require('./models/room');

Room.bulkCreate([
  { name: 'barfooz'},
  { name: 'foo'},
  { name: 'bar'}
]).then(function(rooms) {
  console.log(rooms) // ... in order to get the array of user objects
})