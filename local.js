const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const passport = require("passport");
const { graphqlUploadExpress } = require("graphql-upload");
const cors = require("cors");
require("dotenv").config();
const getUser = require("./utils/getUser");
const session = require("express-session");
const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(
  session({
    secret: "metestingsetion", // a secret key to sign the session ID cookie
    resave: false, // don't save the session if it hasn't been modified
    saveUninitialized: false, // don't create a session if there is nothing to store in it
  })
);

app.use(passport.initialize());
app.use(passport.session());

const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers/index");

const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { user };
  },
});

(async () => {
  app.use(graphqlUploadExpress());
  await server.start();
  server.applyMiddleware({ app, path: "/api" });
})();

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
