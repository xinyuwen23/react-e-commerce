const moment = require('moment')

var day = new Date(2011, 9, 16)
var dayWrapper = moment(day).format('MM-DD-YYYY')

console.log(day)
console.log(dayWrapper)
