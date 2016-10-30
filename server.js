var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var app = express();

var schema = new mongoose.Schema({ name: 'string', size: 'string' });
var Tank = mongoose.model('Tank', schema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req,res) {
  res.send('Welcome to the Homepage');
})
app.get('/tanks', function(req,res) {
  mongoose.model('Tank').find(function(err, tanks) {
    res.send(tanks);
  })
})

app.post('/tanks', function(req,res) {
  Tank.create({
    name:req.body.name,
    size: req.body.size
  },
  function (err, small) {
    if (err) {
      res.send({'success':false})
    } else {
      res.send({'success':true})
    }
  })
})
app.delete('/tanks', function(req,res) {
  Tank.remove({
    name: req.body.name
  },
  function (err) {
    if (err) {
      res.send({'success':false})
    } else {
      res.send({'success':true})
    }
  })
})



app.listen(process.env.PORT || 3000, function() {
  console.log('**********Listening on Port 3000**********');
});

mongoose.connect('mongodb://127.0.0.1/myDb')
