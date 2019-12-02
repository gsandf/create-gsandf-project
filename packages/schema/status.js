import { freemem, loadavg, totalmem } from 'os';

export const resolvers = {
  Query: {
    ping: () => 'pong',
    status: () => ({})
  },
  Status: {
    freeMemory: () => freemem(),
    load: () => loadavg(),
    totalMemory: () => totalmem(),
    usedMemory: () => totalmem() - freemem()
  }
};

export const typeDefs = /* GraphQL */ `
  type Status {
    """
    Available free memory on the server
    """
    freeMemory: Float!

    """
    CPU and IO utilization of the last 1, 5, and 10 minute periods
    """
    load: [Float]!

    """
    Total server memory
    """
    totalMemory: Float!

    """
    Memory currently in use on the server
    """
    usedMemory: Float!
  }

  extend type Query {
    """
    Responds with static text ("pong") for testing
    """
    ping: String!

    status: Status
  }
`;
