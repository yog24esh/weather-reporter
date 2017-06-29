$(document).ready(function() {
  $("#last").click(function() {
    if (navigator.geolocation) {
      var latt, long;
      navigator.geolocation.getCurrentPosition(function(position) {
        latt = position.coords.latitude;
        long = position.coords.longitude;
        $("#data").html("lat" + latt + "<br>long" + long);

        $.ajax({
          url:
          "https://crossorigin.me/https://api.darksky.net/forecast/5662943b9bd9d4cd36d9108bf4d5e286/" +
          latt +
          "," +
          long,
          method: "GET",
          dataType: "json",
          success: function(data) {
            if (data.message != null) {
              $("#data1").html("error");
            } 
            else {
              $(".top").html(data.timezone);

              //updating icon esing skycon
              var mo = data.currently.icon;
              var skycons = new Skycons({ color: "black" });
              skycons.add("icon1", mo);
              skycons.play();
              var humidity = "Humidity: " + data.currently.humidity;
              var windSpeed = "Wind: " + data.currently.windSpeed +"m/s";
              var pressure = "Pressure: " + data.currently.pressure + "hPa";
              var ultraViolet = "UVIndex: " + data.currently.uvIndex;
              var tempInFah = data.currently.temperature;
              
              $("#temp").text(tempInFah);
              function toCelsius(Fah){
        return Math.round((Fah -32)+5/9);
      }
              var n=1;
              
                $("#df").click(function(){
                  if(n%2==1){
                    $("#temp").text(toCelsius(tempInFah));
                    $("#sym").html("&deg;C");
                    n++;
                  }
                  else{
                    $("#temp").text(tempInFah);
                    $("#sym").html("&deg;F");
                  }
                })
              
            
             
              $("#humd").text(humidity);
              $("#wind").text(windSpeed);
              $("#pres").text(pressure);
              $("#uv").text(ultraViolet);
            }
          }
        });

        //end of lat and long ft
      });
    } //end if navigation
  });
});

