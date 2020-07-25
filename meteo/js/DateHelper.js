'use strict';

class DateHelper {
    /**
     * DateHelper constructor
     * 
     * @param {string} lang
     * 
     * @returns {DateHelper}
     */
    constructor(lang) {
        this.lang = lang;
    }

    /**
     * Converts timestamp to date object
     * 
     * @param {number} timestamp 
     * 
     * @returns {Date}
     */
    convertTimestampToDate(timestamp) {
        return new Date(timestamp * 1000);
    }

    /**
     * Get today full date
     * 
     * @returns {String}
     */
    getTodayFullDate() {
        let date = new Date();
        let options = {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'long'
        };

        return new Intl.DateTimeFormat(this.lang, options).format(date);
    }

    /**
     * Get full date from timestamp
     * 
     * @param {Number} timestamp
     * 
     * @returns {String}
     */
    getFullDateFromTimestamp(timestamp) {
        let date = this.convertTimestampToDate(timestamp);
        let fullDateOptions = {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'long'
        };

        return new Intl.DateTimeFormat(this.lang, fullDateOptions).format(date);
    }

    /**
     * Get name of weekday from timestamp
     * 
     * @param {Number} timestamp
     * 
     * @returns {String}
     */
    getWeekdayFromTimeStamp(timestamp) {
        let date = this.convertTimestampToDate(timestamp);
        let weekdayOptions = { weekday: 'long' };

        return new Intl.DateTimeFormat(this.lang, weekdayOptions).format(date);
    }

    /**
     * Get hours and minutes from timestamp
     * 
     * @param {Number} timestamp
     * 
     * @returns {String}
     */
    getHourFromTimestamp(timestamp) {
        let date = this.convertTimestampToDate(timestamp);
        let hourOptions = {
            hour: '2-digit',
            minute: '2-digit'
        };

        return new Intl.DateTimeFormat(this.lang, hourOptions).format(date);
    }
}