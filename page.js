$(document).ready(function() {
  $("#last").click(function() {
    if (navigator.geolocation) {
      var latt, long;
      navigator.geolocation.getCurrentPosition(function(position) {
        latt = position.coords.latitude;
        long = position.coords.longitude;
        $("#data").html("lat" + latt + "<br>long" + long);

        $.ajax({
          url:"https://crossorigin.me/https://api.darksky.net/forecast/5662943b9bd9d4cd36d9108bf4d5e286/"+latt+","+long,
          method: "GET",
          dataType: "json",
          success: function(data) {
            if (data.message != null) {
              $("#data1").html("error");
            } else {
              $(".top").html(data.timezone);
              
              //updating icon esing skycon
              var mo = data.currently.icon;
              var skycons = new Skycons({"color":"black"});
              skycons.add("icon1",mo);
              skycons.play();
              
              $("#temp").text(data.currently.temperature);
              $("#humd").text(data.currently.humidity);
              $("#wind").text(data.currently.windSpeed);
              $("#pres").text(data.currently.pressure);
              $("#uv").text(data.currently.uvIndex);              
            }
          }
        });

        //end of lat and long ft
      });
     
    } //end if navigation
  });
});
