
const settings = require("./settings"); // settings.json


var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

function resultText(name, result) {
  console.log('Found ' + result.length + ' person(s) by the name of ' + name + ':')
  result.forEach(row => {
    console.log(row.first_name, row.last_name, 'born: ' + row.birthdate.toISOString().split('T')[0]);
  })
}

const name = process.argv[2]

knex('famous_people')
.select()
.where('first_name', name)
.asCallback(function(err, rows) {
    if (err) return console.error(err);
    resultText(name, rows);
    });
