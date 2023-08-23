const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const articles = require("./Apis/articles");
const comments = require("./Apis/comments");
const communities = require("./Apis/communities");
const signup = require("./Apis/signup");
const login = require("./Apis/login");
const verifyJWT = require("./Middlewares/checkJWT");
const cookieParser = require("cookie-parser");
const refresh = require("./Apis/refresh");
const logout = require("./Apis/logout");
const home = require("./Apis/home")
const user = require("./Apis/user");
const picture = require("./Apis/picture");
const notification = require("./Apis/notification");

const { Client } = require('@elastic/elasticsearch');


env.config();



const app = express();
const PORT = process.env.PORT;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/register", signup);
app.use("/login", login);
app.use("/refresh", refresh);
//app.use(verifyJWT);
app.use("/articles", articles);
app.use("/comments", comments);
app.use("/communities", communities);
app.use("/logout", logout);
app.use("/home", home);
app.use("/user", user);
app.use("/picture", picture);
app.use("/notification", notification);

app.get("/", (req, res) => {
  res.status(200).send("ok");
});

const indexName = process.env.ELASTICSEARCH_INDEX
const indexUsers = process.env.ELASTICSEARCH_INDEXUSER 
const userelastic = process.env.ELASTICSEARCH_USERNAME
const psw = process.env.ELASTICSEARCH_PASSWORD

const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: userelastic,
    password: psw
  },
  ssl: {
    rejectUnauthorized: false,
  },
  tls: { rejectUnauthorized: false }
});

(async () => {
  try {
    await client.indices.delete({index: indexUsers});
    console.log(`Index "${indexUsers}" cd.`);
  } catch (error) {
    console.error('Error creating the index: Already exist');
  }
})();



(async () => {
  try {
    await client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            title: { type: 'text' },
            content: { type: 'text' },
          },
        },
      },
    });
    console.log(`Index "${indexName}" created.`);
  } catch (error) {
    console.error('Error creating the index: Already exist');
  }
})();

(async () => {
  try {
    await client.indices.create({
      index: indexUsers,
      body: {
        mappings: {
          properties: {
            fullname: { type: 'text' },
            iduser: { type: 'integer' },
            details: { type: 'text' },
          },
        },
      },
    });
    console.log(`Index "${indexUsers}" created.`);
  } catch (error) {
    console.error('Error creating the index: Already exist');
  }
})();

async function run() {
  await client.index({
    index: indexName,
    body: {
      title: 'Ned Stark',
      content: 'Winter is coming.'
    }
  })

  await client.index({
    index: indexName,
    body: {
      title: 'Daenerys Targaryen',
      content: 'I am the blood of the dragon.'
    }
  })

  await client.index({
    index: indexName,
    body: {
      title: 'Bonjour tous le monde',
      content: 'this is my description.'
    }
  })

  await client.index({
    index: indexUsers,
    body: {
      iduser: 1,
      fullname: "kamel",
      details: "detail",
    }
  })

  await client.indices.refresh({ index: indexUsers })
  
}

//run().catch(console.log)




app.listen(PORT, () => {
  console.log(`server has been started at port ${PORT}`);
})

module.exports = { client, indexName };