const zendesk = require('./api/zendesk');

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(7777, () => console.log('Example app listening on port 7777'));


app.get('/api/tickets/:ticketId(\\d+)', function (req, res) {
	zendesk.getTicket(req.params.ticketId).then(ticket => res.json(ticket));
});
