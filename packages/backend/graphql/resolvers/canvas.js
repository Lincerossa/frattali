const Model = require('../../mongoose/Model')

const resolvers = {
  Query: {
    getCanvas: async (_, args, context, info) => {
      console.log('qui ritorno la canvas')
    },
  },
  Mutation: {
    createCanvas: async (_, args, context, info) => {
      const { input } = args
      // qui faccio chiamata a mongo db
      const { Canvas } = Model

      const newCanvas = new Canvas(input)
      const id = await new Promise((resolve, reject) => {
        newCanvas.save(function(err, user) {
          if (err) return console.error(err)
          const { _id } = user
          resolve(_id)
        })
      })
      return id
    },
  },
}

module.exports = resolvers
