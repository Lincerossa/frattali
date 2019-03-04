const resolvers = {
  Query: {
    getPaint: async (_, args, context, info) => {
      return {
        title: "Disegno bello",
        backgroundColor: "red",
        points: 100,
      };
    },
  },
};

module.exports = resolvers;
