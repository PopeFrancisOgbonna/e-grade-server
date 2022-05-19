const {Client} = require('pg');
const isProduction = process.env.NODE_ENV === 'production';
const connectionStrings = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const client = new Client({

    connectionString: isProduction? process.env.DATABASE_URL : connectionStrings,
    ssl: isProduction? {
        rejectUnauthorized: false
    }:false
});
console.log(client.connectionString);
console.log(isProduction);
console.log(process.env.DATABASE_URL);
console.log(connectionStrings);
module.exports = client;