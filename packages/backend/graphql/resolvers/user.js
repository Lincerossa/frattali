const Model = require('../../mongoose/Model')

const resolvers = {
  Query: {
    getUser: async (_, args, context, info) => {
      return {
        nickname: 'Marcello Luatti',
        email: 'marcello.luatti@gmail.com',
      }
    },
  },
}

module.exports = resolvers
