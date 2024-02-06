import db from './_db.js';
import { v4 as uuid } from 'uuid';

export const resolvers = {
  Query: {
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);

      return db.games;
    },
    addGame(_, args) {
      const newGame = { id: uuid(), ...args.game };
      db.games = [...db.games, newGame];

      return newGame;
    },
    updateGame(_, args) {
      db.games = db.games.map((game) =>
        game.id === args.id ? { ...game, ...args.edits } : game
      );

      return db.games.find((game) => game.id === args.id);
    },
  },
};
