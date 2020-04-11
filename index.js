'use-strict'
// const { buildSchema } = require('graphql')
require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')
const app = express()
const port = process.env.port || 3000

// Schema
const typeDefs = readFileSync(
    join(
        __dirname,
        'lib',
        'schema.graphql',
    ),
    'utf-8'
)
const schema = makeExecutableSchema({typeDefs,resolvers})

app.use('/api', gqlMiddleware({
  schema,
  rootValue: resolvers,
  graphiql: true
}))
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
