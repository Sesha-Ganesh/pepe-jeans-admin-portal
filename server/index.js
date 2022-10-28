//server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const MongoURL = 'mongodb://127.0.0.1:27017/';

const client = new MongoClient(MongoURL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const connecToMongoDb = require('./connect');
const ObjectID = require('mongodb').ObjectID;

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));
let db;

app.use(
   express.urlencoded({
      extended: true,
   })
);

app.use(express.json());

client.connect((dbconnerror, client) => {
   if (dbconnerror) {
      throw dbconnerror;
   } else {
      db = client.db('dress-store');
   }
});
//read
app.get('/getdresses', (req, res) => {
   db.collection('dresses')
      .find()
      .toArray((err, result) => {
         if (err) {
            throw err;
         } else {
            res.send({ status: 200, message: 'Retrieved successfully', data: result });
         }
      });
});
//create
app.post('/adddress', (req, res) => {
   if (db) {
      db.collection('dresses').insertOne(req.body, (err, result) => {
         if (err) {
            res.send({
               message: 'Server side  error!',
               status: 500,
            });
         } else {
            res.send({ status: 200, message: 'Posted successfully' });
         }
      });
   } else {
      res.send({
         message: 'Error : Connecting database !',
         status: 500,
      });
   }
});
//update
app.put('/updatedress', (req, res) => {
   db.collection('dresses').updateOne(
      { _id: ObjectID(req.body._id) },
      {
         $set: {
            name: req.body.name,
            imageURL: req.body.imageURL,
            price: req.body.price,
            quantity: req.body.quantity,
            type: req.body.type,
            gender: req.body.gender,
            color: req.body.color,
         },
      },
      (err, result) => {
         if (err) {
            throw err;
         } else {
            res.send({ status: 200, message: 'Updated successfully' });
         }
      }
   );
});

// delete
app.delete('/deletedress', (req, res) => {
   if (db) {
      db.collection('dresses').deleteOne({ _id: ObjectID(req.body._id) }, (err, result) => {
         if (err) {
            res.send({
               message: 'Server side  error!',
               status: 500,
            });
         } else {
            res.send({ status: 200, message: 'Deleted successfully' });
         }
      });
   } else {
      res.send({
         message: 'Error: Connecting Database',
         status: 500,
      });
   }
});

app.listen(PORT, () => {
   console.log(`server started on ${PORT}`);
});
