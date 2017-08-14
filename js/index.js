$(document).ready(function(){
  var long;
  var lat;
  var tempConvert = true;
  var api;
  
  if (navigator.geolocation) {  //Acquiring user's location
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      api = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;

    $.getJSON(api,function(json){  //Getting the json data
      var cels = Math.round(json.main.temp);
      var farh = Math.round(json.main.temp*1.8+32);  //converting from cels to farh
      $("#city").html(json.name+", "+json.sys.country)   //city name and country
      $("#temp").html(cels+"&#8451"); //temperature in celsius
      $("#description").html(json.weather[0].main.toUpperCase()) //main description of weather  
      $("#icon").html("<img src='"+json.weather[0].icon+"'+/>");  //icon of weather

      $("#toggle").on("click", function(){ //Toggling b/w celsius and fahrenheit
        if ($("#temp").html(cels) && tempConvert){
          $("#temp").html(farh+"&#8457");
          tempConvert = false;
        }else {
          $("#temp").html(cels+"&#8451");
          tempConvert = true;
        }
      });
      
      //Start: Setting background image based on weather
      var description = (json.weather[0].main)
     if (json.main.temp <= 0){  //snow
        $("body").css("background-image","url(http://www.vancitybuzz.com/wp-content/uploads/2015/12/shutterstock_315123593-984x500.jpg)");
      }
      else if (description == "Clear"){ //clear
        $("body").css("background-image","url(http://wallpapercave.com/wp/SwiWBWn.jpg)");
      }else if (description == "Clouds"){ //clouds 
        $("body").css("background-image","url(http://clipart-library.com/images/6cp5Eq59i.jpg)");
      }else if (description == "Rain"){ //rain
        $("body").css("background-image","url(https://i.ytimg.com/vi/lOt_3tg83Ls/maxresdefault.jpg)");
      }else if (description == "Mist"){ //mist
        $("body").css("background-image","url(https://static.pexels.com/photos/5230/road-fog-foggy-mist.jpg)");
      }else if (description =="Thunderstorm"){ //thunderstorm
        $("body").css("background-image","url(http://www.radionz.co.nz/assets/news/56956/eight_col_lightning.jpg?1452131998)");
      }
     //End
    });
   });
  }
});