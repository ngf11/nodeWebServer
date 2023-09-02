const { format } = require("date-fns");

const { v4: uuid } = require("uuid");

const date = format(new Date(), "dd.MM.yyyy\tHH:mm:ss");

console.log(date);
console.log(uuid());
