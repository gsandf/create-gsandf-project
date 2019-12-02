export const typeDefs = /* GraphQL */ `
  input FilterableDateTime {
    eq: String
    exists: Boolean
    gt: String
    gte: String
    in: [String]
    lt: String
    lte: String
    ne: String
    nin: [String]
  }

  input FilterableFloat {
    eq: Float
    exists: Boolean
    gt: Float
    gte: Float
    in: [Float]
    lt: Float
    lte: Float
    ne: Float
    nin: [Float]
  }

  input FilterableInt {
    eq: Int
    exists: Boolean
    gt: Int
    gte: Int
    in: [Int]
    lt: Int
    lte: Int
    ne: Int
    nin: [Int]
  }

  input FilterableString {
    eq: String
    exists: Boolean
    gt: String
    gte: String
    in: [String]
    lt: String
    lte: String
    ne: String
    nin: [String]
    regex: String
  }
`;
