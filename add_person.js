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

// function resultText(name, result) {
//   console.log('Found ' + result.length + ' person(s) by the name of ' + name + ':')
//   result.forEach(row => {
//     console.log(row.first_name, row.last_name, 'born: ' + row.birthdate.toISOString().split('T')[0]);
//   })
// }

const fName = process.argv[2]
const lName = process.argv[3]
const dBirth = process.argv[4]

knex('famous_people')
.insert({first_name: fName, last_name: lName, birthdate: dBirth})
.then(function() {
  console.log('submitted!')
})
.catch(function(err) {
    console.error(err)
  })
.finally(function(){
  knex.destroy()
})
