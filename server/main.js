const express = require('express');
const app = express();
const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://andreevada9:_Daryandr9@filmscluster.alhoj84.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
const objectId = require("mongodb").ObjectId;
const config = require('./config.js');

(async () => {
    try {
        await client.connect();
        app.locals.collection = client.db("Filmsdb").collection("films");
        await app.listen(config.port, () => {
            console.log('Server is ready.');
        });
    } catch (err) {
        return console.log(err);
    }
})();


app.get('/list', async (req, res) => {
    const collection = app.locals.collection;
    try {
        const result = await collection.find().toArray();
        if (result) res.json(result);
        else res.sendStatus(404);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get("/list/:id", async (req, res) => {

    const collection = app.locals.collection;
    try {
        const id = new objectId(req.params.id);
        const doc = await collection.findOne({_id: id});
        if (doc) res.json(doc);
        else res.sendStatus(404);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

process.on("SIGINT", async () => {
    await client.close();
    console.log("Server is down.");
    process.exit();
});