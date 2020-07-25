'use strict';
<script
src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAm7z3Ltp4BnW-ssHJLMp4mCwITh0Y62sU&libraries=places&callback=initAutocomplete"></script>

// function initAutocomplete() {
//     // Create the autocomplete object, restricting the search predictions to
//     // geographical location types.
//     autocomplete = new google.maps.places.Autocomplete(
//         document.getElementById('city'), {types: ['geocode']});

//     // Avoid paying for data that you don't need by restricting the set of
//     // place fields that are returned to just the address components.
//     autocomplete.setFields(['address_component']);

//     //   // When the user selects an address from the drop-down, populate the
//     //     // address fields in the form.
//     //     autocomplete.addListener('place_changed', fillInAddress);
//     //     }

//     //     function fillInAddress() {
//     //     // Get the place details from the autocomplete object.
//     //     var place = autocomplete.getPlace();
//     //     console.log(place);
        
//     //    }
// }

// if user is DENYING geolocation
/*navigator.geolocation.watchPosition(function(position) {
    console.log("i'm tracking you!");
  },
  function(error) {
    if (error.code == error.PERMISSION_DENIED)
      console.log("you denied me :-(");
      $('main').addClass('hide');
      $('#welcome-page').addClass('hide');
      $('#nolocation-block').removeClass('hide');
  });
*/

var long = 5.394913;
var lat = 43.309718;
var api = 'http://api.openweathermap.org/data/2.5/weather?APPID=b84af2421303e95681b7e03e89f59d5a&lat=' + lat + '&lon=' + long + '&units=metric';
// api.openweathermap.org/data/2.5/weather?APPID=b84af2421303e95681b7e03e89f59d5a&lat=43.309718&lon=5.394913&units=metric
/* 
 * Fuction called when weather API response 
 */
function displayData(data)
{
    // console.log(data.coord.lon);
    console.log(data);
    console.log(data.main.temp);
    console.log(data.name);
   // $("#cityName").append(data.name);
   // $("#temperature").append(data.main.temp + ' &#8451;');
}
$.getJSON(api, displayData);

// var weekDayApi = 'http://api.openweathermap.org/data/2.5/forecast?APPID=b84af2421303e95681b7e03e89f59d5a&lat=' + lat + '&lon=' + long + '&units=metric';

// function displayWeekDayData(weekDayData)
// {
    
//     console.log(weekDayData);
//    // $("#cityName").append(data.name);
//    // $("#temperature").append(data.main.temp + ' &#8451;');
// }
// $.getJSON(weekDayApi, displayData);

// if (navigator.geolocation) {
// console.log('Geolocation is supported!');
// }
// else {
// console.log('Geolocation is not supported for this Browser/OS version yet.');
// }

$(document).ready(function() {
    var startPos;
    var geoOptions = {
        maximumAge: 5 * 60 * 1000,
        timeout: 10 * 1000,
        enableHighAccuracy: true
    }
    var geoSuccess = function(position) { // function geoSuccess(position) {blabla...}
        startPos = position;
        // console.log(position);
        
        // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
        // console.log(startPos.coords.latitude); 
    };
    var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
    };
    $('#enable-location').click(function(){
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    });
});

// console.log(startPos.coords.latitude); 

// var today = new Date();
// var dd = String(today.getDate()).padStart(2, '0');
// var mm = today.toLocaleString('en', { month: 'long' });
// var weekDay = today.toLocaleString('en', {  weekday: 'long' });
// var time = today.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

// today = weekDay + ', ' + mm + ':' + dd + ', ' + time;
// console.log(today);
// console.log(weekDay);
// console.log(time);

var date = new Date();
var options = {
    month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
    weekday: 'long',
};
console.log(date);
var todayDate = new Intl.DateTimeFormat('en-UK', options).format(date);
$('#date').append(todayDate);
