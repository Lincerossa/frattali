const { mergeResolvers } = require("merge-graphql-schemas");
const paint = require("./paint");
const user = require("./user");

const resolvers = [paint, user];

module.exports = mergeResolvers(resolvers);
