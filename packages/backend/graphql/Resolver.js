module.exports = {
  Query: {
    getNumbers: async (_, args, context, info) => {
      console.log(args);
      return 10;
    },
  },
};
