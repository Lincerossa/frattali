const Model = require("../../mongoose/Model");

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
      const { User } = Model;
      const { username, email } = args;

      const newUser = new User({ username, email });
      const id = await new Promise((resolve, reject) => {
        newUser.save(function(err, user) {
          if (err) return console.error(err);
          const { _id } = user;
          resolve(_id);
        });
      });
      return id;
    },
  },
};

module.exports = resolvers;
