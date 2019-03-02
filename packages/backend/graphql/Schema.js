const typeDefs = `

type User {
  username: String,
  email: String
}

type Query {
  getUser(id: Float): User
}

type Mutation {
  createUser(username: String, email: String): ID
}

schema {
  query: Query
  mutation: Mutation
}
`;

module.exports = typeDefs;
