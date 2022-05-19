const {Client} = require('pg');
const isProduction = process.env.NODE_ENV === 'production';
const connectionStrings = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const client = new Client({

    connectionString: process.env.DATABASE_URL ,
    ssl: isProduction? {
        rejectUnauthorized: false
    }:false
});
const localClient = new Client({
    connectionString: connectionStrings
});
const mainClient = isProduction? client : localClient;

console.log(client.connectionString);
console.log(isProduction);
console.log(process.env.DATABASE_URL);
console.log(connectionStrings);
console.log(mainClient.database);
module.exports = mainClient;