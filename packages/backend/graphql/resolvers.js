const uuidv1 = require("uuid/v1");

const resolvers = {
  Query: {
    getUser: async (_, args, context, info) => {
      return {
        username: "Marcello Luatti",
        email: "marcello.luatti@gmail.com",
      };
    },
  },
  Mutation: {
    createUser: async (_, args, context, info) => {
      const { username, email } = args;
      const id = uuidv1();

      // qui prendo Model User e ne creo uno nuovo in mongoo
      console.log({ username, email, id });
      return id;
    },
  },
};

module.exports = resolvers;
