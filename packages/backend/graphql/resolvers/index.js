const { mergeResolvers } = require('merge-graphql-schemas')
const canvas = require('./canvas')
const user = require('./user')

const resolvers = [canvas, user]

module.exports = mergeResolvers(resolvers)
