var express		= require('express'),
	app			= express(),
	path		= require('path');

app.use(function (req,res,next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
	              Authorization');
	next();
});

// setup the static file directory to make pulling with angular easier
app.use(express.static(__dirname + '/public'));

// setup node to use the angular index page as the base route
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.on('error', function (err) {
	console.log('An error occured:' + err );
});

var port = 1335;		
// Start the server
app.listen(port);
console.log('The \x1b[33m** \x1b[32mMiller Farms\x1b[0m \x1b[33m** \x1b[0mserver is listening on port: \x1b[31m' + port + "\x1b[0m!");
