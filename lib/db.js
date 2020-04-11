'use-strict'

const { MongoClient } = require('mongodb')
const {
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_NAME
} = process.env
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`
// const client = new MongoClient(uri, { userNewUrlParser:true })
// client.connect(err => {
//     const collection = client.db(DB_NAME).collection('devices')
//     client.close()
// })
let connection
async function connectDB(){
    if(connection){
        return connection
    }
    let client
    try {
        client = await MongoClient.connect(uri, {
            useUnifiedTopology: true
        })
        connection = client.db(DB_NAME)
        
    } catch (err) {
        console.error(`Could not connect to db:${uri} - ${err}`)
        process.exit(1)
    }
    return connection
}
module.exports = connectDB