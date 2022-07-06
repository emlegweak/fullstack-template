//require dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const { response } = require('express');
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

//declare variables
let db, 
    dbConnectionString = process.env.DB_STRING,
    dbName = 'star-wars-quotes',
    collection 

//establish database connection
MongoClient.connect(dbConnectionString)
//set initial parameters for db connection
    .then(client => {
        console.log('Connected to Database! Isn\'t that swell.');
        db = client.db(dbName)
        collection = db.collection('quotes')
    })

//middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

//routes
app.get('/', async (request, response) => {
    try {
        response.render('index.ejs')
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
})

//create PORT
app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}. Better go catch it...`)
})