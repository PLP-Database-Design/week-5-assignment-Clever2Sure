//importing dependencies

const express = require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')

const app = express()

app.use(express.json())
dotenv.config()


//connecting mysql
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//testing mysql db
db.connect((err) => {
    if(err){
        return console.log("Connection to MySQL database not successful", err)
    }

    console.log("Connection to MySQL database was successful", db.threadId)
})


// ejs templating configuration
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Retrieve all patients
app.get('/', (req, res) => {
   const getPatients = "SELECT * FROM patients" 
    db.query(getPatients, (err, results) => {
        if(err){
            return res.status(500).send("internal serval error", err)
        }

        res.status(200).json(results)
    })
})


// Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers" 
     db.query(getProviders, (err, results) => {
         if(err){
             return res.status(500).send("internal serval error", err)
         }
 
         res.status(200).send(results)
     })
 })

 //Filter patients by First Name
 app.get('/first_name', (req, res) => {
    const getPatients = "SELECT first_name FROM patients" 
     db.query(getPatients, (err, results) => {
         if(err){
             return res.status(500).send("internal serval error", err)
         }
 
         res.status(200).json(results)
     })
 })

 //Retrieve all providers by their specialty
 app.get('/specialty', (req, res) => {
    const getProviders = "SELECT provider_specialty FROM providers" 
     db.query(getProviders, (err, results) => {
         if(err){
             return res.status(500).send("internal serval error", err)
         }
 
         res.status(200).send(results)
     })
 })


// delcare the port and listen to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})