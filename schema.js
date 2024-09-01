export const typeDefs = `#graphql
  type Game{
    id : ID!
    title:String!
    platform: [String!]!
    reviews : [Review!],
  }
  type Review{
    id : ID!,
    rating:Int!,
    content:String!,
    game:Game!,
    author:Author!
  }
  type Author{
    id:ID!
    name:String!
    verified:Boolean!
    reviews : [Review!]
  }

  type Query{
    games:[Game]
    game(gameId : ID!) : Game
    reviews:[Review]
    review(reviewId : ID!) : Review
    authors:[Author]
    author(authorId : ID!) : Author
  }

  type Mutation{
    addGame(game : AddGameInput!) : Game
    deleteGame(gameId : ID!) : [Game]
    updateGame(game : UpdateGameInput!,id : ID!) : Game
  }
  input AddGameInput{
    title : String!,
    platform:[String!]!
  }
  input UpdateGameInput{
    title : String!,
    platform : [String!]!
  }
`
