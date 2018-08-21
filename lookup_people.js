const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function resultText(name, result) {
  console.log('Found ' + result.length + ' person(s) by the name of ' + name + ':')
  result.forEach(row => {
    console.log(row.first_name, row.last_name, 'born: ' + row.birthdate.toISOString().split('T')[0]);
  })
}

client.connect((err) => {
  const name = process.argv[2]
  client.query(`
    SELECT *
    FROM famous_people
    WHERE first_name = $1::text`, [name], (err, result) => {
      if (err) {
        return console.error("error famous people query: ", err);
      } else {
        resultText(name, result.rows)
      client.end();
      }
    })

});
