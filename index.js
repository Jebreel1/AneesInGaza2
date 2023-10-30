require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const Member = require('./models/Member')
const Person = require('./models/Person')
const Note = require('./models/Person')
const User = require('./models/User')
const bcrypt = require("bcryptjs");

const app = express()
app.use(express.json({extended: true}));
app.use(express.urlencoded());
const port = 3000

const jwt = require("jsonwebtoken");

app.use(express.static("."));
// express.static built-in middleware function in Express and this in your .html file: <link rel="stylesheet" href="style.css">

let mongoUser = process.env.MONGOUSER
let mongoPassword = process.env.MONGOPASSWORD

let mongoURL= 'mongodb+srv://' + mongoUser + ':' + mongoPassword + '@cluster0.ns9aohf.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoURL);


      const db = mongoose.connection;
      db.on("error", console.error.bind(console, "connection error: "));
      db.once("open", function () {
        console.log("Connected successfully to Mongoose");
      });

// Endpoint to server the HTML
app.get('/', (req, res) => {
  res.sendFile("./index.html", {root: __dirname})
})

app.get('/login', (req, res) => {
    res.sendFile("./pages/login.html", {root: __dirname})
  })

app.get('/signup', (req, res) => {
    res.sendFile("./pages/signup.html", {root: __dirname})
  })

app.get('/share', (req, res) => {
    res.sendFile("./pages/share.html", {root: __dirname})
  })

  app.get('/about', (req, res) => {
    res.sendFile("./pages/about.html", {root: __dirname})
  })
  

  // Endpoint for the APIs
  app.post('/getnotes', async (req, res) => {
    const {userToken} = req.body
    let notes = await Note.find({email: req.body.email});
    res.status(200).json({success: true, notes})
  })

  app.post('/getmembers', async (req, res) => {
    const {userToken} = req.body
    // console.log("Trying to bring members");
    let members = await Member.find();
    res.status(200).json({success: true, members})
  })

  
  app.post('/getpersons', async (req, res) => {
    const {userToken} = req.body
    console.log("Tring to bring perople");
    let persons = await Person.find();
    res.status(200).json({success: true, persons})
  })

  app.post('/login', async (req, res) => {
    const {userToken} = req.body;
    let password =  await bcrypt.hash(req.body.plainPassword, 12);
    let user = await User.findOne({},{email: req.body.email, password: password});
    if(!user) {
      res.status(200).json({success: false, message: "No User Found!"})
    } else {
      res.status(200).json({success: true, user: {email: user.email}, message: "User Found!"})
    }

    //jsonwebtoken
    const userEmail = req.body.email;
    
  })

  app.post('/logout',  async (req, res) => {
    const {userToken} = req.body;
    let email = await req.body;
      res.status(200).json({success: true, user: {email: ""}, message: "User out!"})
    
  })

  app.post('/signup', async (req, res) => {
    const {userToken} = req.body
    console.log(req.body);
    let user = await User.create(req.body);
    res.status(200).json({success: true, user: user});
  })

  app.post('/addnote', async (req, res) => {
    const {userToken} = req.body;
    let note = await Note.create(req.body);
    res.status(200).json({success: true, note: note});
    })

    app.post('/addmember', async (req, res) => {
      const {userToken} = req.body;
      let member = await Member.create(req.body);
      console.log("Trying to add");
      res.status(200).json({success: true, member: member});
      })

      
      app.post('/addaneesian', async (req, res) => {
        const {userToken} = req.body;
        let person = await Person.create(req.body);
        console.log("Trying to anoos");
        res.status(200).json({success: true, person: person});
        })

  app.post('/deletenote', async (req, res) => {
    const {userToken} = req.body;
    // console.log("Trying to delete: " + req.body.deleteId)
    let note = await Note.deleteOne({ _id: req.body.deleteId });
    
    // console.log("Deleted!")
    res.status(200).json({success: true, note: note});

  })

  
  app.post('/updatemember', async (req, res) => {
    const {userToken} = req.body;
    let name = req.body.name;
    let well = req.body.well;
    let family = req.body.family;
    let house = req.body.house;
    let healthy = req.body.healthy;
    let time = req.body.time;

    let member = await Member.findByIdAndUpdate(req.body.updateId, {$set: {name: name, well:well, family:family, house:house, healthy:healthy, time:time}});
    // console.log("Updated!")
    res.status(200).json({success: true, member: member});

  })

  

  app.post('/updatefield', async (req, res) => {
    const {userToken} = req.body;
    let field = req.body.field;
    let newInput=  req.body.newInput;
    let query = {};
    query[field] = newInput;
    // console.log(field, newInput);
    // let member = await Member.findByIdAndUpdate(req.body.updateId, {$set: {field: newInput}});
    let member = await Member.findByIdAndUpdate(req.body.updateId, {$set: query});
      // console.log("Updated!")
    res.status(200).json({success: true, member: member});
  })


  app.post('/updatefieldpeople', async (req, res) => {
    const {userToken} = req.body;
    let field = req.body.field;
    let newInput=  req.body.newInput;
    let query = {};
    query[field] = newInput;
    // console.log(field, newInput);
    // let member = await Member.findByIdAndUpdate(req.body.updateId, {$set: {field: newInput}});
    let person = await Person.findByIdAndUpdate(req.body.updateId, {$set: query});
      // console.log("Updated!")
    res.status(200).json({success: true, person: person});
  })


app.listen(port, () => {
  //console.log(`Example app listening on port http://localhost:${port}`)
})