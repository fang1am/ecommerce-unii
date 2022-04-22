const express = require('express')
const cors = require('cors')
const app = express()
const port = 9000
const { MongoClient } = require("mongodb");
const mongo = require('mongodb')
const url = "mongodb://127.0.0.1:27017/RecycleProduct";

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/create', async(req, res) => {
    const {productCode,userCode,Email,Address} = req.body;
    const client = new MongoClient(url);
    await client.connect();
    await client.db('RecycleProduct').collection('Order').insertOne({
        orderNumber:'generate order number', //gen order number
        orderDate: new Date(),
        productCode: productCode,
        userCode: userCode,
        Address:Address
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "User is created",
      });
    
  })
  app.get('/order', async(req, res) => {
    const client = new MongoClient(url);
    await client.connect();
    const orders = await client.db('RecycleProduct').collection('Order').find({}).toArray();
    await client.close();
    res.status(200).send({status: 'ok',message:'',data:orders});
  })
app.put('/update', async(req, res) => {
    
    const {id,Address,productCode} = req.body;
  const client = new MongoClient(url);
  await client.connect();
  await client.db('RecycleProduct').collection('Order').updateOne({'_id': new mongo.ObjectID(id)}, 
  {"$set": {
     productCode: productCode,
    Address:Address
  }});
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "order is updated",
  });
    
  })

app.delete('/delete', async(req, res) => {
    const {id} = req.body;
  const client = new MongoClient(url);
  await client.connect();
  await client.db('RecycleProduct').collection('Order').deleteOne({'_id': new mongo.ObjectId(id)});
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "order is deleted"
  });
    
  })

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})