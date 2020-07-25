'use strict';

class WeatherApp {
    tag = $('#5-weekday-temp');
    position;
    comingDayNumber=0;
    /*
     * Getting current hour to set starting index of next day
     */
    currentHour = (new Date()).getHours();
    weatherData;

    dataFromIcons = {
        "clear-day": {
            "icon": "img/sun_icon.svg",
            "text": "Sunny"
        },
        "clear-night": {
            "icon": "img/clear_night_icon.svg",
            "text": "Clear night"
        },
        "rain": {
            "icon": "img/rain_icon.svg",
            "text": "Rain"
        },
        "snow": {
            "icon": "img/snow_icon.svg",
            "text": "Snow"
        },
        "sleet": {
            "icon": "img/sleet_icon.svg",
            "text": "Sleet"
        },
        "wind": {
            "icon": "img/windy_icon.svg",
            "text": "Wind"
        },
        "fog": {
            "icon": "img/fog_icon.svg",
            "text": "Fog"
        },
        "cloudy": {
            "icon": "img/cloud_icon.svg",
            "text": "Cloudy"
        },
        "partly-cloudy-day": {
            "icon": "img/cloud_part_icon.svg",
            "text": "Partly cloudy"
        },
        "partly-cloudy-night": {
            "icon": "img/cloud_part_night_icon.svg",
            "text": "Partly cloudy"
        }   
    }
    
    /** @type {DateHelper} */
    dateHelper;

    constructor(dateHelper) {
        this.dateHelper = dateHelper;
        this.plugEvents();
    }

    plugEvents() {
        $('#enable-location').click(this.askLocation.bind(this));
        $('.weekday').click(this.openHoursBlock.bind(this));
        $('#close-btn').click(this.closeHoursBlock.bind(this));
        $('#overlay').on('click', this.closeHoursBlock.bind(this));
        $('#today').click(this.displayHourForecast.bind(this));
        $('.n-weekday').click(this.onClickWeekdayShowMain.bind(this));
        $('.n-weekday').click(this.onClickWeekdayShowHours.bind(this));
    }

    async checkLocation() {
        if (navigator.permissions) {
        let geoPositionPermission = await navigator.permissions.query({name: 'geolocation'});

            if ("granted" === geoPositionPermission.state) {
                
                this.askLocation();  
            };

            if ("denied" === geoPositionPermission.state) {
                this.onLocationError();
            };
        }    
    }
   
    /*
     * This method is called when user clicks "enable location" button
     */
    askLocation() {        
        navigator.geolocation.getCurrentPosition(this.onLocationRecieved.bind(this), this.onLocationError);  
        $('.loading-block').removeClass('hide');
        $("#overlay2").css("display", "block"); 
    }

    /*
     * This method is called when browser recieves location
     */
    onLocationRecieved(position) {
        this.position = position;
        
        $('main').removeClass('hide');
        $('#welcome-page').addClass('hide');
        this.requestCityName();
        this.requestWeatherData();
        
    }

    /*
     * This method is called when browser doesn't get location
     */
    onLocationError() {
        $('main').addClass('hide');
        $('#welcome-page').addClass('hide');
        $('#nolocation-block').removeClass('hide');
    }

    requestWeatherData() {
        let weatherapiURL = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/4938c178b3ad1508aa914cb7377eed38/' + this.position.coords.latitude + ',' + this.position.coords.longitude + '?units=auto&exclude=minutely,alerts,flags&extend=hourly';
        //let weatherapiURL = 'js/data.json';
        
        $.getJSON(weatherapiURL, this.onWeathereDataReceived.bind(this));
    }

    requestCityName() {
        let googleapiURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + this.position.coords.latitude + ',' + this.position.coords.longitude + '&result_type=locality&language=en&key=AIzaSyAm7z3Ltp4BnW-ssHJLMp4mCwITh0Y62sU';

        $.getJSON(googleapiURL, this.onCityNameReceived.bind(this));
    }

    onCityNameReceived(data){
        var cityName = data.results[0].address_components[0].long_name;
        $('#cityName').html(cityName); 
    }

    onWeathereDataReceived(data) {
        this.weatherData = data;
        $('.loading-block').addClass('hide');

        for (let i = 1; i < 6; i++) {
            $('#' + i + '-weekday-icon').attr('src', this.dataFromIcons[data.daily.data[i].icon].icon);
            $('#' + i + '-weekday-temp').html('&uarr;&nbsp;'+Math.round(this.weatherData.daily.data[i].temperatureHigh) + ' ' + '&darr;&nbsp;'+Math.round(this.weatherData.daily.data[i].temperatureLow) + '&nbsp;°');
            
            var weekdayName = this.dateHelper.getWeekdayFromTimeStamp(this.weatherData.daily.data[i].time);
            
            $('#' + i + '-weekday-name').text(weekdayName);
        }        
        
        /*
         * Showing main content when all data is recieved ang shown
         */
        if (this.tag.length > 0 ) {
            $('main').removeClass('hide');
            $('#welcome-page').addClass('hide');   
        } 
        $("#overlay2").css("display", "none");
        
        this.displayMainData();
    }

