'use strict';

$(document).ready(async function(){
  let dateHelper = new DateHelper('en');
  let weatherApp = new WeatherApp(dateHelper);
  await weatherApp.checkLocation();
});
