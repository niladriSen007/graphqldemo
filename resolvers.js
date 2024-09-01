import { authors, games, reviews } from "./_db.js"

export const resolvers = {
  Query: {
    games() {
      return games
    },
    game(_, args, context) {
      const game = games.find((game) => game.id === args?.gameId)
      return game
    },
    reviews() {
      return reviews
    },
    review(parent, args) {
      const { reviewId } = args
      const review = reviews.find((review) => review.id === reviewId)
      return review
    },
    authors() {
      return authors
    },
    author(_, args) {
      const { authorId } = args
      const author = authors.find((author) => author.id === authorId)
      return author
    },
  },
  Game: {
    reviews(parent) {
      const allReviews = reviews?.filter(
        (review) => review?.game_id == parent.id
      )
      return allReviews
    },
  },
  Review: {
    game(parent) {
      const game = games?.find((game) => game.id == parent?.game_id)
      return game
    },
    author(parent) {
      const author = authors.find((author) => author.id === parent?.author_id)
      return author
    },
  },
  Author: {
    reviews(parent) {
      return reviews?.filter((review) => review?.author_id == parent?.id)
    },
  },
  Mutation: {
    addGame(_, args) {
      const id = Math.floor(Math.random() * 10000).toString()
      const newGame = {
        id,
        ...args.game,
      }
      games.push(newGame)
      return newGame
    },
    deleteGame(_, args) {
      return games.filter((game) => game?.id !== args?.gameId)
    },
    updateGame(_, args) {
      console.log(args)
      games = games.map((game) => {
        if (game.id == args?.game?.id) {
          return {
            ...game,
            title: args?.game?.title,
            platform: args?.game?.platform,
          }
        }
        return game
      })

      return games.find((g) => g.id == args.id)
    },
  },
}