    displayMainData() {       
        var sunriseTime = this.dateHelper.getHourFromTimestamp(this.weatherData.daily.data[0].sunriseTime);
        
        var sunsetTime = this.dateHelper.getHourFromTimestamp(this.weatherData.daily.data[0].sunsetTime);

        $('#date').text(this.dateHelper.getTodayFullDate());
        $('#main-icon, #today-icon').attr('src', this.dataFromIcons[this.weatherData.currently.icon].icon)
        $('#main-desription').text(this.weatherData.currently.summary);
        $('#temperature').html(Math.round(this.weatherData.currently.temperature) + '&nbsp;°C');
        $('#today-temp').html(Math.round(this.weatherData.currently.temperature) + '&nbsp;°');
        $('#pressure').text(this.weatherData.currently.pressure + 'mm Hg');
        $('#humidity').text(Math.round(this.weatherData.currently.humidity * 100) + '% humidity');
        $('#wind').text(Math.round(this.weatherData.currently.windSpeed) + 'm/s ');
        $('#sun-rise-set').text(sunriseTime + ' - ' + sunsetTime);
    }
    
    openHoursBlock () {
        $('.slider').addClass('slided');
        $('#overlay').css('display', 'block');  
    }
    
    closeHoursBlock() {
        $('.slider').removeClass('slided');
        $('#overlay').css('display', 'none');
    }

    onClickWeekdayShowMain(event) {
        this.comingDayNumber = $(event.currentTarget).index();
        let dayData = this.weatherData.daily.data[this.comingDayNumber];
        
        $('#main-icon').attr('src', this.dataFromIcons[dayData.icon].icon);
        $('#main-desription').text(dayData.summary);
        $('#temperature').html('&uarr;&nbsp;'+Math.round(dayData.temperatureHigh) + ' ' + '&darr;&nbsp;'+Math.round(dayData.temperatureLow) + '&nbsp;°');
        $('#pressure').text(dayData.pressure + 'mm Hg');
        $('#humidity').text(Math.round(dayData.humidity * 100) + '% humidity');
        $('#wind').text(Math.round(dayData.windSpeed) + 'm/s ');

        var sunriseTime = this.dateHelper.getHourFromTimestamp(dayData.sunriseTime);
        
        var sunsetTime = this.dateHelper.getHourFromTimestamp(dayData.sunsetTime);

        $('#sun-rise-set').text(sunriseTime + ' - ' + sunsetTime);

        var dayDate = this.dateHelper.getWeekdayFromTimeStamp(dayData.time);
        $('#date').text(dayDate);
    }

    onClickWeekdayShowHours(event) {
        this.comingDayNumber = $(event.currentTarget).index() -1;

        $('.slider').addClass('slided');

        let array = [];
        /*
         * Getting next day starting index according to current hour
         */
        let nextDayStartIndex = 24 - this.currentHour;
        
        let nextDaysStart;

        while (this.comingDayNumber < 6) {
            
            nextDaysStart = nextDayStartIndex + 24 * this.comingDayNumber;
            this.comingDayNumber++;
        
            for (let index = nextDaysStart + 10; index < nextDaysStart + 28; index += 2) {
                let hourTagIndex = array.push(index);

                $('#' + hourTagIndex + '-hour-icon').attr("src", this.dataFromIcons[this.weatherData.hourly.data[index].icon].icon); 
                $('#' + hourTagIndex + '-hour-temp').html(Math.round(this.weatherData.hourly.data[index].temperature) + '&nbsp;°');

                var hour = this.dateHelper.getHourFromTimestamp(this.weatherData.hourly.data[index].time);
                $('#' + hourTagIndex + '-hour').text(hour);                    
            }
        }
        
    }

    displayHourForecast() {
        for (let i = 0; i < 9; i++) {
            $('#' + i + '-hour-icon').attr("src", this.dataFromIcons[this.weatherData.hourly.data[i].icon].icon);
            $('#' + i + '-hour-temp').html(Math.round(this.weatherData.hourly.data[i].temperature) + '&nbsp;°');

            var hour = this.dateHelper.getHourFromTimestamp(this.weatherData.hourly.data[i].time);
            $('#' + i + '-hour').text(hour);
       
        this.displayMainData();
    }
    
    }

}