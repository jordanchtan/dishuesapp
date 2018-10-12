const express = require('express');
const app = express();

app.use(express.json({limit:1024*1024*5}));
app.use(express.urlencoded());

app.use(express.static('/home/server'));
app.use('/restaurant', require('./routes/restaurants'));
app.use('/reviews', require('./routes/reviews'));
app.use('/menu', require('./routes/menu'));

app.get('/', async (req, res) =>
  {
    const message = 'hello world';
    res.send({status: 200, data: message});
  });


var port = 8081;

if (process.env.NODE_ENV == 'test') {
  port = 8080;
}

app.listen(port, () => console.log('App running on port ' + port ))

module.exports = app;
