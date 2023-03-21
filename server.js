const express = require("express");
const { ApolloServer } = require("apollo-server-lambda");
const passport = require("passport");
const serverlessExpress = require("@vendia/serverless-express");
const { graphqlUploadExpress } = require("graphql-upload");
const cors = require("cors");
require("dotenv").config();
const getUser = require("./utils/getUser");
const session = require("express-session");


const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  // context: ({ event, context }) => {
  //   const token = event.headers;
  //   const user = getUser(token);
  //   return { user };
  // },
  context: ({ event, context }) => ({
    headers: event.headers,
    event,
    context,
  }),
});
// server.applyMiddleware({ app });

// app.use(graphqlUploadExpress());

// (async () => {
//   app.use(graphqlUploadExpress());
//   // await server.start();
//   server.applyMiddleware({ app, path: "/api" });
// })();

// app.listen({ port }, () =>
//   console.log(
//     `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
//   )
// );
// exports.handler = serverlessExpress({ app })

// module.exports.handler = serverless(app);
exports.handler = server.createHandler({
  expressAppFromMiddleware(middleware) {
    const app = express();
    app.use(graphqlUploadExpress());
    app.use(
      session({
        secret: "metestingsetion", // a secret key to sign the session ID cookie
        resave: false, // don't save the session if it hasn't been modified
        saveUninitialized: false, // don't create a session if there is nothing to store in it
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(middleware);
    return app;
  },
  expressGetMiddlewareOptions: {
    cors: {
      origin: "*",
      credentials: false,
    },
    timeout: 60 
  },
});

