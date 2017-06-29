const express = require('express');
const data = require(__dirname + '/data.js');
/* Body Parsers */
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
/* date parameters */
const date = new Date();
var weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var app = express();
app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/public'));
var port = process.env.PORT || 3000;
app.listen(port , ()=>console.log(`Listening to port ${3000}`));


/* homepage */
app.get('/' , (req , res)=>{
    data.send_data ('New Delhi' , (errorMessage , result)=>{
        if(errorMessage){
            res.render('index' , {alert : errorMessage});
        }
        else{
            var data ={
                day : weeks[date.getDay()-1],
                date : date.getDate(),
                month : months[date.getMonth()],
                location : ('New Delhi').toUpperCase(),
                temp : parseInt(result.main.temp-273.15),
                humidity : result.main.humidity,
                wind_speed : (result.wind.speed*1.6).toFixed(2),
                description : result.weather[0].description
            };
            res.render('index' , {data : data});
        }
    })
});

var address; //global address
app.post('/submit' , urlencodedParser , (req , res)=>{
    address = req.body.location;
     data.send_data (address , (errorMessage , result)=>{
        if(errorMessage){
            res.render('index' , {alert : errorMessage});
        }
        else{
            var data ={
                day : weeks[date.getDay()-1],
                date : date.getDate(),
                month : months[date.getMonth()],
                location : address.toUpperCase(),
                temp : parseInt(result.main.temp-273.15),
                humidity : result.main.humidity,
                wind_speed : (result.wind.speed*1.6).toFixed(2),
                description : result.weather[0].description
            };
            res.render('index' , {data : data});
        }
    })
})

app.get('/submit', (req, res)=>{
     data.send_data (address , (errorMessage , result)=>{
        if(errorMessage){
            res.render('index' , {alert : errorMessage});
        }
        else{
            var data ={
                day : weeks[date.getDay()-1],
                date : date.getDate(),
                month : months[date.getMonth()],
                location : address.toUpperCase(),
                temp : parseInt(result.main.temp-273.15),
                humidity : result.main.humidity,
                wind_speed : (result.wind.speed*1.6).toFixed(2),
                description : result.weather[0].description
            };
            res.render('index' , {data : data});
        }
    })
})


