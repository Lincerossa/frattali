const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = executableSchema;
