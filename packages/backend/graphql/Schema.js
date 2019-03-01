// Construct a schema, using GraphQL schema language
const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    getNumbers(limit: Float): Float
  }
`;
