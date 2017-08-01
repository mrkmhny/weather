var OWM_API_KEY = "152f4ba7ab6890212c50f762f4d95d2c";
var weather = {}; // example data for reference: /* "coord": { "lon": -74.01, "lat": 40.71 }, "weather": [ { "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" } ], "base": "stations", "main": { "temp": 275.971, "pressure": 1024.7, "humidity": 96, "temp_min": 275.971, "temp_max": 275.971, "sea_level": 1028.1, "grnd_level": 1024.7 }, "wind": { "speed": 1.59, "deg": 243.5 }, "clouds": { "all": 68 }, "dt": 1486840683, "sys": { "message": 0.1291, "country": "US", "sunrise": 1486814022, "sunset": 1486852042 }, "id": 5128581, "name": "New York", "cod": 200 */ 
var userGeo = {
    "lat": 0,
    "lon": 0,
    "city":"",
    "region":"",
    "country":""
    };

$(document).ready(function(){
  
  $.when(
// first we need to find user's location details using their IP
    $.get("https://ipinfo.io/", function (res) {
      userGeo.lat = res.loc.split(",")[0];
      userGeo.lon = res.loc.split(",")[1];
      userGeo.city = res.city;
      userGeo.region = res.region;
      userGeo.country = res.country;
      console.log(res);
    }, "jsonp")
    
   // after we have the user location saved...
).then(function(){
    
    // ... use that information to get weather for their location
    $.get("https://cors.now.sh/http://api.openweathermap.org/data/2.5/weather?lat=" + userGeo.lat + "&lon=" + userGeo.lon + "&APPID=" + OWM_API_KEY, function (resp) {
      
      // save details to var weather for later use
      weather = resp;
        
  // temperture calculations from Kelvin
    var tempC = Math.round( (weather.main.temp) -273.15); // &#8451 
    var tempF = Math.round( (weather.main.temp -273.15)*1.8+32) // &#8457
    
  // initialize to F
    $("#temp").html(tempF + "&#8457");
  // toggle on click
    $("#temp").click(function () {
      if ($('#temp').hasClass("F")) {
          $('#temp').attr("class","C")
          $("#temp").html(tempC + "&#8451");
      }
      else if ($('#temp').hasClass("C")) {
          $('#temp').attr("class","F")
          $("#temp").html(tempF + "&#8457");
      }
    })
                    
   // handle weather conditions and icon                              
    $("#cond-details").html(weather.weather[0].main); 
    $('#cond-icon').attr("src","https://cors.now.sh/http://openweathermap.org/img/w/" + weather.weather[0].icon +".png")
    
    // print user location to screen
    $("#location").html(userGeo.city + ", " + userGeo.region + ", " + userGeo.country);     
      
    }, "jsonp"); 
 
    })
})