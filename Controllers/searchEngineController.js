
const mysql = require("mysql2");
const env = require("dotenv");
env.config();

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

const user = process.env.ELASTICSEARCH_USERNAME
const psw = process.env.ELASTICSEARCH_PASSWORD 

const { Client } = require('@elastic/elasticsearch');
const { get } = require("../Apis/articles");
const client = new Client({ node: 'https://localhost:9200',
    auth: {
        username: user,
        password: psw
    },
    ssl: {
        rejectUnauthorized: false,
    }, 
    tls: { rejectUnauthorized: false }});


const indexName = process.env.ELASTICSEARCH_INDEX ;
const indexUsers = process.env.ELASTICSEARCH_INDEXUSER

const getArticleSearch =  async (param) => {
    try {
        const res = await client.search({
          index: indexName,
          body: {
            query: {
              multi_match: {
                query: param,
                fields: ['title', 'content'],
              },
            },
          },
        });
        const results = res.hits.hits.sort((a,b)=>{
          if (a["_score"] >= b["_score"]) return 1
          else return -1
        });
        let array = []

        for (let i = 0 ; i< results.length; i++){
          console.log(results[i]["_source"]["_title"])
          let rows = await getArticleTitle(results[i]["_source"]["title"])
          array = [...array,...rows]
        }
    
        return array
        }
        catch (error) {
            console.error('Error processing the search:', error);
            return null;
        }
}

const getArticleTitle= async (title) => {
  const [rows] = await pool.query("SELECT * FROM article WHERE title = ?", [title]);
  return rows
}

const getUserSearch = async (param)=> {
  try {
    const res = await client.search({
      index: indexUsers,
      body: {
        query: {
          multi_match: {
            query: param,
            fields: ['fullname', 'details'],
          },
        },
      },
    });
    const results = res.hits.hits.sort((a,b)=>{
      if (a["_score"] >= b["_score"]) return 1
      else return -1
    });

    let array = []
    
    for (let i = 0 ; i< results.length; i++){
      let rows = await getUserTitle(results[i]["_source"]["iduser"])
      array = [...array,...rows]
    }

    return array
    }
    catch (error) {
        console.error('Error processing the search:', error);
        return null;
    }

}

const getUserTitle= async (user) => {
  const [rows] = await pool.query("SELECT * FROM USER WHERE id = ?", [user]);
  return rows
}
module.exports = { getArticleSearch, getUserSearch}