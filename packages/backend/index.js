const express = require('express')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')
const { ApolloServer, ApolloError } = require('apollo-server-express')
const mongoose = require('mongoose')

const schema = require('./graphql')

require('dotenv').config({
  path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
})

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH_DOMAIN}/.well-known/jwks.json`,
})

function getKey(header, cb) {
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey
    cb(null, signingKey)
  })
}

const options = {
  audience: process.env.CLIENT_ID,
  issuer: `https://${process.env.AUTH_DOMAIN}/`,
  algorithms: ['RS256'],
}

mongoose.connect(process.env.MONGOOSE_URI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  const server = new ApolloServer({
    schema,
    playground: true,
    introspection: true,
    context: async ({ req }) => {
      const token = req.headers.authorization

      const user = await new Promise((resolve, reject) => {
        jwt.verify(token, getKey, options, (err, decoded) => {
          if (err) {
            throw new ApolloError('must authenticate')
          }
          resolve(decoded.email)
        })
      })

      console.log('autenticato')

      return {
        user,
      }
    },
  })

  const app = express()
  server.applyMiddleware({ app })
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  )
})
