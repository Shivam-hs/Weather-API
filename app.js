const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(bodyParser.urlencoded({extended : true}));
app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){

  const query = req.body.cityName;
  const id = process.env.API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + id + "&units=metric";
  https.get(url,(response) => {

    console.log(response.statusCode);

    response.on("data",function(data){
      const weather = JSON.parse(data);
      console.log(weather);
      
      const temp = weather.main.temp;
      const img = weather.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + img + "@2x.png";
      const weatherDescription = weather.weather[0].description
      res.write("<p>Current weather is " + weatherDescription + " </p>");
      res.write("<h1>Temperature in " + query + " is " + temp + " degree celsius</h1>");
      res.write("<img src="+imgURL+ ">");
      res.send();
    })
  })
})



app.listen(3000,function(){
  console.log("Server is running on port 3000.");
})
