import execa from 'execa';
import { freemem, loadavg, totalmem } from 'os';
import packageJson from '../package.json';

let uniqueVersion: string;

export async function getUniqueVersion() {
  if (!uniqueVersion) {
    const { stdout } = await execa('git', ['describe', '--long']);
    uniqueVersion = stdout;
  }

  return uniqueVersion;
}

export const typeDefs = /* GraphQL */ `
  type Status {
    """
    Available free memory on the server
    """
    freeMemory: Float!

    """
    If the GraphQL server is running
    """
    graphqlOkay: Boolean!

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

    """
    Returns a string indicating the version of the server currently running. The
    string is in the format \`<REF>-<OFFSET>-g<HASH>\`, where:
      * \`REF\` is the latest tag (or branch name if no tags found)
      * \`OFFSET\` is the number of commits pass the current tag (or 0)
      * \`HASH\` is the current commit hash
    """
    releaseVersion: String!

    status: Status

    """
    Server version specified in the package.json.  This is a friendly (but not
    unique) way identifying which version is running.
    """
    version: String!
  }
`;

export const resolvers = {
  Query: {
    ping: () => 'pong',
    releaseVersion: getUniqueVersion,
    status: () => ({}),
    version: () => packageJson.version
  },
  Status: {
    freeMemory: () => freemem(),
    graphqlOkay: () => true,
    load: () => loadavg(),
    totalMemory: () => totalmem(),
    usedMemory: () => totalmem() - freemem()
  }
};
