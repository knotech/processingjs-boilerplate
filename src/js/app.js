var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('shit is moving');
});

// TODO: Add config file for dynamic port allocation based on env
var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server is listening at http://%s:%s.', host, port);
});
