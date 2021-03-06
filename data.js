const request = require('request');

require('dotenv').config({path : './variables.env'});

function send_data(address, callback){
    var encodedAddress = encodeURIComponent(address);
    request({
        url :`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json : true
    }, (error, response, body)=>{
        if(error){
            callback(`Unable to retrieve data`);
        }
        else if(body.status === "ZERO_RESULTS"){
            callback(`Invalid Address`)
        }
        else if(body.status === "OK"){
            var lat = body.results[0].geometry.location.lat;
            var lng = body.results[0].geometry.location.lng;
            request({
            url :`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.WEATHER_API}`,
            json :true
            }, (error, response, body)=>{
                if(error){
                    callback(`Unable to retrieve data`);
                }
                else if(body.cod !== 200){
                    callback(`Invalid Address`)
                }
                else{
                    callback(undefined, body);
                }
            })
            }
        })
}



module.exports.send_data = send_data;
