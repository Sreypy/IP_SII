import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

// challenges4
export const currentRole = { value: import.meta.env.VITE_HASURA_ROLE as string }

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HASURA_HTTP,
  headers: {
    get 'x-hasura-role'() { return currentRole.value },
    'x-hasura-admin-secret': import.meta.env.VITE_HASURA_ADMIN_SECRET, // 👈 add this
  },
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_HASURA_WS,
    connectionParams: async () => ({
      headers: {
        'x-hasura-role': currentRole.value,
      },
    }),
  }),
)

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return def.kind === 'OperationDefinition' && def.operation === 'subscription'
  },
  wsLink,
  httpLink,
)

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})