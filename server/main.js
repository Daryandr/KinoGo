const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://andreevada9:_Daryandr9@filmscluster.alhoj84.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});
const objectId = require("mongodb").ObjectId;
const config = require("./config.js");
const cors = require("cors");

(async () => {
  try {
    await client.connect();
    app.locals.collection = client.db("Filmsdb").collection("films");
    await app.listen(config.port, () => {
      console.log("Server is ready.");
    });
  } catch (err) {
    return console.log(err);
  }
})();

app.use(cors());

app.get("/list", async (req, res) => {
  const collection = app.locals.collection;
  try {
    const result = await collection.find().project({
      _id: 1,
      type: 1,
      name: 1,
      description: 1,
      year: 1,
      alternativeName: 1,
      movieLength: 1,
      shortDescription: 1,
      poster: {
        url: 1
      },
      rating: {
        kp: 1,
        imdb: 1,
        filmCritics: 1
      },
      votes: {
        kp: 1,
        imdb: 1,
        filmCritics: 1
      },
      watchability: {
        items: {
          _id: 1,
          logo: {
            url: 1
          },
          name: 1,
          url: 1
        }
      }
    }).toArray();

    if (result) {
      for (let i = 0; i < result.length; i++) {
        result[i].poster = result[i].poster.url;
        result[i].watchability = result[i].watchability.items;
        if(result[i].watchability) {
          for (let j = 0; j < result[i].watchability.length; j++) {
            result[i].watchability[j].logo = result[i].watchability[j].logo.url;
          }
        }
      }
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/list/:id", async (req, res) => {
  const collection = app.locals.collection;
  try {
    const id = new objectId(req.params.id);
    const doc = await collection.findOne(
      { _id: id },
      {
        projection: {
          _id: 1,
          type: 1,
          name: 1,
          description: 1,
          year: 1,
          alternativeName: 1,
          movieLength: 1,
          shortDescription: 1,
          poster: {
            url: 1
          },
          rating: {
            kp: 1,
            imdb: 1,
            filmCritics: 1
          },
          votes: {
            kp: 1,
            imdb: 1,
            filmCritics: 1
          },
          watchability: {
            items: {
              _id: 1,
              logo: {
                url: 1
              },
              name: 1,
              url: 1
            }
          }
        }
      }
    );

    if (doc) {
      doc.poster = doc.poster.url;
      doc.watchability = doc.watchability.items;
      if(doc.watchability) {
        for (let j = 0; j < doc.watchability.length; j++) {
          doc.watchability[j].logo = doc.watchability[j].logo.url;
        }
      }
      res.json(doc);
    } else {
      res.sendStatus(404);
    }
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