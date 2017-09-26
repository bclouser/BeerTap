io = require('socket.io-client')
var socket = io.connect('http://localhost:6000');

var sendUpdates = function(numUpdatesToSend, ounceDiff){
	socket.emit('flowSensorData', { latestOz: ounceDiff });
	if(numUpdatesToSend > 0){
		console.log(numUpdatesToSend);
		setTimeout(sendUpdates, 200, --numUpdatesToSend, ounceDiff);
	}
}


socket.on('connect', function () {
  // socket connected
  sendUpdates(20, 0.11);
  return false;
});
