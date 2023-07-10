const express = require("express");
const { createServer } = require("http");
const { PubSub } = require('graphql-subscriptions');
const { ApolloServer } = require("@apollo/server");
const passport = require("passport");
const { graphqlUploadExpress } = require("graphql-upload");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const bodyParser = require("body-parser");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const cors = require("cors");
require("dotenv").config();
const getUser = require("./utils/getUser");
const session = require("express-session");

const app = express();
const pubsub = new PubSub();
// app.use(cors({ origin: "*", credentials: true }));

const httpServer = createServer(app);
// app.use(passport.initialize());
// app.use(passport.session());

const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers/index");

const schema = makeExecutableSchema({ typeDefs, resolvers });

// ws Server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql", // localhost:3000/graphql
});

const serverCleanup = useServer({ schema }, wsServer); // dispose

// apollo server
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

(async () => {
  await server.start();
  // await server.start();
  app.use(
    "/graphql",
    bodyParser.json(),
    session({
      secret: "metestingsetion", // a secret key to sign the session ID cookie
      resave: false, // don't save the session if it hasn't been modified
      saveUninitialized: false, // don't create a session if there is nothing to store in it
    }),
    cors({ origin: "*", credentials: true }),
    passport.initialize(),
    passport.session(),
    graphqlUploadExpress(),
    expressMiddleware(server)
  );
})();

// http server start
httpServer.listen(4000, () => {
  console.log("Server running on http://localhost:" + "4000" + "/graphql");
});

module.exports.pubsub = pubsub;