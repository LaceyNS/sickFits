import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";

// make a fake graphql tagged template literal
const graphql = String.raw;
export const extendGraphqlSchema = graphQLSchemaExtension({
    typeDefs: graphql`
    type Mutation {
        addToCart(productID: ID): CartItem
    }`
    // resolvers
})