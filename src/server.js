require('dotenv').config();
const app = require("./app");

app.listen(process.env.PORT || 3333);

console.log("ok " + new Date());