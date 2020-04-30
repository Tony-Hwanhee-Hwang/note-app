import { ApolloClient, InMemoryCache } from "apollo-boost";

import { defaults, typeDefs, resolvers } from "./clientState";

const cache = new InMemoryCache();

const client = new ApolloClient({
	cache,
	typeDefs,
	resolvers,
});

cache.writeData({
	data: defaults,
});

export default client;
